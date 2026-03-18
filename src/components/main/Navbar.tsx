"use client";

import { useMemo, useState, useCallback, memo } from "react";
import { motion } from "motion/react";
import { AnimatePresence } from "motion/react";
import {
  IconBell,
  IconMenu,
  IconStar,
  IconSun,
} from "@/lib/icons";
import { useSidebarStore } from "@/store/sidebarStore";
import { useNotificationPanelStore } from "@/store/notificationPanelStore";
import { useTheme } from "@/components/providers/theme-provider";
import { Moon, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";

type NavbarProps = {
  sectionLabel: string;
  pageLabel: string;
};

const Navbar = ({ sectionLabel, pageLabel }: NavbarProps) => {
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const toggleNotifications = useNotificationPanelStore(
    (state) => state.toggle,
  );

  const [animatingIcons, setAnimatingIcons] = useState<Set<string>>(new Set());
  const { theme, toggleTheme, isLoaded } = useTheme();
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = useCallback(() => {
    logout();
    router.push("/login");
  }, [logout, router]);

  const themeIcon = useMemo(
    () => (theme === "dark" ? <Moon className="h-4 w-4" /> : <IconSun />),
    [theme],
  );

  const triggerAnimation = useCallback(
    (iconName: string, callback?: () => void) => {
      setAnimatingIcons((prev) => new Set(prev).add(iconName));
      if (callback) callback();

      setTimeout(() => {
        setAnimatingIcons((prev) => {
          const newSet = new Set(prev);
          newSet.delete(iconName);
          return newSet;
        });
      }, 600);
    },
    [],
  );

  const isAnimating = useCallback(
    (iconName: string) => animatingIcons.has(iconName),
    [animatingIcons],
  );

  const handleSidebarToggle = useCallback(() => {
    triggerAnimation("menu-left", toggleSidebar);
  }, [triggerAnimation, toggleSidebar]);

  const handleNotificationsToggle = useCallback(() => {
    triggerAnimation("bell", toggleNotifications);
  }, [triggerAnimation, toggleNotifications]);

  const handleThemeToggle = useCallback(() => {
    if (isLoaded) {
      triggerAnimation("theme", toggleTheme);
    }
  }, [isLoaded, triggerAnimation, toggleTheme]);



  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-background px-4 sm:px-8 sm:pl-4">
      <div className="flex items-center gap-3">
        <motion.button
          type="button"
          onClick={handleSidebarToggle}
          whileTap={{ scale: 0.9 }}
          className="grid h-11 w-11 cursor-pointer place-items-center text-foreground transition "
        >
          <span className="sr-only">Toggle sidebar</span>
          <IconMenu />
        </motion.button>
        <div className="hidden sm:flex items-center gap-3 text-sm text-muted-foreground">
          <IconStar />
          <span className="text-neutral-400">{sectionLabel}</span>
          <span className="text-muted-foreground">/</span>
          <span className="text-foreground">{pageLabel}</span>
        </div>
      </div>

      <div className="flex items-center gap-5">

        <motion.button
          onClick={handleThemeToggle}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="grid place-items-center text-foreground transition cursor-pointer w-5 h-5 "
          aria-label="Toggle theme"
        >
          <AnimatePresence mode="wait">
            {isLoaded && (
              <motion.div
                key={theme}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {themeIcon}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
        <motion.button
          type="button"
          onClick={handleNotificationsToggle}
          animate={isAnimating("bell") ? { x: [-2, 2, 0] } : { x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="grid place-items-center text-foreground transition cursor-pointer"
        >
          <span className="sr-only">Toggle notifications panel</span>
          <IconBell />
        </motion.button>
        <motion.button
          type="button"
          onClick={handleLogout}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, color: "hsl(var(--destructive))" }}
          className="grid place-items-center text-foreground transition cursor-pointer"
          title="Logout"
        >
          <span className="sr-only">Logout</span>
          <LogOut className="h-5 w-5" />
        </motion.button>
        <motion.button
          type="button"
          onClick={handleSidebarToggle}
          whileTap={{ scale: 0.9 }}
          className="hidden md:grid place-items-center text-foreground transition cursor-pointer"
        >
          <span className="sr-only">Toggle sidebar</span>
          <IconMenu />
        </motion.button>
      </div>
    </header>
  );
};

export default Navbar;
