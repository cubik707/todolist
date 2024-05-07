import s from "./AddItemForm.module.css";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import {IconButton, TextField} from "@mui/material";

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
            <TextField
                label="Enter a title"
                variant={'outlined'}
                value={itemTitle}
                size={'small'}
                error={!!error}
                helperText={error}
                onChange={changeItemTitleHandler}
                onKeyUp={addItemOnKeyUpHandler}
            />
            <IconButton onClick={addItemHandler} aria-label="add">
                <AddCircleIcon />
            </IconButton>
        </div>
    );
};