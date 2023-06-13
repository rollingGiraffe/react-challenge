import { useState, useEffect, useContext, ChangeEvent } from "react";
import { ActionsContext } from "../contexts/ActionsContext";

export interface RowData {
  id: string;
  sign: 1 | -1;
  value: number;
  isDisabled: boolean;
}

interface Props {
  row: RowData;
}

function Row({ row }: Props) {
  const [sign, setSign] = useState(row.sign);
  const [value, setValue] = useState(0);
  const [isDisabled, setDisabled] = useState(row.isDisabled);
  const { updateRow, deleteRow } = useContext(ActionsContext)!;

  useEffect(
    () => updateRow({ id: row.id, sign, value, isDisabled }),
    [sign, value, isDisabled]
  );

  const onChangeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setValue(newValue);
  };

  const onChangeSignValue = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSign = Number(e.target.value) as RowData["sign"];
    setSign(newSign);
  };

  return (
    <div className="items-center mt-2 h-7">
      <select
        className="form-input"
        disabled={isDisabled}
        onChange={onChangeSignValue}
        value={sign}
      >
        <option value={1}>+</option>
        <option value={-1}>-</option>
      </select>
      <input
        className="form-input"
        disabled={isDisabled}
        type="number"
        onChange={onChangeInputValue}
      />

      <button className="btn" onClick={() => deleteRow(row)}>
        Delete
      </button>
      {isDisabled ? (
        <button className="btn" onClick={() => setDisabled(false)}>
          Enable
        </button>
      ) : (
        <button className="btn" onClick={() => setDisabled(true)}>
          Disable
        </button>
      )}
    </div>
  );
}

export default Row;
