<script lang="ts">
  import type IGroup from "$lib/model/IGroup";
  import type INode from "$lib/model/INode";
  import { dragStart } from "$lib/util/drag_and_drop";
  
  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 20;

  export let data: INode;
  export let childIdx: number;
  export let parent: IGroup;

  $: data.id = `${parent.id}/n${childIdx}`;

</script>
<li 
  id={data.id}
  draggable={data.draggable || true}
  on:dragstart={(event) => dragStart(event, data.id)}
  class={`node ${parent.direction || 'horizontal'}`}>
    {data.name}
</li>