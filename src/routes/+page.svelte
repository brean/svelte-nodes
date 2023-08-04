<script lang="ts">
  import NodeGraph from "$lib/components/NodeGraph.svelte";
  import Group from "$lib/components/Group.svelte";
  import Node from "$lib/components/Node.svelte";

</script>
<NodeGraph>
  <Group name="outer">
    <Group name="inner">
      <Node></Node>
    </Group>
  </Group>

  <Group name="outer2">
    <Group name="inner2a" x={220}>
      <Node></Node>
    </Group>

    <Group name="inner2b">
      <Node></Node>
      <Node y={200}></Node>
    </Group>
  </Group>
</NodeGraph>