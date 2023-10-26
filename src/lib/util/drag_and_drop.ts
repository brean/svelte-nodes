import type IGroup from "$lib/model/IGroup";
import type INode from "$lib/model/INode";
import graph from "$lib/store/graph";
import { isGroup } from "./group_helper";

function removeFromParent(
    parent: IGroup, elem: INode | IGroup): INode | IGroup | undefined {
  if (!parent.children) {
    return
  }
  const idx = parent.children.findIndex(x => x.id == elem.id);
  if (idx > -1) {
    const child = parent.children.splice(idx, 1);
    if (child.length > 0) {
      return child[0];
    }
  }
}

// TODO: create a class to store the currently dragging element, its parent
// and other data, should reduce some code!
export class DragAndDropManager {
  dragElement: INode | IGroup | undefined = undefined;
  dragParent: IGroup | undefined = undefined;
  root: IGroup;
  isDragging = false

  constructor(root: IGroup) {
    this.root = root;
  }

  dragStart(elem?: INode | IGroup, parent?: IGroup) {
    if (!elem || this.isDragging) {
      return;
    }
    this.dragElement = elem;
    this.dragParent = parent;
    this.isDragging = true;
  }

  drop(event: DragEvent, elem: INode | IGroup, parent?: IGroup) {
    event.preventDefault();
    if (!this.dragElement) {
      return;
    }
    event.stopImmediatePropagation();

    if (!this.dragParent) {
      return
    }

    // remove because we will always drop somewhere, default will be root.
    removeFromParent(this.dragParent, this.dragElement);
    // figure out where we can add the new element
    if (isGroup(elem)) {
      const grp = (elem as IGroup)
      grp.children = grp.children || [];
      grp.children.push(this.dragElement);
    } else if (parent && parent.children) {
      const dropIndex = parent.children.findIndex(x => x.id === elem.id)
      console.log(elem, parent, this.dragElement, this.dragParent, dropIndex)
      parent.children.splice(dropIndex, 0, this.dragElement)
    } else if (!parent) {
      parent = this.root;
      // when we drag it somewhere on the root group we add it (same for root)
      parent.children = parent.children || [];
      parent.children.push(this.dragElement);
    }
    this.isDragging = false;
    graph.set(this.root);
  }
}