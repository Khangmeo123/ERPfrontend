export interface ISelect {
  closeList();

  openList();

  toggleList();

  beforeOpenList();

  beforeCloseList();

  onSelect(event);

  onUnselect(event);

  onChange(event);
}
