<script lang="ts">
  import type NodeModel from '$lib/model/Node';
  export let node:NodeModel;

</script>
<g transform="translate({node.x}, {node.y})">
  <rect width="{node.width}" height="{node.height}" rx="15" fill="green" stroke="black" stroke-width="4" id={node.id} />
  <foreignObject x={node.padding} y={node.padding} width={node.width} height={node.height} pointer-events="none">
    <div>
      { node.name }
    </div>
  </foreignObject>
</g>