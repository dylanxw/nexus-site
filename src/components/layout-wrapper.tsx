"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { Footer } from "@/components/footer";
import { CallFab } from "@/components/call-fab";

const HIDE_LAYOUT_ROUTES = ["/maintenance"];

interface LayoutWrapperProps {
  children: React.ReactNode;
  hideLayout?: boolean;
}

export function LayoutWrapper({ children, hideLayout: forceHideLayout }: LayoutWrapperProps) {
  const pathname = usePathname();
  const hideLayout = forceHideLayout || HIDE_LAYOUT_ROUTES.includes(pathname);

  if (hideLayout) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <Footer />
      <CallFab />
    </>
  );
}
