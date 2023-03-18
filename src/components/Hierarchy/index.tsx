import { useEffect, useRef, useState } from "react";
import { Disclosure, Transition } from "@headlessui/react";
import {
  AddSquare,
  CloseCircle,
  CloseSquare,
  DocumentText1,
  Edit,
  Folder,
  FolderOpen,
  TickSquare,
  TransmitSquare,
  Trash,
} from "iconsax-react";
import type { HierarchyItemProps } from "@context/hierarchy";
import getFileType from "@utils/file-type";
import clsx from "clsx";
import FileTypeIcon from "./FileTypeIcon";

export interface HierarchyProps {
  item: HierarchyItemProps;
  onRemove: (item: HierarchyItemProps) => void;
  onUpdate: (item: HierarchyItemProps) => void;
}

export default function Hierarchy({ item, onUpdate, onRemove }: HierarchyProps) {
  const { children, title, isOpen, isEditing } = item;

  const [editTitleValue, setEditTitleValue] = useState(title);
  const editTitleInputRef = useRef<HTMLInputElement | null>(null);

  const isEmpty = !children?.length;
  const isFolder = !isEmpty || getFileType(title) === "folder";

  const handleToggle = () => {
    if (!isFolder || isEditing) return;

    onUpdate({ ...item, isOpen: !isOpen });
  };

  const handleEdit = (updatedTitle?: HierarchyItemProps["title"]) => {
    onUpdate({ ...item, isEditing: !isEditing, title: updatedTitle ? updatedTitle : title });

    if (!updatedTitle && !title) {
      // remove created item without title
      onRemove(item);
    } else {
      setEditTitleValue(title);
    }
  };

  const handleCreate = () => {
    onUpdate({
      ...item,
      isOpen: true,
      children: [...(children || []), { id: Date.now(), title: "", isEditing: true }],
    });
  };

  useEffect(() => {
    if (isEditing === true) {
      editTitleInputRef?.current?.focus();
    }
  }, [isEditing]);

  return (
    <Disclosure>
      <div className="group relative flex h-10 w-full items-center justify-between">
        <Disclosure.Button
          className={clsx("flex items-center gap-2 py-2", !isEditing && "w-full")}
          onClick={handleToggle}
        >
          {isFolder ? isOpen ? <FolderOpen size="20" /> : <Folder size="20" /> : <FileTypeIcon title={title} />}
          {!isEditing && <p className="truncate">{title}</p>}
        </Disclosure.Button>
        <div className={clsx("inset-y-auto right-0 my-auto flex items-center", !isEditing && "absolute")}>
          {isEditing ? (
            <form onSubmit={() => handleEdit(editTitleValue)} onReset={() => handleEdit()} className="flex gap-1">
              {isEditing && (
                <input
                  ref={editTitleInputRef}
                  className="mx-2 w-full rounded-lg bg-transparent outline-none"
                  value={editTitleValue}
                  onChange={({ target }) => setEditTitleValue(target.value)}
                />
              )}
              <button type="reset" aria-label="Cancel">
                <CloseSquare size="20" className="text-red-500" />
              </button>
              <button type="submit" aria-label="Submit Changes">
                <TickSquare size="20" className="text-green-500" />
              </button>
            </form>
          ) : (
            <>
              {(isFolder && isOpen) || !isFolder || isEmpty ? (
                <>
                  <button
                    className="scale-0 rounded-lg bg-slate-100 p-1 transition-transform delay-300 group-focus-within:scale-100 group-hover:scale-100"
                    onClick={() => {
                      onRemove(item);
                    }}
                  >
                    <Trash size="20" />
                  </button>
                  <button
                    className="scale-0 rounded-lg bg-slate-100 p-1 transition-transform delay-200 group-focus-within:scale-100 group-hover:scale-100"
                    onClick={() => handleEdit()}
                  >
                    <Edit size="20" />
                  </button>
                </>
              ) : null}

              {isFolder && (
                <button
                  className="scale-0 rounded-lg bg-slate-100 p-1 transition-transform delay-100 group-focus-within:scale-100 group-hover:scale-100"
                  onClick={() => handleCreate()}
                >
                  <AddSquare size="20" />
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {!isEmpty
        ? children.map((childrenItem: HierarchyItemProps, index) => (
            <Transition
              key={index}
              show={isOpen}
              className="w-full"
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
            >
              <Disclosure.Panel className="ml-4">
                <Hierarchy
                  item={childrenItem}
                  onUpdate={(updatedChild) => {
                    const updatedChildren = children.map((child) =>
                      child.id === updatedChild.id ? updatedChild : child
                    );
                    onUpdate({ ...item, children: updatedChildren });
                  }}
                  onRemove={(childToRemove) => {
                    const updatedChildren = children.filter((child) => child.id !== childToRemove.id);
                    onUpdate({ ...item, children: updatedChildren });
                  }}
                />
              </Disclosure.Panel>
            </Transition>
          ))
        : null}
    </Disclosure>
  );
}
