import { createContext, useContext, useEffect, useState } from "react";

export interface HierarchyItemProps {
  children?: HierarchyItemProps[];
  id: number | string;
  isOpen?: boolean;
  isEditing?: boolean;
  title: string;
}

interface HierarchyContextProps {
  hierarchy: HierarchyItemProps[];
  removeHierarchyChild: (child: HierarchyItemProps) => void;
  setHierarchy: (hierarchy: HierarchyItemProps[]) => void;
  updateHierarchyChild: (hierarchyChild: HierarchyItemProps) => void;
}

interface HierarchyProviderProps {
  children: React.ReactNode;
}

const HierarchyContext = createContext<undefined | HierarchyContextProps>(undefined);

const defaultHierarchy: HierarchyItemProps[] = [
  {
    id: 0,
    title: "public",
    isOpen: true,
    isEditing: false,
    children: [
      {
        id: 1,
        title: "vite.svg",
        isEditing: false,
      },
      {
        id: 190,
        title: "east-to-follow-tutorials.mkv",
        isEditing: false,
      },
    ],
  },
  {
    id: 2,
    title: "src",
    isOpen: false,
    isEditing: false,
    children: [
      {
        id: 3,
        title: "assets",
        isEditing: false,
        children: [
          {
            id: 4,
            title: "react.svg",
            isEditing: false,
          },
          {
            id: 5,
            title: "image.png",
            isEditing: false,
          },
          {
            id: 1605,
            title: "billie.mp3",
            isEditing: false,
          },
          {
            id: 198,
            title: "jackson.mp3",
            isEditing: false,
          },
        ],
      },
      {
        id: 6,
        title: "components",
        isEditing: false,
        children: [
          {
            id: 7,
            title: "Hierarchy",
            isEditing: false,
            children: [
              {
                id: 8,
                title: "index.tsx",
                isEditing: false,
              },
            ],
          },
          {
            id: 9,
            title: "Title",
            isEditing: false,
            children: [
              {
                id: 10,
                title: "index.tsx",
                isEditing: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

const HierarchyProvider = ({ children }: HierarchyProviderProps) => {
  const [hierarchy, setHierarchy] = useState<HierarchyItemProps[]>(defaultHierarchy);

  const updateHierarchyChild = (updatedChild: HierarchyItemProps) => {
    const updatedHierarchy = hierarchy.map((child) => (child.id === updatedChild.id ? updatedChild : child));
    setHierarchy(updatedHierarchy);
  };

  const removeHierarchyChild = (childToRemove: HierarchyItemProps) => {
    const updatedHierarchy = hierarchy.filter((child) => child.id !== childToRemove.id);
    setHierarchy(updatedHierarchy);
  };

  return (
    <HierarchyContext.Provider
      value={{
        hierarchy,
        removeHierarchyChild,
        setHierarchy,
        updateHierarchyChild,
      }}
    >
      {children}
    </HierarchyContext.Provider>
  );
};

const useHierarchy = () => {
  const value = useContext(HierarchyContext);

  if (value === undefined) {
    throw new Error("useHierarchy must be used within a HierarchyProvider");
  }

  return value;
};

export { HierarchyContext, HierarchyProvider, useHierarchy };
