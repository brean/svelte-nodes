<script lang="ts">
  import { setContext } from "svelte";
  import type IGraph from '$lib/model/IGraph';
  import type IElement from "$lib/model/IElement";
  import type IGroup from "$lib/model/IGroup";

  const graph: IGraph = {
    id: 'r',
    children: []
  } as IGraph;

  setContext('parent', graph);
  setContext('graph', graph);

  const onPointerDown = (e: any) => {
    const key: string = e.target?.id;
    let data: any = graph;
    for (let k of key.split('/').slice(1)) {
      data = data.children[parseInt(k)];
    }
    console.log(data);
  }
</script>

<!-- SVG-renderer -->
<svg style="width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; top: 0; left: 0;" on:pointerdown={onPointerDown}>
  <slot />
</svg>