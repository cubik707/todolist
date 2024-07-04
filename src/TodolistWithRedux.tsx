import React, {ChangeEvent, memo, useCallback, useMemo} from 'react';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {TodolistType} from "./AppWithRedux";
import {useDispatch, useSelector} from "react-redux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {ButtonMemo} from "./components/ButtonMemo";
import {Task} from "./Task";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolist: TodolistType
}


export const TodolistWithRedux = memo((props: PropsType) => {
    let tasks= useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolist.id])
    const dispatch = useDispatch();
    const addTask = (title: string) => {
        dispatch(addTaskAC(title, props.todolist.id))
    }

    const removeTodolist = () => {
        dispatch(RemoveTodolistAC(props.todolist.id))
    }
    const changeTodolistTitle = useCallback ((title: string) => {
        dispatch(ChangeTodolistTitleAC(props.todolist.id, title))
    }, [props.todolist.id])

    const onAllClickHandler = useCallback (() => dispatch(ChangeTodolistFilterAC(props.todolist.id,"all")), [props.todolist.id])
    const onActiveClickHandler = useCallback (() => dispatch(ChangeTodolistFilterAC(props.todolist.id,"active")), [props.todolist.id])
    const onCompletedClickHandler = useCallback(() => dispatch(ChangeTodolistFilterAC(props.todolist.id,"completed")), [props.todolist.id])


    tasks = useMemo(()=>{
        if (props.todolist.filter === "active") {
            tasks = tasks.filter(t => !t.isDone);
        }
        if (props.todolist.filter === "completed") {
            tasks = tasks.filter(t => t.isDone);
        }
        return tasks
    }, [tasks, props.todolist.filter])

    return <div>
        <h3> <EditableSpan value={props.todolist.title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => {
                    return <Task key={t.id} task={t} todolistId={props.todolist.id}/>
                })
            }
        </div>
        <div>
            <ButtonMemo variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
             >All
            </ButtonMemo>
            <ButtonMemo variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </ButtonMemo>
            <ButtonMemo variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </ButtonMemo>
        </div>
    </div>
})




