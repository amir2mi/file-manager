import Hierarchy from "@components/Hierarchy";
import { DocumentText1 } from "iconsax-react";
import { useState } from "react";

function App() {
  const [hierarchy, setHierarchy] = useState([
    {
      id: 0,
      title: "the fucking best",
      isOpen: false,
      children: [
        {
          id: 1,
          title: "dont_readme.md",
          isOpen: false,
        },
        {
          id: 1,
          title: "dare-to-readme.md",
          isOpen: false,
        },
      ],
    },
    {
      id: 1,
      title: "readme.md",
      isFolder: false,
    },
  ]);

  return (
    <div className="grid h-[100vh] grid-cols-4">
      <div className="col-span-1 bg-slate-100 p-4">
        <div className="flex flex-col items-start">
          {hierarchy.map((item) => (
            <Hierarchy item={item} />
          ))}
        </div>
      </div>
      <div className="col-span-3 flex items-center justify-center text-center">
        <div className="flex flex-col items-center gap-4">
          <DocumentText1 size="92" className="opacity-50" />
          <h1 className="text-2xl opacity-50">Choose a File to Start</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
