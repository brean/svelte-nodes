<script lang="ts">
  import type IGroup from "$lib/model/IGroup";
  import type INode from "$lib/model/INode";
  import { dragStart, drop } from "$lib/util/drag_and_drop";
  
  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 20;

  export let data: INode;
  export let childIdx: number;
  export let parent: IGroup;
  export let root: IGroup;
  let customData: INode;
  $: {
    data.id = `${parent.id}/n${childIdx}`;

    customData = {
      id: data.id,
      parent: parent
    } as INode
  };
</script>
<li 
  id={data.id}
  draggable={data.draggable || true}
  on:dragstart={(event) => dragStart(event, data.id, parent?.id || 'r')}
  on:drop={(event) => drop(event, customData, root)}
  class={`node ${parent.direction || 'horizontal'}`}>
    {data.name}
</li>