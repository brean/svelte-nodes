import type IVisualElement from "./IVisualElement";

export default interface IGroup extends IVisualElement{
  children?: IVisualElement[];
  parent?: IGroup;
  direction?: "horizontal" | "vertical";
  spacing?: number;
  dragAndDropBehavior?: 'default' | 'ordering';
}