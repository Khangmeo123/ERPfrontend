export interface ItemSidebar {
    displayName: string;
    disabled?: boolean;
    iconName: number;
    route?: string;
    children?: ItemSidebar[];
}
  