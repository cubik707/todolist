import {FilterValueType, TaskType} from "./App";
import {Button} from "./Button";
import {useState} from "react";

type PropsType = {
	title: string
	tasks: TaskType[]
	removeTask: (taskId: number) => void
}

export const Todolist = ({title, tasks, removeTask}: PropsType) => {

	let [valueF, setValueF] = useState<FilterValueType>('All')

	const fooDurshlag = () => {

		switch (valueF) {
			case 'Active':
				 return  tasks.filter((task) => task.isDone);
			case 'Completed':
				return tasks.filter((task) => !task.isDone);
			default:
				return tasks;
		}
	}



	const changeFilter = (filterValue: FilterValueType) => {
		setValueF(filterValue)
	}


	return (
		<div>
			<h3>{title}</h3>
			<div>
				<input/>
				<Button onClick={() => {}} title={'+'}/>
			</div>
			{
				tasks.length === 0
					? <p>Тасок нет</p>
					: <ul>
						{fooDurshlag().map((task) => {
							return <li key={task.id}>
								<Button title={"x"} onClick={() => removeTask(task.id)}/>
								<input type="checkbox" checked={task.isDone}/>
								<span>{task.title}</span>
							</li>
						})}
					</ul>
			}
			<div>
				{/*<button onClick={() => changeFilter('All')}>All</button>*/}
				{/*<button onClick={() => changeFilter('Active')}>Active</button>*/}
				{/*<button onClick={() => changeFilter('Completed')}>Completed</button>*/}
				<Button onClick={() => changeFilter('All')} title={'All'} />
				<Button onClick={() => changeFilter('Active')} title={'Active'}/>
				<Button onClick={() => changeFilter('Completed')} title={'Completed'}/>
			</div>
		</div>
	)
}
