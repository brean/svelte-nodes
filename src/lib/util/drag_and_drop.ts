let isDragging = false;

export function dragStart(event: DragEvent, id?: string) {
  if (!event.dataTransfer || !id || isDragging) {
    return;
  }
  console.log(id)
  event.dataTransfer.setData('text/plain', id);
  isDragging = true;
}

export function drop(event: DragEvent, id: string | undefined) {
  event.preventDefault();
  if (!id) {
    return
  }
  console.log(event.target);
  if (!event.dataTransfer) {
    return;
  }
  event.stopImmediatePropagation();
  const txt = event.dataTransfer.getData('text/plain');
  console.log(txt)
  isDragging = false;
}