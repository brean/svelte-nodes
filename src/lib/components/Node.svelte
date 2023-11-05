<script lang="ts">
  import type IGroup from "$lib/model/IGroup";
  import type INode from "$lib/model/INode";
  import type { DragAndDropManager } from "$lib/util/drag_and_drop";
  
  const DEFAULT_WIDTH = 100;
  const DEFAULT_HEIGHT = 20;
  export let dragMgr: DragAndDropManager
  export let data: INode;
  export let childIdx: number;
  export let parent: IGroup;
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
    data.id = `${parent.id}/n${childIdx}`;
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
  };
</script>
<li 
  style={style}
  id={data.id}
  draggable={data.draggable || true}
  on:dragstart={(event) => {
    dragMgr.dragStart(event, data, parent)
  }}
  on:drop={(event) => {
    dragMgr.drop(event, data, parent)
  }}
  class={`node ${parent.layout || 'vertical'}`}>
    {data.name}
</li>