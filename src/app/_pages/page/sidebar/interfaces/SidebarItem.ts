export interface SidebarItem {
  divider?: boolean;
  label?: string;
  route?: string;
  icon?: string;
  children?: SidebarItem[];
  exact?: boolean;
  isOpened?: boolean;
  isShowed?: boolean;
}
