import Hierarchy from "@components/Hierarchy";
import Sidebar from "@components/Sidebar";
import { HierarchyItemProps, HierarchyProvider, useHierarchy } from "@context/hierarchy";
import { DocumentText1 } from "iconsax-react";
import { useState } from "react";

function App() {
  return (
    <HierarchyProvider>
      <div className="grid h-[100vh] grid-cols-1 lg:grid-cols-4">
        <div className="col-span-auto bg-slate-100 p-4 lg:col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-auto flex items-center justify-center text-center lg:col-span-3">
          <div className="flex flex-col items-center gap-4">
            <DocumentText1 size="92" className="opacity-50" />
            <p className="text-2xl opacity-50">Choose a File to Start</p>
          </div>
        </div>
      </div>
    </HierarchyProvider>
  );
}

export default App;
