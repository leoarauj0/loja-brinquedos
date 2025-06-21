import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type Menu = {
  menu: string;
  setMenu: Dispatch<SetStateAction<string>>;
};

const MenuContext = createContext({} as Menu);

export function MenuProvider({ children }) {
  const [menu, setMenu] = useState("");

  return (
    <MenuContext.Provider value={{ menu, setMenu }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenuContext() {
  return useContext(MenuContext);
}
