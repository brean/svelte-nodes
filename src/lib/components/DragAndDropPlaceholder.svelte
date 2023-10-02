<script>
  let x = 0;
  let y = 0;
  let width = 0;
  let height = 0;
</script>

<g transform="translate({x}, {y})"
  pointer-events="none"
  style="display: 'none'"
>
  <rect 
    id='drag_and_drop_placeholder_rect'
    width={width}
    height={height}
    class="placeholder"
    rx="7" stroke-width="1" stroke-dasharray="4" />
</g>