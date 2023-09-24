import {VisualElement} from "./VisualElement";
import type Group from "./Group";

let globalCounter = 0;

export default class Node extends VisualElement {

  constructor(
    id: string,
    name: string,
    parent?: Group
  ) {
    globalCounter++;
    name = name || `node${globalCounter}`;
    id = id || parent == null ?
      `n${globalCounter}` :
      `${parent.id}/n${globalCounter}`;
    super(id, name, parent);
  }

  static fromJSON(data: {
    id: string;
    name: string;
  }, parent?: Group): Node {
    const { id, name } = data;
    return new Node(id, name, parent);
  }
}