import type IGroup from "$lib/model/IGroup";
import type IVisualElement from "$lib/model/IVisualElement";
import graph from "$lib/store/graph";
import { elemenById, isGroup } from "./group_helper";

let isDragging = false;

export function dragStart(event: DragEvent, id?: string, parent?: string) {
  if (!event.dataTransfer || !id || isDragging) {
    return;
  }
  event.dataTransfer.setData('text/plain', JSON.stringify({ id, parent }));
  isDragging = true;
}

export function drop(event: DragEvent, elem: IVisualElement, root: IGroup) {
  event.preventDefault();
  if (!event.dataTransfer) {
    return;
  }
  event.stopImmediatePropagation();
  // id of the element we want to drop.
  const dragTxt = event.dataTransfer.getData('text/plain')
  console.log(dragTxt)
  const dragData = JSON.parse(dragTxt);
  let dragId = dragData.id;
  let dragParentId = dragData.parent;
  const dragParent = elemenById(root, dragParentId);
  if (!dragParent || !dragParent.children || !dragParentId || dragParentId === '') {
    return
  }
  let index = Number(dragId.slice(dragId.lastIndexOf('/') + 2));
  // get element from its old parent, remove it there so we can add it to the
  // new element, the dropParent.
  const dragElement = dragParent.children.splice(index, 1)[0];
  let dropIndex = -1;
  let dropParent;
  if (isGroup(elem)) {
    // we dropped to a group
    console.log('dropped onto a group')
    dropParent = elem as IGroup
  } else {
    dropParent = ((elem as any).parent as IGroup)
    const dropId = elem.id as string;
    dropIndex = Number(dropId.slice(dropId.lastIndexOf('/') + 2));
  }
  if (!dropParent) {
    dropParent = root;
  }
  if (!dropParent.children) {
    dropParent.children = []
  }
  console.log(dropParent.id);
  if (dropIndex < 0) {
    dropParent.children.push(dragElement as IVisualElement);
  } else {
    dropParent.children.splice(dropIndex, 0, dragElement)
  }
  isDragging = false;
  graph.set(root);
}