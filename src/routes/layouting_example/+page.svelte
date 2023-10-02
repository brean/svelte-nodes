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
          direction: 'VERTICAL',
          children: [
            {
              name: 'node2b1'
            },
            {
              name: 'node2b2'
            },
            {
              name: 'node2b3'
            },
            {
              name: 'node2b4'
            },
            {
              name: 'node2b5'
            }
          ]
        },
        {
          name: 'inner2c',
          children: [
            {
              name: 'node2c1'
            },
            {
              name: 'node2c2'
            }
          ]
        },
        {
          name: 'no_children',
          width: 300,
          children: []
        }]
      }
    ]
  }
</script>
<NodeGraph data={data}>
</NodeGraph>