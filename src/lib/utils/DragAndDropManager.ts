import type { VisualElement } from "$lib/model/VisualElement";
import Group from "$lib/model/Group";
import graph from "$lib/store/graph";

export default class DragAndDropManager {
  // The visual element that is being moved by the pointer
  private moveElement?: any;

  // The data of the element we move around, IElement or IGroup instance
  private moveElementData?: VisualElement;

  // position of the element at start of the interaction relative to curser
  private startPosition = {
    x: 0,
    y: 0
  };

  private graph: Group;
  private rootGroup?: SVGElement;
  public placeholder?: any;

  public behavior: 'default' | 'ordering';

  constructor(graph: Group) {
    this.graph = graph;
    this.behavior = 'default';
  }

  afterMount(rootGroup: SVGElement) {
    this.rootGroup = rootGroup;
    this.placeholder = document.getElementById(
      'drag_and_drop_placeholder_rect');
    console.log(this.placeholder)
  }

  onPointerDown(e: any) {
    // the target should always be a visual element like a <rect>
    const target = e.target;
    if (!target) {
      // TODO: move viewport?
      return;
    }

    const key: string = e.target.id;
    if (!key || key === '') {
      return;
    }
    // TODO: flatten to get a simple dict with all elements and their
    // id instead ?!
    let data: VisualElement | undefined = this.graph;
    for (let k of key.split('/').slice(1)) {
      if (data instanceof Group) {
        data = (data as Group).getChildById(data.id + '/' + k);
      }
    }

    if (!data) {
      return;
    }
    this.startPosition.x = 0;
    this.startPosition.y = 0;
    this.moveElementData = data;
    
    let parent;
    if (data.parent) {
      parent = data.parent as Group;
      this.behavior = parent.dragAndDropBehavior;
    } else {
      this.behavior = 'default';
    }
    // set moveElement to the <g> around the visual element
    this.moveElement = e.target.parentElement;
    const parentElement = this.moveElement.parentElement;
    
    // make sure we are always the top element by removing and 
    // adding to the root group
    // except if we are the root element
    if (this.moveElement === this.rootGroup) {
      return;
    }
    parentElement.removeChild(this.moveElement);

    if (parent && parent.children && this.placeholder) {
      const placeholderGroup = this.placeholder.parentElement;
      placeholderGroup.parentElement.removeChild(placeholderGroup);
      parentElement.appendChild(placeholderGroup);
      placeholderGroup.setAttribute(
        'transform', `translate(${data.x}, ${data.y})`);
      this.placeholder.setAttribute('width', data.width);
      this.placeholder.setAttribute('height', data.height);
    }

    if (this.rootGroup) {
      console.log(this.rootGroup);
      this.rootGroup.appendChild(this.moveElement);
    }

    if (parent && parent.children) {
      const pos = parent.children.indexOf(data);
      // parent.children.splice(pos)
    }

    const x = e.clientX;
    const y = e.clientY;
    console.log(this.startPosition)
    this.moveElement.setAttribute('transform', `translate(${x}, ${y})`);
  }

  onPointerMove(e: any) {
    // console.log(e.target)
    if (!this.moveElementData || !this.moveElement) {
      return;
    }
    const target = e.target;
    if (!target) {
      // TODO: move viewport?
      return;
    }
    console.log(target)
    const x = e.clientX;
    const y = e.clientY;
    // if (this.behavior === "default") {
      this.moveElement.setAttribute('transform', `translate(${x}, ${y})`);
    /*} else {
      this.moveElement.setAttribute(
        'transform', `translate(${this.moveElementData.x}, ${y})`);
    }*/
  }

  onPointerUp(e: any) {
    if (!this.moveElementData || !this.moveElement) {
      return
    }
    (this.moveElementData.parent as Group).children?.splice(0)
    graph.set(this.graph);
    const x = e.clientX;
    const y = e.clientY;
    this.moveElementData.x = x;
    this.moveElementData.y = y;
    this.moveElement = undefined;
    this.moveElementData = undefined;
    this.startPosition.x = 0;
    this.startPosition.y = 0;
    if (this.placeholder) {
      const placeholderGroup = this.placeholder.parentElement;
      placeholderGroup.setAttribute(
        'transform', `translate(0, 0)`);
      this.placeholder.setAttribute('width', 0);
      this.placeholder.setAttribute('height', 0);
    }
  }
}