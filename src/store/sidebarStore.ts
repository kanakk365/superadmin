import { create } from "zustand";

type SidebarState = {
  isOpen: boolean;
  expandedItems: Record<string, boolean>;
  activeItemKey: string;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  setExpandedItems: (items: Record<string, boolean>) => void;
  toggleItem: (label: string) => void;
  setActiveItemKey: (key: string) => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: true,
  expandedItems: {},
  activeItemKey: "",
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),
  setOpen: (open) => set({ isOpen: open }),
  setExpandedItems: (items) => set({ expandedItems: items }),
  toggleItem: (label) =>
    set((state) => ({
      expandedItems: {
        ...state.expandedItems,
        [label]: !state.expandedItems[label],
      },
    })),
  setActiveItemKey: (key) => set({ activeItemKey: key }),
}));
