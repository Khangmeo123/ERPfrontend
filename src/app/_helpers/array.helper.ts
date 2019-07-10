export const removeItemByIndex = (source: any[], index: number) => source.filter((item) => item !== source[index]);

export const addItemToArray = (source: any[], item: any) => [
  ...source,
  item,
];
