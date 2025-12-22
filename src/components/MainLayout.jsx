import React from "react";
import { BottomNav } from "./BottomNav";

export function MainLayout({ children, active, onNavigate }) {
  const layoutStyle = {
    width: "100%",
    height: "100%",
    position: "relative",
    overflow: "hidden",
  };

  const contentStyle = {
    width: "100%",
    height: "100%",
    overflowY: "auto",
    // content should generally have padding bottom to avoid nav overlap if nav is overlay
    // but let's let individual pages handle scroll or we can wrap them.
    // If the pages have their own scroll areas, we might just pass children.
  };

  return (
    <div style={layoutStyle}>
      {children}
      <BottomNav active={active} onNavigate={onNavigate} />
    </div>
  );
}
