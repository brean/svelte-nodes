import type IElement from "./IElement.js";

export default interface IGroup extends IElement {
  children: IElement[];
  // only the root element describing the graph is allowed to have a null-parent
  parent: IElement | null; 
}