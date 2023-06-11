import {createContext} from "react";
import Row from "../components/Row";

export const ActionsContext = createContext<{
    updateRow: (index: number, row: Row) => void,
    deleteRow: (index: number) => void,
    addRow: () => void

} | null>(null);
