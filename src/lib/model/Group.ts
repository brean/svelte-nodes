import VisualElement from "./VisualElement";
import Node from "./Node";

let globalCounter = 0;

const MINIMUM_CHILD_WIDTH = 100
const MINIMUM_CHILD_HEIGHT = 100

export default class Group extends VisualElement {
  children?: VisualElement[];
  direction: "HORIZONTAL" | "VERTICAL";

  constructor(
    id: string,
    name: string,
    children?: VisualElement[],
    parent?: Group,
    direction: "HORIZONTAL" | "VERTICAL" = "HORIZONTAL",
  ) {
    globalCounter++;
    name = name || `group${globalCounter}`;
    id = id || parent == null ?
      `g${globalCounter}` :
      `${parent.id}/g${globalCounter}`;
    super(id, name, parent);
    this.children = children;
    this.direction = direction;
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
  }, parent?: Group): Group {
    const { id, name, children, direction, x, y, width, height, padding } = data;
    const group = new Group(id, name, undefined, parent, direction);
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

  calculateDimensions() {
    let totalWidth = 0;
    let totalHeight = 0;

    this.padding = this.padding ? this.padding : 10;
    this.x = this.padding;
    this.y = this.padding;
    

    if (!this.children) {
      return
    }
    for (const child of this.children) {
      child.calculateDimensions();
      if (this.direction == "HORIZONTAL") {
        totalWidth += child.width ? child.width : MINIMUM_CHILD_WIDTH;
        totalHeight = Math.max(
          child.height ? child.height : MINIMUM_CHILD_HEIGHT,
          totalHeight);
      } else {
        totalWidth = Math.max(
          child.width ? child.width : MINIMUM_CHILD_WIDTH,
          totalWidth);
        totalHeight += child.height ? child.height : MINIMUM_CHILD_HEIGHT;
      }
    }

    let padding = this.padding ? this.padding : 10;
    this.width = totalWidth + padding * 2;
    this.height = totalHeight + padding * 2;
  }
}