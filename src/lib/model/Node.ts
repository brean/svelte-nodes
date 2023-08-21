import VisualElement from "./VisualElement";
import type Group from "./Group";

export default class Node extends VisualElement {
  parent?: Group;

  constructor(
    id: string,
    name: string,
    x?: number,
    y?: number,
    width?: number,
    height?: number,
    padding?: number,
    parent?: Group
  ) {
    super(id, name, x, y, width, height, padding);
    this.parent = parent;
  }

  static fromJSON(data: {
    id: string;
    name: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    padding?: number;
  }): Node {
    const { id, name, x, y, width, height, padding } = data;
    const node = new Node(id, name);
    VisualElement.fromJSON(node, {x, y, width, height, padding})
    return node
  }
}