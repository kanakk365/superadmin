export type NavItem = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  logo?: string; // Path to logo image in public folder
  active?: boolean;
  href?: string;
  children?: NavItem[];
};

export type NavSection = {
  title: string;
  items: NavItem[];
};
