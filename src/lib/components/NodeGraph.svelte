<script lang="ts">
  import type IElement from "$lib/data/IElement";
  import type IGroup from "$lib/data/IGroup";
  import type INode from "$lib/data/INode";
  import Group from "./Group.svelte";

  export let data: any;
  // list of all nodes from flattend graph
  let nodes: INode[] = [];

  const MIN_NODE_WIDTH = 100;
  const DEFAULT_DIRECTION = "HORIZONTAL";

  let globalGroupCounter = 0;
  let globalNodeCounter = 0;

  function createGroup(data: any = null,
      parent: IGroup | null = null,
      children: IElement[] = []): IGroup {
    globalGroupCounter++;
    const name: string = data?.name || `group${globalGroupCounter}`;
    const id: string = data?.id || parent == null ?
      `g${globalGroupCounter}` :
      `${parent.id}/g${globalGroupCounter}`;
    return {
      id: id,
      name: name,
      children: children,
      parent: parent,
      x: undefined,
      y: undefined,
      width: undefined,
      height: undefined,
      padding: undefined,
      direction: data?.direction || DEFAULT_DIRECTION
    }
  }

  function createNode(data: any, parent: IGroup): INode {
    globalNodeCounter++;
    const name: string = data?.name || `node${globalNodeCounter}`;
    const id: string = data?.id || `${parent.id}/n${globalNodeCounter}`;
    return {
      id: id,
      name: name,
      x: data.x || 0,
      y: data.y || 0,
      width: Math.max(data.width || 100, MIN_NODE_WIDTH),
      height: data.height || 100,
      padding: data.padding || 10,
      parent: parent
    }
  }

  function graphFromData(data: any): IGroup {
    nodes = [];
    // crate root group for the whole graph
    const graph: IGroup = createGroup()

    // get list of all nodes and re-create graph struction
    // with parents so we create unique ids based on order inside graph
    let currentData: any[] = [data];
    let currentParents: IGroup[] = [graph];
    while (currentData.length > 0) {
      const nextData: any[] = []
      const nextParents: IGroup[] = []
      for (let i = 0; i < currentData.length; i++) {
        const current = currentData[i];
        const parent = currentParents[i];
        for (const child of current.children) {
          if (child.children) {
            const grp = createGroup(child, parent);
            nextData.push(child);
            nextParents.push(grp);
            parent.children.push(grp);
          } else {
            const node: INode = createNode(child, parent)
            nodes.push(node);
            parent.children.push(node);
          }
        }
      }
      currentParents = nextParents;
      currentData = nextData;
    }
    return graph
  }

  function calculateGraph(graph: IGroup) {
    let maxIter = 100
    let currentGroup = [graph];
    while (currentGroup.length > 0 || maxIter == 0) {
      maxIter--;
      const nextGroup: IGroup[] = [];
      for (const current of currentGroup) {
        if (current.children) {
          let knownChildDimensions = true
          // check, if childrens width/height is fixed or calculated
          // if not add it to the front of the currentGroup-list so its
          // children can be calculated next time
          let width = 0
          let height = 0
          let padding = current.padding ? current.padding : 10;
          for (const child of current.children) {
            if (child.width && child.height) {
              if (current.direction == "HORIZONTAL") {
                width += child.width;
                height = Math.max(child.height, height);
              } else {// VERTICAL
                width = Math.max(child.width, width);
                height += height;
              }
            } else {
              nextGroup.push(child as IGroup);
              knownChildDimensions = false;
            }
          }
          if (knownChildDimensions) {
            current.width = width + padding * 2
            current.height = height + padding * 2
            if (current.parent) {
              // now that we calculated this we might also be able 
              // to calculate the parent
              nextGroup.push(current.parent as IGroup)
            }
          }
        }
      }
      currentGroup = nextGroup;
    }
  }

  const graph = graphFromData(data);
  // render graph
  calculateGraph(graph)
  console.log(graph)

  // TODO: function to re-create json from graph.

  // drag-and-drop
  // The visual element that is being moved by the mouse
  let moveElement: any;
  // The data of the element we move around, IElement or IGroup instance
  let moveElementData: IElement | IGroup | undefined;

  const startPosition = {
    x: 0,
    y: 0
  }

  const onPointerDown = (e: any) => {
    // the target should always be a visual element like a <rect>
    const target = e.target;
    if (!target) {
      // TODO: move viewport?
      return
    }
    const key: string = e.target.id;
    let data: any = {};
    for (let k of key.split('/').slice(1)) {
      data = data.children[parseInt(k)];
    }
    moveElementData = data;
    moveElement = e.target.parentElement; // the <g> around the visual element
    startPosition.x = e.clientX
    startPosition.y = e.clientY
  }

  const onPointerMove = (e: any) => {
    if (
        !moveElementData || !moveElement || 
        !moveElementData.x || !moveElementData.y) {
      return
    }
    const x = e.clientX - startPosition.x + moveElementData.x;
    const y = e.clientY - startPosition.y + moveElementData.y;
    moveElement.setAttribute('transform', `translate(${x}, ${y})`)
  }

  const onPointerUp = (e: any) => {
    if (
        !moveElementData || !moveElement || 
        !moveElementData.x || !moveElementData.y) {
      return
    }
    const x = e.clientX - startPosition.x + moveElementData.x;
    const y = e.clientY - startPosition.y + moveElementData.y;
    moveElementData.x = x;
    moveElementData.y = y;

    moveElement = undefined;
    moveElementData = undefined;
    startPosition.x = 0
    startPosition.y = 0
  }
</script>

<!-- SVG-renderer -->
<svg style="width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; top: 0; left: 0;" 
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}>
  <!-- render graph -->
  <slot />
  <Group group={graph} />
</svg>