import VisualElement from "./VisualElement";
import type Group from "./Group";

export default class Node extends VisualElement {
  parent: Group | null;

  constructor(
    id: string,
    name: string,
    parent: Group | null
  ) {
    super(id, name);
    this.parent = parent;
  }

  static fromJSON(data: {
    id: string;
    name: string;
    parent: Group | null;
  }): Node {
    const { id, name, parent } = data;
    return new Node(id, name, parent);
  }
}