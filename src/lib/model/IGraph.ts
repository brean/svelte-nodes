import type IElement from "./IElement.js";

export default interface IGraph {
  id: string
  children: IElement[]
}