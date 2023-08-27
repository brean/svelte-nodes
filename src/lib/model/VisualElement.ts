export default class VisualElement {
  id: string;
  name: string;
  x: number;
  y: number;
  padding: number;
  width: number | undefined;
  height: number | undefined;
  needsUpdate: boolean = true;
  parent: VisualElement | undefined;

  constructor(
    id: string,
    name: string,
    parent?: VisualElement,
    x: number = 0,
    y: number = 0,
    width?: number,
    height?: number,
    padding: number = 10,
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.parent = parent;
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

  updateVisualElement(json: any): void {
    this.x = json.x;
    this.y = json.y;
    this.width = json.width;
    this.height = json.height;
    this.padding = json.padding;
  }

  calculateDimensions() {
    return
  }
}