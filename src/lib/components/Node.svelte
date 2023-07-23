<script lang="ts">
  import { getContext } from "svelte";
  import type INode from '$lib/model/INode';
  import type IGroup from "$lib/model/IGroup";
  import type IGraph from '$lib/model/IGraph';

  export let name: string = 'MyNode'
  export let width: number = 100;
  export let height: number = 100;
  export let x: number = 10;
  export let y: number = 10;
  
  const node: INode = {
    name: name,
    width: width,
    height: height,
    x: x,
    y: y,
    padding: 0
  };

  const parent = getContext<IGroup | IGraph>('parent')
  parent.children.push(node);

</script>
<g transform="translate({x}, {y})">
  <rect width="{width}" height="{height}" rx="15" fill="green" stroke="black" stroke-width="4" />
</g>