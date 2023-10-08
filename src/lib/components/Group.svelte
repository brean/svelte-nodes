<script lang="ts">
  import type IGroup from "$lib/model/IGroup";
  import graph from "$lib/store/graph";
  import { dragStart, drop } from "$lib/util/drag_and_drop";
  import { isGroup } from "$lib/util/group_helper";
  import Node from "./Node.svelte";

  export let parent: IGroup | undefined = undefined;
  export let childIdx: number | undefined = undefined;
  export let data: IGroup;
  export let root: IGroup;
  let style = '';
  if (data.width) {
    style = `max-width: ${data.width}px;`;
  }
  if (data.height) {
    style = `${style}max-height: ${data.height}px;`;
  }

  $: {
    if (parent) {
      data.id = `${parent.id}/g${childIdx}`;
    } else {
      data.id = 'r';
    }
  }
</script>

<li
  id={data.id}
  class={`group ${(data.parent && data.parent.direction) || 'vertical'}`}
  style={style} draggable={data.draggable || true}
  on:dragstart={(event) => dragStart(event, data.id, parent?.id || 'r')}
  on:drop={(event) => drop(event, data, root)}
  on:dragover={(event) => event.preventDefault()}
  >
  <span>{data.name}</span><br />
  {#if data.children}
    {#each data.children as child, childIdx (child)}
      {#if isGroup(child)}
        <svelte:self data={child} root={root} childIdx={childIdx} parent={data} />
      {:else if child.name}
        <Node data={child} childIdx={childIdx} root={root} parent={data}></Node>
      {:else}
        <div>?</div>
      {/if}
    {/each} 
  {/if}
</li>