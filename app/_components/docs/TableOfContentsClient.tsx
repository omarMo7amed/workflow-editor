"use client";

import { useEffect, useState } from "react";
import TableOfContents from "./TableOfContents";
import { docsNavigationItems } from "../../_utils/constants";

const SectionsId = docsNavigationItems.map((item) => item.id);

export default function TableOfContentsClient() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const docsContainer = document.getElementById("docs");
    if (!docsContainer) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: docsContainer,
        rootMargin: "-30% 0px -60% 0px",
        threshold: 0,
      }
    );

    SectionsId.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return <TableOfContents activeSection={activeSection} />;
}
