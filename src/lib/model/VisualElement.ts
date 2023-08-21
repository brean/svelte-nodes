export default class VisualElement {
  id: string;
  name: string;
  x: number;
  y: number;
  padding: number;
  width: number | undefined;
  height: number | undefined;
  needsUpdate: boolean = true;

  constructor(
    id: string,
    name: string,
    x: number = 0,
    y: number = 0,
    width?: number,
    height?: number,
    padding: number = 10
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding;
  }

  toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      padding: this.padding,
    };
  }

  static fromJSON(element: VisualElement, json: any): void {
    element.x = json.x;
    element.y = json.y;
    element.width = json.width;
    element.height = json.height;
    element.padding = json.padding;
  }

  calculateWidth() {
    return
  }
}