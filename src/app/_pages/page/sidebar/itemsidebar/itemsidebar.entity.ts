export interface ItemSidebar {
    displayName: string;
    disabled?: boolean;
    iconName: string;
    route?: string;
    children?: ItemSidebar[];
}
  