<script lang="ts">
  import type IGroup from "$lib/model/IGroup";
  import graph from "$lib/store/graph";
  import type { DragAndDropManager } from "$lib/util/drag_and_drop";
  import { isGroup } from "$lib/util/group_helper";
  import Node from "./Node.svelte";

  export let dragMgr: DragAndDropManager
  export let parent: IGroup | undefined = undefined;
  export let childIdx: number | undefined = undefined;
  export let data: IGroup;
  export let root: IGroup;
  let style = '';
  if (data.width) {
    style = `width: ${data.width}px;`;
  }
  if (data.height) {
    style = `${style}height: ${data.height}px;`;
  }
  if (data.max_width) {
    style = `${style}max-width: ${data.max_width}px;`;
  }
  if (data.max_height) {
    style = `${style}max-height: ${data.max_height}px;`;
  }

  $: {
    if (parent) {
      data.id = `${parent.id}/g${childIdx}`;
      if (parent.layout === 'box') {
        if (data.y || data.x) {
          style = `${style}position: absolute;`;
        }
        if (data.x) {
          style = `${style}left: ${data.x}px;`;
        }
        if (data.y) {
          style = `${style}top: ${data.y}px;`;
        }
      }
    } else {
      data.id = 'r';
    }
  }
</script>

<li
  id={data.id}
  class={`group ${(parent && parent.layout) || 'vertical'}`}
  style={style} draggable={data.draggable === undefined ? true : data.draggable}
  on:dragstart={(event) => {
    dragMgr.dragStart(event, data, parent)
  }}
  on:drop={(event) => {
    dragMgr.drop(event, data, parent)
  }}
  on:dragover={(event) => event.preventDefault()}
  >
  {#if data.showName || data.showName === undefined}
    <span style="height: {data.nameHeight || 20}">{data.name}</span>
  {/if}
  {#if data.children}
    <ul class="subgroup">
    {#each data.children as child, childIdx (child)}
      {#if isGroup(child)}
        <svelte:self dragMgr={dragMgr} data={child} root={root} childIdx={childIdx} parent={data} />
      {:else if child.name}
        <Node dragMgr={dragMgr} data={child} childIdx={childIdx} parent={data}></Node>
      {:else}
        <div>?</div>
      {/if}
    {/each} 
    </ul>
  {/if}
</li>