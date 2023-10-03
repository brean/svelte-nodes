<script lang="ts">
  import type IGroup from '$lib/model/IGroup';
  import graph from '$lib/store/graph';
  import Group from './Group.svelte';
  export let data: IGroup;

  graph.set(data);
  const mdata: any = data;
  let foos: number = 0;
</script>

<!-- render graph -->
<Group data={$graph} />
<br />
<div>
  <button on:click={() => {
    mdata.children[1].children.splice(1, 0, {name: 'foo' + foos++});
    graph.set(mdata);}
  }>x</button>
</div>