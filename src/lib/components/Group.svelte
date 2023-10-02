<script lang="ts">
  import GroupModel from '$lib/model/Group';
  import NodeModel from '$lib/model/Node';
  import Node from './Node.svelte';

  export let group:GroupModel;
  let groupChildren = group.children;
  const x = group.x || 0;
  const y = group.y || 0;
  const padding = group.padding || 0;
  export let svgGroupElement: SVGElement;
</script>

<g transform="translate({x}, {y})" bind:this={svgGroupElement}>
  <rect
    id={group.id}
    width={group.width}
    height={group.height}
    rx="4" stroke-width="1"
    class="group" />
  <foreignObject x={padding} y={padding} width={group.width} height={20} pointer-events="none">
    <div>
      { group.name }
    </div>
  </foreignObject>
  <slot />
  {#if groupChildren}
    {#each groupChildren as child}
      {#if child instanceof GroupModel}
        <svelte:self group={child} />
      {:else if child instanceof NodeModel}
        <Node node={child} />
      {:else}
        <div>?</div>
      {/if}
    {/each} 
  {/if}
</g>