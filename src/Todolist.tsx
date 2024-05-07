import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";

import s from './TodoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    filter: FilterValuesType

    removeTask: (taskId: string, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskTitle: (taskId: string,  title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void

    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (title: string, todolistId: string) => void

}

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             filter,
                             addTask,
                             removeTask,
                             changeTaskTitle,
                             changeTaskStatus,
                             removeTodolist,
                             changeTodolistFilter,
                             changeTodolistTitle,
                         }: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null);
    // const [filterValue, setFilterValue] = useState('all');
    //CRUD
    //tasks
    const addTaskHandler = (title: string) => {
        addTask(title, todolistId)
    }
    const changeTaskStatusHandler = (isDone: boolean, taskId: string) => {
        changeTaskStatus(taskId, isDone, todolistId);
    }
    const changeTaskTitleHandler = (title: string, taskId: string) => {
        changeTaskTitle(taskId, title, todolistId)
    }

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeTodolistFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => removeTodolist(todolistId)

    const changeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(title, todolistId)
    }


    return (
        <div>
            <h3>
                <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
                <IconButton color={"error"} onClick={removeTodolistHandler} aria-label="delete">
                    <HighlightOffIcon />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            return <ListItem
                                disablePadding
                                className={task.isDone ? s.isDone : ''}
                                key={task.id}
                                sx={getListItemSx(task.isDone)}
                            >
                                <div>
                                    <Checkbox
                                        checked={task.isDone}
                                        onChange={(event) => changeTaskStatusHandler(event.currentTarget.checked, task.id)}
                                    />
                                    <EditableSpan title={task.title} changeTitle={(title) => changeTaskTitleHandler(title, task.id)}/>
                                </div>
                                <IconButton onClick={removeTaskHandler} color={"error"} aria-label="delete">
                                    <HighlightOffIcon />
                                </IconButton>
                            </ListItem>
                        })}
                    </List>
            }
            <Box sx={filterButtonsContainerSx}>
                <Button
                    size={"small"}
                    color={filter === 'all' ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={() => changeFilterTasksHandler('all')}>All</Button>
                <Button
                    size={"small"}
                    color={filter === 'active' ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={() => changeFilterTasksHandler('active')}>Active</Button>
                <Button
                    size={"small"}
                    color={filter === 'completed' ? "secondary" : "primary"}
                    variant={"contained"}
                    onClick={() => changeFilterTasksHandler('completed')}>Completed</Button>
            </Box>
        </div>
    )
}
