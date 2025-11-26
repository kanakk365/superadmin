export type NavItem = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  active?: boolean;
  href?: string;
  children?: NavItem[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};
