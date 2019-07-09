import {IFlatItem} from '../../interfaces/IFlatItem';

export const getListDirection = (element) => {
  const {top, bottom} = element.getBoundingClientRect();
  if (top + bottom < window.innerHeight) {
    return 'down';
  }
  return 'up';
};

export const buildTree = (flatList: IFlatItem[]) => {
  const map = {};
  flatList.forEach((flatItem: IFlatItem) => {
    if (!flatItem.parentId) {
      map[flatItem.id] = flatItem;
      if (!flatItem.children) {
        flatItem.children = [];
      }
    }
  });
  flatList.forEach((flatItem: IFlatItem) => {
    if (flatItem.parentId) {
      if (map[flatItem.parentId].children.indexOf(flatItem) < 0) {
        map[flatItem.parentId].children = [
          ...map[flatItem.parentId].children,
          flatItem,
        ];
      }
    }
  });
  return Object.values(map);
};

export const initiateSelectedNodes = (dataSource: IFlatItem[], selectedIds: any[]) => {
  const map = [];
  dataSource.forEach((item) => {
    map[item.id] = item;
  });
  return selectedIds.map((id) => map[id]);
};
