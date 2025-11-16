import { createContext } from "react";
import { IModalActionProps } from "../types/modal";

interface IModalContext {
  modalAction: (props: IModalActionProps) => void;
}

export const ModalContext = createContext<IModalContext | null>(null);
