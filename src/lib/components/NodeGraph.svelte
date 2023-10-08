<script lang="ts">
  import type IGroup from '$lib/model/IGroup';
  import graph from '$lib/store/graph';
  import Group from './Group.svelte';
  export let data: IGroup;

  graph.set(data);
</script>

<!-- render graph -->
<Group data={$graph} root={data} />
