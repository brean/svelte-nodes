<script lang="ts">
  import GroupModel from '$lib/model/Group';
  import type NodeModel from '$lib/model/Node';
  import Node from './Node.svelte';
  export let group:GroupModel;
  let groupChildren = group.children
  const x = group.x || 0
  const y = group.y || 0
  const padding = group.padding || 0
</script>

<g transform="translate({x + padding}, {y + padding})">
  <rect
    id="{group.id}"
    width="{group.width}"
    height="{group.height}"
    rx="10" fill="lightgray" stroke="black" stroke-width="4" />
  <foreignObject x={group.padding} y={group.padding} width={group.width} height={20} pointer-events="none">
    <div>
      { group.name }
    </div>
  </foreignObject>
  <slot />
  {#if groupChildren}
    {#each groupChildren as child}
      {#if child instanceof GroupModel}
      <svelte:self group={child} />
      {:else}
        <Node node={child} />
      {/if}
    {/each }
  {/if}
</g>