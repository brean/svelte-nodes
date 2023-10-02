import { VisualElement, DEFAULT_PADDING, MIN_WIDTH, MIN_HEIGHT } from "./VisualElement";
import Node from "./Node";

let globalCounter = 0;

const DEFAULT_SPACING = 6;
const MINIMUM_CHILD_WIDTH = 100;
const MINIMUM_CHILD_HEIGHT = 20;

export default class Group extends VisualElement {
  children?: VisualElement[];
  direction: "HORIZONTAL" | "VERTICAL" = 'HORIZONTAL';
  spacing: number;
  dragAndDropBehavior: 'default' | 'ordering' = 'default';

  constructor(
    id: string,
    name: string,
    children?: VisualElement[],
    parent?: Group,
    direction: "HORIZONTAL" | "VERTICAL" = "HORIZONTAL",
    dragAndDropBehavior: 'default' | 'ordering' = 'default',
    spacing: number = DEFAULT_SPACING
  ) {
    globalCounter++;
    name = name || `group${globalCounter}`;
    id = id || parent == null ?
      `g${globalCounter}` :
      `${parent.id}/g${globalCounter}`;
    super(id, name, parent);
    this.children = children;
    this.direction = direction;
    this.spacing = spacing;
    this.dragAndDropBehavior = dragAndDropBehavior;
  }

  static fromJSON(data: {
    id: string;
    name: string;
    children: any[];
    direction: "HORIZONTAL" | "VERTICAL";
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
    dragAndDropBehavior?: 'default' | 'ordering',
    spacing?: number;
  }, parent?: Group): Group {
    const { id, name, children, direction, x, y, width, height, padding,dragAndDropBehavior, spacing } = data;
    const group = new Group(
      id, name, undefined, parent, direction,
      dragAndDropBehavior || 'default', spacing);
    const groupChildren: VisualElement[] = [];
    for (const child of children) {
      let elem: VisualElement;
      if (child.children) {
        elem = Group.fromJSON(child, group);
        groupChildren.push(elem)
      } else {
        elem = Node.fromJSON(child, group);
        groupChildren.push(elem);
      }
    }
    // TODO: iterate over chilren to create instances
    group.children = groupChildren;
    group.updateVisualElement({ x, y, width, height, padding });
    return group;
  }

  toJSON(): any {
    const groupJSON = super.toJSON();

    return {
      ...groupJSON,
      children: this.children?.map(child => child.toJSON()),
      direction: this.direction,
    };
  }

  getChildById(_id: string): VisualElement | undefined {
    return this.children?.find((value) => value.id === _id)
  }

  calculatePositions() {
    if (!this.children) {
      return
    }


    let current = this.padding || 0;
    for (const child of this.children) {
      if (this.direction == 'HORIZONTAL') {
        child.x = current;
        child.calculatePositions();
        current += child.width || MINIMUM_CHILD_WIDTH;
      } else {
        child.y = current;
        child.calculatePositions();
        child.x = this.padding || 0;
        current += child.height || MINIMUM_CHILD_HEIGHT;
      }
      if (this.children[this.children.length - 1] !== child) {
        current += this.spacing;
      }
    }
    if (this.direction == 'HORIZONTAL') {
      this.width = Math.max(this.width || 0, current + (this.padding || 0));
    } else {
      this.height = Math.max(this.height || 0, current + (this.padding || 0));
    }
    super.calculatePositions()
  }

  calculateDimensions() {
    let totalWidth = 0;
    let totalHeight = 0;

    this.padding = this.padding ? this.padding : DEFAULT_PADDING;
    this.x = this.padding;
    this.y = this.padding;
    
    if (!this.children) {
      return
    }
    for (const child of this.children) {
      child.calculateDimensions();
      if (this.direction == "HORIZONTAL") {
        totalWidth += (child.width ? child.width : MINIMUM_CHILD_WIDTH)
        totalHeight = Math.max(
          child.height ? child.height : MINIMUM_CHILD_HEIGHT,
          totalHeight);
        if (this.children[this.children.length - 1] !== child) {
          totalWidth += this.spacing;
        }
      } else {
        totalWidth = Math.max(
          child.width ? child.width : MINIMUM_CHILD_WIDTH,
          totalWidth);
        totalHeight += (child.height ? child.height : MINIMUM_CHILD_HEIGHT)
        if (this.children[this.children.length - 1] !== child) {
          totalHeight += this.spacing;
        }
      }
    }

    totalWidth = Math.max(MIN_WIDTH, totalWidth)
    totalHeight = Math.max(MIN_HEIGHT, totalHeight)
    this.width = totalWidth + this.padding * 2;
    this.height = totalHeight + this.padding * 2;
    super.calculateDimensions()
  }
}