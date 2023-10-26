<script lang="ts">
  import type IGroup from "$lib/model/IGroup";
  import type INode from "$lib/model/INode";
  import type { DragAndDropManager } from "$lib/util/drag_and_drop";
  
  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 20;
  export let dragMgr: DragAndDropManager
  export let data: INode;
  export let childIdx: number;
  export let parent: IGroup;
  $: {
    data.id = `${parent.id}/n${childIdx}`;
  };
</script>
<li 
  id={data.id}
  draggable={data.draggable || true}
  on:dragstart={() => {
    dragMgr.dragStart(data, parent)
  }}
  on:drop={(event) => {
    dragMgr.drop(event, data, parent)
  }}
  class={`node ${parent.direction || 'horizontal'}`}>
    {data.name}
</li>