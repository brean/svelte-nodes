<script lang="ts">
  import { setContext } from "svelte";
  import type IGraph from '$lib/model/IGraph';
  import type IElement from "$lib/model/IElement";
  import type IGroup from "$lib/model/IGroup";

  // The visual element that is being moved by the mouse
  let moveElement: any;
  // The data of the element we move around, IElement or IGroup instance
  let moveElementData: IElement | IGroup | undefined;

  const graph: IGraph = {
    id: 'r',
    children: []
  } as IGraph;

  const startPosition = {
    x: 0,
    y: 0
  }

  setContext('parent', graph);
  setContext('graph', graph);

  const onPointerDown = (e: any) => {
    // the target should always be a visual element like a <rect>
    const target = e.target;
    if (!target) {
      // TODO: move viewport?
      return
    }
    const key: string = e.target.id;
    let data: any = graph;
    for (let k of key.split('/').slice(1)) {
      data = data.children[parseInt(k)];
    }
    moveElementData = data;
    moveElement = e.target.parentElement; // the <g> around the visual element
    startPosition.x = e.clientX
    startPosition.y = e.clientY
    console.log(startPosition)
    console.log(moveElement);
    console.log(moveElementData);
  }

  const onPointerMove = (e: any) => {
    if (!moveElementData || !moveElement) {
      return
    }
    const x = e.clientX - startPosition.x + moveElementData.x;
    const y = e.clientY - startPosition.y + moveElementData.y;
    moveElement.setAttribute('transform', `translate(${x}, ${y})`)
  }

  const onPointerUp = (e: any) => {
    if (!moveElementData || !moveElement) {
      return
    }
    const x = e.clientX - startPosition.x + moveElementData.x;
    const y = e.clientY - startPosition.y + moveElementData.y;
    moveElementData.x = x;
    moveElementData.y = y;

    moveElement = undefined;
    moveElementData = undefined;
    startPosition.x = 0
    startPosition.y = 0
  }
</script>

<!-- SVG-renderer -->
<svg style="width: 100%; height: 100%; margin: 0; padding: 0; position: absolute; top: 0; left: 0;" 
    on:pointerdown={onPointerDown}
    on:pointermove={onPointerMove}
    on:pointerup={onPointerUp}>
  <slot />
</svg>