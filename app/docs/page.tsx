"use client";

import React, { useState, useEffect } from "react";
import DocHeader from "./components/DocHeader";
import WhatIsThisSection from "./sections/WhatIsThisSection";
import DevObjectivesSection from "./sections/DevObjectivesSection";
import TechStackSection from "./sections/TechStackSection";
import FrontendArchSection from "./sections/FrontendArchSection";
import DocsPurposeSection from "./sections/DocsPurposeSection";
import PortfolioValueSection from "./sections/PortfolioValueSection";
import TableOfContents from "./components/TableOfContents";
import { docsNavigationItems } from "../src/_utils/constants";

export default function Docs() {
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const handleScroll = (): void => {
      const sections = docsNavigationItems.map((item) => item.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="pb-42 bg-slate-100/40 flex  min-h-screen flex-row-reverse">
      {/* Main Content */}
      <div className="w-full md:mr-12 md:ml-80">
        <div className="max-w-4xl py-12 px-6 md:px-16 space-y-12">
          <DocHeader />
          <WhatIsThisSection />
          <DevObjectivesSection />
          <TechStackSection />
          <FrontendArchSection />
          <PortfolioValueSection />
          <DocsPurposeSection />
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents activeSection={activeSection} />
    </div>
  );
}
