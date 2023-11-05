<script lang="ts">
  import NodeGraph from "$lib/components/NodeGraph.svelte";
  import type IGroup from "$lib/model/IGroup";

  const data = {
    name: 'root',
    draggable: false,
    children: [{
      name: 'parent',
      children: [
        {
          name: 'inner2b',
          layout: 'vertical',
          children: [
            {
              name: 'node2b1'
            },
            {
              name: 'node2b2'
            },
            {
              name: 'some_group_between_2b2_3',
              children: [
                {
                  name: "subinner2b"
                }
              ]
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
          name: 'innera',
          draggable: false,
          layout: 'box',
          width: 600,
          height: 500,
          children: [
            {
              name: 'nodea1'
            },
            {
              name: 'nodea2',
              y: 150
            },
            {
              name: 'nodea3',
              x: 120
            }
          ]
        } as IGroup
      ]},
      {
        name: 'another node'
      }
  ]} as IGroup;
</script>

<NodeGraph data={data}>
</NodeGraph>