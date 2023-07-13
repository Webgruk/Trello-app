type item = {
  id: string
}

export const findItemIndexById = <Titem extends item>(
  items: Titem[],
  id: string,
) => {
  return items.findIndex((item: Titem) => item.id === id)
}

export const moveItem = <Titem>(array: Titem[], from: number, to: number) => {
  const item = array[from]
  return insertItemAtIdex(removeItemAtIdex(array, from), item, to)
}

export function removeItemAtIdex<Titem>(array: Titem[], index: number) {
  return [...array.slice(0, index), ...array.slice(index + 1)]
}

export function insertItemAtIdex<Titem>(array:Titem[],item:Titem,index:number){
  return [...array.slice(0,index),item,...array.slice(index)]
}