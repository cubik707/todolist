import {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title:string
    changeTitle: (title:string) => void
};

export const EditableSpan = ({title, changeTitle}: EditableSpanPropsType) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [itemTitle, setItemTitle] = useState(title);

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
            ? <input
                value={itemTitle}
                onChange={changeItemTitleHandler}
                onBlur={offEditMode}
            />
            : <span onDoubleClick={onEditMode}> {title} </span>
    );
};