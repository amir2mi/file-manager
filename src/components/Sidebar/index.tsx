import Hierarchy from "@components/Hierarchy";
import { useHierarchy } from "@context/hierarchy";
import { Add } from "iconsax-react";

export default function Sidebar() {
  const { hierarchy, setHierarchy, updateHierarchyChild, removeHierarchyChild } = useHierarchy();

  const handleCreate = () => {
    setHierarchy([...(hierarchy || []), { id: Date.now(), title: "", isEditing: true }]);
  };

  return (
    <div className="flex w-full flex-col items-start">
      <div className="flex w-full items-center justify-between">
        <h2 className="mb-2 text-lg font-bold">File Manager</h2>
        <button
          className="flex items-center gap-1 rounded-lg bg-slate-200 py-1 px-2 text-sm"
          onClick={() => handleCreate()}
        >
          <Add size="18" className="rotate-90" /> Create
        </button>
      </div>
      {hierarchy.map((item, index) => (
        <Hierarchy key={index} item={item} onUpdate={updateHierarchyChild} onRemove={removeHierarchyChild} />
      ))}
    </div>
  );
}
