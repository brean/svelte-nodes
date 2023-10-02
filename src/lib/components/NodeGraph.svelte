<script lang="ts">
	import { onMount } from 'svelte';
  import GroupModel from "$lib/model/Group";
  import Group from "$lib/components/Group.svelte"
  import DragAndDropManager from "$lib/utils/DragAndDropManager";
  import DragAndDropPlaceholder from './DragAndDropPlaceholder.svelte';
  import graph from '$lib/store/graph';

  export let data: any;
  let rootGroup:SVGElement;

  const graphInst = GroupModel.fromJSON(data);
  // render graph
  graphInst.calculateDimensions();
  graphInst.calculatePositions();
  graph.set(graphInst);
  let dragAndDrop:DragAndDropManager= new DragAndDropManager(graphInst);
  onMount(() => {
    dragAndDrop.afterMount(rootGroup);
  });
</script>

<!-- SVG-renderer -->
<svg style="width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; top: 0; left: 0;" 
    on:pointerdown={dragAndDrop.onPointerDown.bind(dragAndDrop)}
    on:pointermove={dragAndDrop.onPointerMove.bind(dragAndDrop)}
    on:pointerup={dragAndDrop.onPointerUp.bind(dragAndDrop)}>
  <!-- render graph -->
  <Group group={$graph} bind:svgGroupElement={rootGroup} />
  <DragAndDropPlaceholder
  />
</svg>