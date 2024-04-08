import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useRef, useState} from "react";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: string) => void
	changeFilter: (filter: FilterValuesType) => void
	addTask: (newTitle: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: PropsType) => {
	//const inputRef = useRef<HTMLInputElement>(null)
	const [newTitle, setNewTitle] = useState('')


	const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>)=>{
		if(event.key==='Enter'){
			addTaskHandler();
		}
	}

	const onChangeHandler = (event: ChangeEvent<HTMLInputElement> ) => {
		setNewTitle(event.currentTarget.value)
	}

	// const removeTaskHandler = (taskId: string) => removeTask(taskId);

	const setTasksHandler = (filterType: FilterValuesType) => {
		changeFilter(filterType);
	}

	const mappedTasks= tasks.length === 0
		? <p>Тасок нет</p>
		: <ul>
			{tasks.map(task => {
				const removeTaskHandler = () => removeTask(task.id);
				return (
					<li key={task.id}>
						<input type="checkbox" checked={task.isDone}/>
						<span>{task.title}</span>
						{/*<button onClick={removeTaskHandler}>X</button>*/}
						<Button title={'X'} onClick={() => removeTask(task.id)}/>
					</li>
				)
			})}
		</ul>

	const addTaskHandler = () =>{
		addTask(newTitle)
		setNewTitle('')
	}

	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input value={newTitle}
					   onChange={onChangeHandler}
					   onKeyDown={onKeyDownHandler}
				/>
				{/*<button onClick={addTaskHandler}>+</button>*/}
				<Button title={'+'} onClick={addTaskHandler}/>
			</div>
			{mappedTasks}
			<div>
				{/*<button onClick={() => {changeFilter('all')}}>All</button>*/}
				{/*<button onClick={() => setTasksHandler('all')}>All</button>*/}
				{/*<button onClick={() => setTasksHandler('active')}>Active</button>*/}
				{/*<button onClick={() => setTasksHandler('completed')}>Completed</button>*/}
				<Button title={'All'} onClick={() => setTasksHandler('all')}/>
				<Button title={'Active'} onClick={() => setTasksHandler('active')}/>
				<Button title={'Completed'} onClick={() => setTasksHandler('completed')}/>
			</div>
		</div>
	)
}