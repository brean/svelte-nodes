<script lang="ts">
  import type NodeModel from '$lib/model/Node';
  import { MIN_HEIGHT, MIN_WIDTH } from '$lib/model/VisualElement';
  export let node:NodeModel;
  // position relative to the parent group
  const x = node.x || 0
  const y = node.y || 0
  // padding = padding of the content inside the node.
  const padding = node.padding || 0
  // width and height include content
  const width = node.width || MIN_WIDTH;
  const height = node.height || MIN_HEIGHT;

</script>
<g transform="translate({x}, {y})">
  <rect 
    id={node.id}
    width={width}
    height={height}
    rx="7" fill="green" stroke="black" stroke-width="1" />
  <foreignObject x={padding} y={padding} width={width} height={height} pointer-events="none">
    <div>
      { node.name }
    </div>
  </foreignObject>
</g>