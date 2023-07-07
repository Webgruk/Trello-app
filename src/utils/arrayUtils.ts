type item = {
  id: string
}

export const findItemIndexById = <Titem extends item>(
  items: Titem[],
  id: string,
) => {
  return items.findIndex((item: Titem) => item.id === id)
}
