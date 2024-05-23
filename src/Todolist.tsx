import {FilterValuesType, TaskType} from "./App";
// import {Button} from "./Button";
import s from './Todolist.module.css'
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Box, Button, Checkbox, IconButton, List, ListItem} from "@mui/material";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {filterButtonsContainerSx, getListItemSx} from "./Todolist.styles";


type PropsType = {
	todolistId: string
	title: string
	tasks: TaskType[]
	filter: FilterValuesType

	removeTask: (taskId: string, todolistId: string) => void
	addTask: (title: string, todolistId: string) => void
	changeTaskStatus:(taskId:string,newIsDone:boolean, todolistId: string)=>void

	changeTodolistFilter: (filter: FilterValuesType, todolistId: string) => void
	removeTodolist: (todolistId: string) => void

	changeTaskTitle: (taskId: string, title: string, todolistId: string) => void
	changeTodolistTitle: (title: string, todolistId: string) => void
}

export const Todolist = (
	{	title,
		tasks,
		filter,
		todolistId,
		addTask,
		removeTask,
		changeTaskStatus,
		changeTodolistTitle,
		changeTaskTitle,
		changeTodolistFilter,
		removeTodolist}: PropsType) => {

	const addTaskHandler = (title: string) => {
			addTask(title, todolistId)
	}
	const changeFilterTasksHandler = (filter: FilterValuesType) => {
		changeTodolistFilter(filter, todolistId)
	}
	const changeTaskStatusHandler=(taskID:string,newIsDone:boolean)=>{
		changeTaskStatus(taskID, newIsDone, todolistId)
	}
	const changeTaskTitleHandler=(title:string,taskID:string)=>{
		changeTaskTitle(taskID, title, todolistId)
	}
	// const removeTodolistHandler = () => {
	//
	// }

	const changeTodolistTitleHandler = (title: string) => changeTodolistTitle(title, todolistId)
	return (
		<div>
			<h3><EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
			{/*<Button title={'X'} onClick={()=>removeTodolist(todolistId)}/>*/}
				<IconButton
					color={"warning"}
					onClick={()=>removeTodolist(todolistId)} aria-label="delete">
					<DeleteForeverIcon />
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
							// const changeTaskStatusHandler=(event:ChangeEvent<HTMLInputElement>)=>{
							// 	changeStatusIsDone(task.id,event.currentTarget.checked)
							// }

							return <ListItem
								sx={getListItemSx(task.isDone)}
								disablePadding={true}
								key={task.id}
								className={task.isDone? s.isDone : ''}>
								<div>
									<Checkbox
										color={'secondary'}
										checked={task.isDone}
										onChange={(event)=>changeTaskStatusHandler(task.id,event.currentTarget.checked)}>
									</Checkbox>
									<EditableSpan title={task.title} changeTitle={(title)=>changeTaskTitleHandler( title, task.id)}/>
								</div>

								<IconButton
									color={"error"}
									onClick={removeTaskHandler} aria-label="delete">
									<DeleteForeverIcon />
								</IconButton>
							</ListItem>
						})}
					</List>
			}
			<Box sx={filterButtonsContainerSx}>
				<Button

					size={"small"}
					className= {filter === 'all' ? s.activeFilter : ''}
					color={filter === 'all' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={()=> changeFilterTasksHandler('all')}
				>
					All
					</Button>
				<Button

					size={"small"}
					className= {filter === 'active' ? s.activeFilter : ''}
					color={filter === 'active' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={()=> changeFilterTasksHandler('active')}
				>
					Active
				</Button>
				<Button

					size={"small"}
					className= {filter === 'completed' ? s.activeFilter : ''}
					color={filter === 'completed' ? "secondary" : "primary"}
					variant={'contained'}
					onClick={()=> changeFilterTasksHandler('completed')}
				>
					Completed
				</Button>
				{/*<Button*/}
				{/*	className={filter === 'active' ? s.activeFilter : ''}*/}
				{/*	title={'Active'}*/}
				{/*	onClick={()=> changeFilterTasksHandler('active')}*/}
				{/*/>*/}
				{/*<Button*/}
				{/*	className={filter === 'completed' ? s.activeFilter : ''}*/}
				{/*	title={'Completed'}*/}
				{/*	onClick={()=> changeFilterTasksHandler('completed')}*/}
				{/*/>*/}
			</Box>
		</div>
	)
}
