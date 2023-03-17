import { Disclosure, Transition } from "@headlessui/react";
import { DocumentText1, Folder, FolderOpen } from "iconsax-react";

export default function Hierarchy({ item }: any) {
  const { children, title, isOpen } = item;
  const isFolder = item?.children;

  return (
    <Disclosure>
      <Disclosure.Button className="py-2">
        {isFolder ? isOpen ? <FolderOpen size="32" /> : <Folder size="32" /> : <DocumentText1 size="32" />}
        {title}
      </Disclosure.Button>
      {children?.length &&
        children.map((item) => (
          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Disclosure.Panel className="text-gray-500">
              <Hierarchy item={children} />
            </Disclosure.Panel>
          </Transition>
        ))}
    </Disclosure>
  );
}
