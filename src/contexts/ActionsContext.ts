import { createContext } from "react";
import { RowData } from "../components/Row";

export const ActionsContext = createContext<{
  updateRow: (row: RowData) => void;
  deleteRow: (row: RowData) => void;
  addRow: () => void;
} | null>(null);
