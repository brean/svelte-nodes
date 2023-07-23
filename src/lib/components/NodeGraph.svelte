<script lang="ts">
  import { setContext } from "svelte";
  import type IGraph from '$lib/model/IGraph';

  const graph: IGraph = {
    children: []
  } as IGraph;

  setContext('parent', graph);
  setContext('graph', graph);
  console.log(JSON.stringify(graph))
  for (const child of graph.children) {
    console.log(child.name)
  }
</script>

<!-- SVG-renderer -->
<svg style="width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; top: 0; left: 0;">
  <slot />
</svg>