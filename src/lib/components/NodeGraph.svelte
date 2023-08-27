<script lang="ts">
  import type IElement from "$lib/data/IElement";
  import GroupModel from "$lib/model/Group";
  import Group from "$lib/components/Group.svelte"

  export let data: any;

  const graph = GroupModel.fromJSON(data);
  // render graph
  graph.calculateDimensions();
  // TODO: calculate positions
  console.log(graph);

  // TODO: function to re-create json from graph.

  // drag-and-drop
  // The visual element that is being moved by the mouse
  let moveElement: any;
  // The data of the element we move around, IElement or IGroup instance
  let moveElementData: GroupModel | undefined;

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
    let data: any = graph;
    for (let k of key.split('/').slice(1)) {
      data = data.getChildById(data.id + '/' + k);
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
  <Group group={graph} />
  
</svg>