export default interface IVisualElement {
  id?: string;
  draggable?: boolean;
  name?: string;
  padding?: number; // space between the border and the content
  showName?: boolean
  x?: number;
  y?: number;
  width?: number; // full width including padding
  height?: number; // full height including padding
  visible?: boolean;
  nameHeight?: number;
}