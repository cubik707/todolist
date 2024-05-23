// @flow
import * as React from 'react';
import {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string,
    changeTitle: (title: string) => void,

};
export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false)
    const [itemTitle, setItemTitle] = useState(title)
    const changeItemTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setItemTitle(event.currentTarget.value)
    }

    const onEditMode = () => setIsEditMode(true)
    const offEditMode = () => {
        setIsEditMode(false)
        changeTitle(itemTitle)
    }
    return (
        isEditMode
        ?   <TextField
                variant={'standard'}
                onChange={changeItemTitleHandler}
                value={itemTitle}
                onBlur={offEditMode}
            />
            // <input value={itemTitle}
            // onChange={changeItemTitleHandler}
            //      autoFocus
            // onBlur={offEditMode}/>
            : <span onDoubleClick={onEditMode}>{title}</span>
    );
};