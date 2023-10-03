import type IGroup from "./IGroup";
import type IVisualElement from "./IVisualElement";

export default interface INode extends IVisualElement{
  parent?: IGroup;
}