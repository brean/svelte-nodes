// a visual element with graphical dimenstions and position,
// might be an INode or IGroup
export default interface IElement {
  id: string; // unique name, includes the parent names for easy access
  name: string;
  x: number | undefined;
  y: number | undefined;
  width: number | undefined;
  height: number | undefined;
  padding: number | undefined;
}