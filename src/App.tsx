import { useState, useMemo } from "react";
import Row, { RowData } from "./components/Row";
import Header from "./components/Header";
import { ActionsContext } from "./contexts/ActionsContext";
import { v4 as uuid } from "uuid";

function App() {
  const [rowList, setRowList] = useState<RowData[]>([]);

  const calculateValue = (acc: number, row: RowData): number => {
    return row.isDisabled ? acc : acc + row.sign * row.value;
  };

  const result = useMemo(
    () => rowList.reduce((acc, row) => calculateValue(acc, row), 0),
    [rowList]
  );

  const updateRow = (row: RowData) => {
    const index = rowList.findIndex((r) => r.id === row.id);
    if (index !== -1) {
      const list = [...rowList];
      list[index] = { ...list[index], ...row };

      setRowList(list);
    }
  };

  const deleteRow = (row: RowData) => {
    const list = rowList.filter((r) => r.id !== row.id);

    setRowList(list);
  };

  const addRow = () => {
    setRowList([
      ...rowList,
      { id: uuid(), sign: 1, value: 0, isDisabled: false },
    ]);
  };

  return (
    <ActionsContext.Provider value={{ updateRow, deleteRow, addRow }}>
      <div className="m-5">
        <Header result={result} />
        {rowList.map((row) => {
          return <Row key={row.id} row={row} />;
        })}
      </div>
    </ActionsContext.Provider>
  );
}

export default App;
