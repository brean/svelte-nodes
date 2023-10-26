<script lang="ts">
  import type IGroup from '$lib/model/IGroup';
  import graph from '$lib/store/graph';
  import { DragAndDropManager } from '$lib/util/drag_and_drop';
  import Group from './Group.svelte';
  export let data: IGroup;

  graph.set(data);
  const dragMgr = new DragAndDropManager(data);
</script>

<!-- render graph -->
<ul class="subgroup">
<Group dragMgr={dragMgr} data={$graph} root={data} />
</ul>
