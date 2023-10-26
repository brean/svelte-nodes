<script lang="ts">
  import MoveManager from "$lib/util/move";

  let x: number = 50;
  let y: number = 50;
  const moveMgr = new MoveManager();
</script>

<div class="node moveable" style="left: {x}px; top: {y}px"
    on:pointerdown={dragAndDrop.onPointerDown.bind(dragAndDrop)}
    on:pointermove={dragAndDrop.onPointerMove.bind(dragAndDrop)}
    on:pointerup={dragAndDrop.onPointerUp.bind(dragAndDrop)}>
  <a href="/">Moveable Node</a>
</div>