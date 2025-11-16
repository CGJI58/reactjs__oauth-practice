import { useContext } from "react";
import { ModalContext } from "../Contexts/ModalContext";

function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalContext not found");
  return context;
}

export default useModalContext;
