import s from "./AddItemForm.module.css";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void
};

export const AddItemForm = ({addItem}: AddItemFormPropsType) => {
    const [itemTitle, setItemTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError(null)
    }


    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }

    const addItemHandler = () => {
        if (itemTitle.trim()) {
            addItem(itemTitle.trim())
            setItemTitle('')
        } else {
            setError('This title is required')
        }
    }

    return (
        <div>
            <input className={error ? s.error : ''}
                   value={itemTitle}
                   onChange={changeItemTitleHandler}
                   onKeyUp={addItemOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addItemHandler}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};