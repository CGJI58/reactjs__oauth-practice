import { createContext } from "react";
import { IModalContext } from "../types/modal";

export const ModalContext = createContext<IModalContext | null>(null);
