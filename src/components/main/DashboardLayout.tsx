"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import Navbar from "./Navbar";
import Sidebar from "@/components/Sidebar";
import { NotificationPanel } from "@/components/dashboard/NotificationPanel";
import { useSidebarStore } from "@/store/sidebarStore";

type DashboardLayoutProps = {
  children: ReactNode;
  pageLabel: string;
  sectionLabel?: string;
};

export const DashboardLayout = ({
  children,
  pageLabel,
  sectionLabel = "Dashboards",
}: DashboardLayoutProps) => {
  const isSidebarOpen = useSidebarStore((state) => state.isOpen);
  const closeSidebar = useSidebarStore((state) => state.setOpen);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleBackdropClick = () => {
    if (isMobile && isSidebarOpen) {
      closeSidebar(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen bg-background text-foreground overflow-hidden">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <AnimatePresence initial={false}>
        {isMobile && isSidebarOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={handleBackdropClick}
              aria-hidden="true"
            />
            <motion.div
              className="fixed inset-y-0 left-0 z-40 md:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar sectionLabel={sectionLabel} pageLabel={pageLabel} />
        <div className="flex flex-1 overflow-hidden">
          <main className="flex-1 h-[calc(100vh-64px)] max-h-[calc(100vh-64px)] overflow-hidden">
            {children}
          </main>
          <NotificationPanel />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;

