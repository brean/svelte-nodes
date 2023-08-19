<script lang="ts">
  import NodeGraph from "$lib/components/NodeGraph.svelte";

  const data = {
    name: 'root',
    children: [
      {
        name: 'outer1',
        children: [{
          name: 'inner1',
          children: [{
            name: 'node1',
          }]
        }]
      },
      {
        name: 'outer2',
        children: [{
          name: 'inner2a',
          children: [
            {
              name: 'node2a1'
            }
          ]
        },
        {
          name: 'inner2b',
          children: [
            {
              name: 'node2b1'
            },
            {
              name: 'node2b2'
            }]
        }]
      }
    ]
  }
</script>
<NodeGraph data={data}>
</NodeGraph>