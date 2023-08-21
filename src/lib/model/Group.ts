import VisualElement from "./VisualElement";

export default class Group extends VisualElement {
  children: VisualElement[];
  parent: Group | null;
  direction: "HORIZONTAL" | "VERTICAL";

  constructor(
    id: string,
    name: string,
    children: VisualElement[],
    parent: Group | null,
    direction: "HORIZONTAL" | "VERTICAL"
  ) {
    super(id, name);
    this.children = children;
    this.parent = parent;
    this.direction = direction;
  }

  static fromJSON(data: {
    id: string;
    name: string;
    children: any[];
    parent: Group | null,
    direction: "HORIZONTAL" | "VERTICAL";
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
  }): Group {
     const { id, name, children, parent, direction, x, y, width, height, padding } = data;
    // TODO: iterate over chilren to create instances
    const group = new Group(id, name, children, parent, direction);
    VisualElement.fromJSON(group, { x, y, width, height, padding });
    return group;
  }

  toJSON(): any {
    const groupJSON = super.toJSON();

    return {
      ...groupJSON,
      children: this.children.map(child => child.toJSON()),
      direction: this.direction,
    };
  }

  calculateWidth() {
    let totalWidth = 0;
    let totalHeight = 0;
    let padding = this.padding ? this.padding : 10;
    for (const child of this.children) {
      child.calculateWidth();
      child.width
    }
  }
}