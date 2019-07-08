export interface ISelect {
  closeList(event);

  openList(event);

  toggleList(event);

  onSelect(event);

  onUnselect(event);

  onChange();
}

export type SelectMode = 'single' | 'multiple' | 'checkbox';
