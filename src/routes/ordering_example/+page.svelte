<script lang="ts">
  import NodeGraph from "$lib/components/NodeGraph.svelte";

  const data = {
    name: 'root',
    children: [{
      name: 'innera',
      direction: 'VERTICAL',
      children: [
        {
          name: 'nodea1'
        },
        {
          name: 'nodea2'
        }
      ]
    },
    {
      name: 'innerb',
      direction: 'VERTICAL',
      dragAndDropBehavior: 'ordering',
      children: [
        {
          name: 'nodeb1'
        },
        {
          name: 'nodeb2'
        },
        {
          name: 'innerc',
          direction: 'HORIZONTAL',
          dragAndDropBehavior: 'ordering',
          children: [
            {
              name: 'nodec1'
            },
            {
              name: 'nodec2'
            },
            {
              name: 'nodec3'
            },
            {
              name: 'nodec4'
            },
            {
              name: 'nodec5'
            }
          ]
        },
        {
          name: 'nodeb3'
        },
        {
          name: 'nodeb4'
        },
        {
          name: 'nodeb5'
        }
      ]
    }]
  }
</script>
<NodeGraph data={data}>
</NodeGraph>