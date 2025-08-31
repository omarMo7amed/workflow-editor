import DocHeader from "../_components/docs/DocHeader";
import WhatIsThisSection from "./sections/WhatIsThisSection";
import DevObjectivesSection from "./sections/DevObjectivesSection";
import TechStackSection from "./sections/TechStackSection";
import FrontendArchSection from "./sections/FrontendArchSection";
import DocsPurposeSection from "./sections/DocsPurposeSection";
import PortfolioValueSection from "./sections/PortfolioValueSection";
import TableOfContentsClient from "../_components/docs/TableOfContentsClient";

export default function Docs() {
  return (
    <div className="bg-slate-100/40 flex  min-h-[calc(100vh-73px)] flex-row-reverse">
      {/* Main Content */}
      <div id="docs" className="flex-1 h-[calc(100vh-73px)] overflow-y-auto">
        <div className="max-w-4xl py-12 px-6 md:px-16 space-y-12 ">
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
      <TableOfContentsClient />
    </div>
  );
}
