import type IVisualElement from "./IVisualElement";

export default interface IGroup extends IVisualElement{
  children?: IVisualElement[];
  parent?: IGroup;
  // either a stack (horizontal or vertical) or a generic box.
  // TODO: Grid
  layout?: "horizontal" | "vertical" | "box";
  spacing?: number;
  dragAndDropBehavior?: 'default' | 'ordering';
}