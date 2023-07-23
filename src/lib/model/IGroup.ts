import type IElement from "./IElement.js";

export default interface IGroup extends IElement {
  children: IElement[]
  name: undefined | string;
}