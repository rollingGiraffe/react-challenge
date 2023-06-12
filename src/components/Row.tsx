import {useState, useEffect, useContext} from 'react';
import {ActionsContext} from "../contexts/ActionsContext";

export interface Row {
    sign: 1 | -1;
    value: number;
    isDisabled: boolean;
}

interface Props {
    index: number;
    row: Row;
}

function Row({index, row}: Props) {
    const [sign, setSign] = useState(row.sign);
    const [value, setValue] = useState("");
    const [isDisabled, setDisabled] = useState(row.isDisabled);
    const {updateRow, deleteRow} = useContext(ActionsContext);

    useEffect(() => handleUpdate(index, sign, value, isDisabled), [sign, value, isDisabled, index]);

    const handleUpdate = (index, sign, value, isDisabled) :void => {
        const numericValue = Number(value.length > 0 ? value : "0");
        updateRow(index, {sign, value:numericValue, isDisabled});
    }

    const onChangeInputValue = (e) :void => {
        const newValue = e.target.value;
        setValue(newValue);
    }

    const onChangeSignValue = (e) :void => {
        const newSign = Number(e.target.value) as Row['sign'];
        setSign(newSign);
    }

    const onDeleteClick = () :void => {
        setValue("");
        setDisabled(false);
        setSign(1)

        deleteRow(index);
    }

    const buttonStyle = "h-full mx-1 bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold rounded px-1"
    const formStyle = "h-full mx-1 pl-1 border border-gray-900 rounded bg-transparent text-gray-900 disabled:border-gray-400 disabled:bg-gray-100"

    return (
        <div className="items-center mt-2 h-7">
            <select className={formStyle}
                disabled={isDisabled}
                onChange={e => onChangeSignValue(e)}
                value={sign}
            >
                <option value={1}>+</option>
                <option value={-1}>-</option>
            </select>
            <input className={formStyle}
                   disabled={isDisabled}
                   type="number"
                   onChange={e => onChangeInputValue(e)}
                   value={value}
            />

            <button className={buttonStyle} onClick={onDeleteClick}>Delete</button>
            {
                isDisabled ? <button className={buttonStyle} onClick={() => setDisabled(false)}>Enable</button> : <button className={buttonStyle} onClick={() => setDisabled(true)}>Disable</button>
            }
        </div>
    );
}

export default Row;
