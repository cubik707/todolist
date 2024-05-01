import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import s from './TodoList.module.css'
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
                <Button title="x" onClick={removeTodolistHandler}/>
            </h3>
            <AddItemForm addItem={addTaskHandler}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            return <li className={task.isDone ? s.isDone : ''} key={task.id}>
                                <input

                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(event) => changeTaskStatusHandler(event.currentTarget.checked, task.id)}
                                />
                                <EditableSpan title={task.title} changeTitle={(title) => changeTaskTitleHandler(title, task.id)}/>
                                <Button onClick={removeTaskHandler} title={'x'}/>
                            </li>
                        })}
                    </ul>
            }
            <div>
                <Button className={filter === 'all' ? s.activeFilter : ''} title={'All'}
                        onClick={() => changeFilterTasksHandler('all')}/>
                <Button className={filter === 'active' ? s.activeFilter : ''} title={'Active'}
                        onClick={() => changeFilterTasksHandler('active')}/>
                <Button className={filter === 'completed' ? s.activeFilter : ''} title={'Completed'}
                        onClick={() => changeFilterTasksHandler('completed')}/>
            </div>
        </div>
    )
}
