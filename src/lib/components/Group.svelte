<script lang="ts">
  import type IGroup from '$lib/model/IGroup';
  import type IGraph from '$lib/model/IGraph';
  import { getContext, setContext } from 'svelte';

  export let name: string = 'MyGroup'
  export let width: number = 100;
  export let height: number = 100;
  export let x: number = 20;
  export let y: number = 20;
  export let padding: number = 10;

  const group: IGroup = {
    name: name,
    children: [],
    x: x,
    y: y,
    width: width,
    height: height,
    padding: padding
  }

  const parent = getContext<IGroup | IGraph>('parent')
  parent.children.push(group);
  setContext('parent', group);

</script>

<g transform="translate({x-padding}, {y-padding})">
  <rect
    width="{width+padding*2}"
    height="{height+padding*2}"
    rx="10" fill="lightgray" stroke="black" stroke-width="4" />
  <slot />
</g>