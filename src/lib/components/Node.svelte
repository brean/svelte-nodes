<script lang="ts">
  import type NodeModel from '$lib/model/Node';
  export let node:NodeModel;
  const x = node.x || 0
  const y = node.y || 0
  const padding = node.padding || 0
  const width = node.width || 100
  const height = node.height || 100

</script>
<g transform="translate({x}, {y})">
  <rect 
    id={node.id}
    width={width}
    height={height}
    rx="15" fill="green" stroke="black" stroke-width="4" />
  <foreignObject x={padding} y={padding} width={width} height={height} pointer-events="none">
    <div>
      { node.name }
    </div>
  </foreignObject>
</g>