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
    const [value, setValue] = useState(row.value);
    const [isDisabled, setDisabled] = useState(row.isDisabled);
    const {updateRow, deleteRow} = useContext(ActionsContext);

    useEffect(() => updateRow(index, {sign, value, isDisabled}), [sign, value, isDisabled, index]);

    const onChangeInputValue = (e) => {
        const newValue = Number(e.target.value.length > 0 ? e.target.value : 0);
        setValue(newValue);
    }

    const onChangeSignValue = (e) => {
        const newSign = Number(e.target.value) as Row['sign'];
        setSign(newSign);
    }

    const onDeleteClick = () => {
        deleteRow(index);
    }

    const buttonStyle = "h-full mx-1 bg-gray-200 hover:bg-gray-300 text-gray-500 font-bold rounded px-1"
    const formStyle = "h-full mx-1 border border-gray-900 rounded bg-transparent text-gray-900 disabled:border-gray-400 disabled:bg-gray-100"

    return (
        <div className="items-center mt-2 h-7">
            <select className={formStyle}
                disabled={isDisabled}
                onChange={e => onChangeSignValue(e)}
            >
                <option value={1}>+</option>
                <option value={-1}>-</option>
            </select>
            <input className={formStyle}
                   disabled={isDisabled}
                   type="number"
                   onChange={e => onChangeInputValue(e)}
            />

            <button className={buttonStyle} onClick={onDeleteClick}>Delete</button>
            {
                isDisabled ? <button className={buttonStyle} onClick={() => setDisabled(false)}>Enable</button> : <button className={buttonStyle} onClick={() => setDisabled(true)}>Disable</button>
            }
        </div>
    );
}

export default Row;
