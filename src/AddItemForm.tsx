// @flow
import * as React from 'react';
import s from "./AddItemForm.module.css";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import AddTaskIcon from '@mui/icons-material/AddTask';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import {IconButton, TextField} from "@mui/material";

export type AddItemFormPropsType = {
    addItem: (title: string) => void
};


export const AddItemForm = ({addItem}: AddItemFormPropsType) => {


    const [itemTitle, setItemTitle] = useState('')
    const [error, setError] = useState<string | null>(null)
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
        setError('Title is required')
    }

    const addItemHandler = () => {
        if(itemTitle.trim()){
            addItem(itemTitle.trim())
            setItemTitle('')
        }
        else{
            setError(null)
        }

    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            {/*<input*/}
            {/*    className={error ? s.error : ''}*/}
            {/*    value={itemTitle}*/}
            {/*    onChange={changeItemTitleHandler}*/}
            {/*    onKeyUp={addItemOnKeyUpHandler}*/}
            {/*/>*/}
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
            {/*<Button title={'+'} onClick={addItemHandler}/>*/}
            <IconButton
                color={"success"}
                onClick={addItemHandler}
                aria-label="add">
                <AddTaskIcon />
            </IconButton>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
    );
};