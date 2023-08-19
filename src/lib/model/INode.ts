import type IElement from "./IElement";
import type IGroup from "./IGroup";

export default interface INode extends IElement {
  parent: IGroup;
}