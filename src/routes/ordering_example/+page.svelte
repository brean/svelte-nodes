<script lang="ts">
  import NodeGraph from "$lib/components/NodeGraph.svelte";
  import graph from "$lib/store/graph";


  const data = {
    name: 'root',
    draggable: false,
    children: [{
      name: 'innera',
      width: 600,
      direction: 'horizontal',
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
      direction: 'vertical',
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
          direction: 'horizontal',
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
  };

  const mdata: any = data;
  let foos: number = 0;
</script>
<NodeGraph data={data}>
</NodeGraph>

<br />
<div>
  <button on:click={() => {
    mdata.children[1].children.splice(1, 0, {name: 'foo' + foos++});
    graph.set(mdata);}
  }>x</button>
</div>