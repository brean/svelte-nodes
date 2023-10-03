import type IVisualElement from "$lib/model/IVisualElement";

export function isGroup(element: IVisualElement) {
  return 'children' in element;
}