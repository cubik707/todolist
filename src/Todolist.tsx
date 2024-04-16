import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./Button";
import s from './TodoList.module.css'

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (title: string) => void
	changeStatusIsDone:(taskId:string,newIsDone:boolean)=>void
	filter: FilterValuesType
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask, changeStatusIsDone, filter}: PropsType) => {
	const [taskTitle, setTaskTitle] = useState('')
	const [error, setError] = useState<string | null>(null);
	// const [filterValue, setFilterValue] = useState('all');
	const addTaskHandler = () => {
		if (taskTitle.trim()){
			addTask(taskTitle.trim())
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
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeFilter(filter)
		// setFilterValue(filter);
	}

	const changeStatusIsDoneHandler=(isDone: boolean, taskId: string)=>{
		changeStatusIsDone(taskId, isDone);
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input className = {error? s.error: ''}
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
								removeTask(task.id)
							}
							// const changeStatusIsDoneHandler=(event:ChangeEvent<HTMLInputElement>)=>{
							// 	changeStatusIsDone(task.id,event.currentTarget.checked)
							// }

							return <li className={task.isDone ? s.isDone : ''} key={task.id}>
								<input

									type="checkbox"
									checked={task.isDone}
									onChange={(event) => changeStatusIsDoneHandler(event.currentTarget.checked, task.id)}
								/>
								<span>{task.title}</span>
								<Button onClick={removeTaskHandler} title={'x'}/>
							</li>
						})}
					</ul>
			}8
			<div>
				<Button className={filter === 'all' ? s.activeFilter : ''} title={'All'} onClick={()=> changeFilterTasksHandler('all')}/>
				<Button className={filter === 'active' ? s.activeFilter : ''}  title={'Active'} onClick={()=> changeFilterTasksHandler('active')}/>
				<Button className={filter === 'completed' ? s.activeFilter : ''}  title={'Completed'} onClick={()=> changeFilterTasksHandler('completed')}/>
			</div>
		</div>
	)
}
