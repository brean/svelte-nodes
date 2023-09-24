export const MIN_WIDTH = 100;
export const MIN_HEIGHT = 10;
export const DEFAULT_PADDING = 4;

export class VisualElement {
  id: string;
  name: string;
  x?: number;
  y?: number;
  padding?: number; // space between the border and the content
  width?: number; // full width including padding
  height?: number; // full height including padding
  needsUpdate: boolean = true;
  showName: boolean = true;
  nameHeight: number = 20;
  parent?: VisualElement;

  constructor(
    id: string,
    name: string,
    parent?: VisualElement,
    x: number = 0,
    y: number = 0,
    width?: number,
    height?: number,
    padding: number = DEFAULT_PADDING,
    showName: boolean = true
  ) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.padding = padding;
    this.parent = parent;
    this.showName = showName;
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
    if (!this.height) {
      this.height = MIN_HEIGHT;
    }
    if (!this.width) {
      this.width = MIN_WIDTH;
    }
    this.height += this.padding || DEFAULT_PADDING;
    if (this.showName) {
      this.height += this.nameHeight;
    }
  }

  calculatePositions() {
    if (!this.x) {
      this.x = 0;
    }
    if (!this.y) {
      this.y = 0;
    }
    if (this.parent?.showName) {
      this.y += this.parent.nameHeight + (this.parent.padding || 0);
    }
  }
}