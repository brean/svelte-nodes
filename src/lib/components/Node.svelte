<script lang="ts">
  import { getContext } from "svelte";
  import type INode from '$lib/model/INode';
  import type IGroup from "$lib/model/IGroup";

  export let name: string = 'MyNode'
  export let width: number = 100;
  export let height: number = 100;
  export let x: number = 10;
  export let y: number = 10;
  export let padding: number = 10;

  const parent = getContext<IGroup>('parent');
  const _id = parent.id ? `${parent.id}/${parent.children.length}` : `${parent.children.length}`;
  const node: INode = {
    id: _id,
    name: name,
    width: width,
    height: height,
    x: x,
    y: y,
    padding: padding
  };

  parent.children.push(node);

</script>
<g transform="translate({x}, {y})">
  <rect width="{width}" height="{height}" rx="15" fill="green" stroke="black" stroke-width="4" id={node.id} />
  <foreignObject x={padding} y={padding} width={100} height={100} pointer-events="none">
    <div>
      { name }
    </div>
  </foreignObject>
</g>