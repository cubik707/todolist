import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import s from './TodoList.module.css'

type PropsType = {
    todolistId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todolistId: string) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterValuesType
}

export const Todolist = ({
                             todolistId,
                             title,
                             tasks,
                             addTask,
                             removeTask,
                             removeTodolist,
                             changeTodolistFilter,
                             changeTaskStatus,
                             filter
                         }: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null);
    // const [filterValue, setFilterValue] = useState('all');
    //CRUD
    //tasks
    const addTaskHandler = () => {
        if (taskTitle.trim()) {
            addTask(taskTitle.trim(), todolistId)
            setTaskTitle('')
        } else {
            setError('This title is required')
        }
    }
    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
        setError(null)
    }
    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const changeTaskStatusHandler = (isDone: boolean, taskId: string) => {
        changeTaskStatus(taskId, isDone, todolistId);
    }
    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeTodolistFilter(filter, todolistId)
    }

    const removeTodolistHandler = () => removeTodolist(todolistId)


    return (
        <div>
            <h3>
                {title}
                <Button title="x" onClick={removeTodolistHandler}/>
            </h3>
            <div>
                <input className={error ? s.error : ''}
                       value={taskTitle}
                       onChange={changeTaskTitleHandler}
                       onKeyUp={addTaskOnKeyUpHandler}
                />
                <Button title={'+'} onClick={addTaskHandler}/>
                {error && <div className={s.errorMessage}>{error}</div>}
            </div>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <ul>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }
                            // const changeStatusIsDoneHandler=(event:ChangeEvent<HTMLInputElement>)=>{
                            // 	changeStatusIsDone(task.id,event.currentTarget.checked)
                            // }

                            return <li className={task.isDone ? s.isDone : ''} key={task.id}>
                                <input

                                    type="checkbox"
                                    checked={task.isDone}
                                    onChange={(event) => changeTaskStatusHandler(event.currentTarget.checked, task.id)}
                                />
                                <span>{task.title}</span>
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
