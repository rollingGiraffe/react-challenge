import { useContext } from "react";
import { ActionsContext } from "../contexts/ActionsContext";

interface Props {
  result: number;
}

function Header({ result }: Props) {
  const { addRow } = useContext(ActionsContext)!;

  return (
    <div>
      <h2 className="font-bold leading-7 text-gray-900 truncate text-xl tracking-tight">
        Welcome to my very simple React Adder!
      </h2>
      <div className="mt-1 inline-block inline-flex">
        <button className="header-btn" onClick={addRow}>
          Add Row
        </button>
        <div className="mt-2 mx-5 items-center text-xl text-gray-500 font-bold">
          Result: {result}
        </div>
      </div>
    </div>
  );
}

export default Header;
