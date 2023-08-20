<script lang="ts">
  import type IElement from '$lib/data/IElement';
  import type IGroup from '$lib/data/IGroup';

  export let name: string = 'MyGroup'
  export let width: number = 100;
  export let height: number = 100;
  export let x: number = 20;
  export let y: number = 20;
  export let padding: number = 10;
  export let group:IGroup;
  if (group) {
    name = group.name
    width = group.width || width
    height = group.height || height
  }
  let children: IElement[] = group.children ? group.children : []


</script>

<g transform="translate({x-padding}, {y-padding})">
  <rect
    id="{group.id}"
    width="{width+padding*2}"
    height="{height+padding*2}"
    rx="10" fill="lightgray" stroke="black" stroke-width="4" />
  <foreignObject x={padding} y={padding} width={width} height={20} pointer-events="none">
    <div>
      { name }
    </div>
  </foreignObject>
  <slot />
  {#each children as child}
    <svelte:self group={child} />
  {/each }
</g>