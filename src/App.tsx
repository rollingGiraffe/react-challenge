import {useState, useMemo} from 'react';
import Row from "./components/Row";
import Header from "./components/Header";
import {ActionsContext} from './contexts/ActionsContext';

function App() {
    const [rowList, setRowList] = useState<Row[]>([]);

    const calculateValue = (acc: number, row: Row): number => {
        return row.isDisabled ? acc : acc + row.sign * row.value
    }

    const result = useMemo(() => rowList.reduce((acc, row) => calculateValue(acc, row), 0), [rowList])

    const updateRow = (index: number, row: Row): void => {
        const list = [...rowList];
        list.splice(index, 1, row);

        setRowList(list);
    }

    const deleteRow = (index: number): void  =>{
        const list = [...rowList];
        list.splice(index, 1);

        setRowList(list);
    }

    const addRow = ():void => {
        setRowList([...rowList, {sign: 1, value: 0, isDisabled: false}]);
    }


    return (
        <ActionsContext.Provider value={{updateRow, deleteRow, addRow}}>
            <div className="m-5">
                <Header result={result} />
                {
                    rowList.map((row, i) => {
                        return (
                            <Row key={i} index={i} row={row} />
                        );
                    })
                }
            </div>
        </ActionsContext.Provider>
    );
}

export default App;
