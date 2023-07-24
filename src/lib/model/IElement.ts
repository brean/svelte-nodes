// a visual element with an x and y position, might be a node or group
export default interface IElement {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  padding: number;
}