import {useContext} from "react";
import {ActionsContext} from "../contexts/ActionsContext";

function Header({result}) {
    const {addRow} = useContext(ActionsContext);

    return(
        <div>
            <h2 className="font-bold leading-7 text-gray-900 truncate text-xl tracking-tight">
                Welcome to my very simple React Adder!
            </h2>
            <div className="mt-1 inline-block inline-flex">
                <button className="h-full bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold py-2 px-4 rounded"
                        onClick={addRow}>
                    Add Row
                </button>
                <div className="mt-2 mx-5 items-center text-xl text-gray-500 font-bold">
                    Result: {result}
                </div>
            </div>
        </div>
    )
}

export default Header;
