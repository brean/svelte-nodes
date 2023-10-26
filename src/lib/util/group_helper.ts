import type IGroup from "$lib/model/IGroup";
import type IVisualElement from "$lib/model/IVisualElement";

export function isGroup(element: IVisualElement) {
  return 'children' in element;
}

// TODO: flatten to get a simple dict with all elements and their id as cache
// instead, might be faster then getting the element all the time.
export function elemenById(root: IGroup, id: string): IGroup | undefined {
  if (id === 'r') {
    return root;
  }
  const parts = id.split('/').slice(1);
  let current = root;
  for (let part of parts) {
    if (!current.children) {
      return undefined;
    }
    const index = Number(part.substring(1));
    if (index >= 0 && index < current.children.length) {
      current = current.children[index];
    } else {
      return undefined;
    }
  }
  return current;
}