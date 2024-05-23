import {TasksStateType, TaskType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistsActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    payload: {
        taskId: string,
        todolistId: string
    }
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    payload: {
        taskTitle: string,
        todolistId: string
    }
}

export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS',
    payload: {
        taskId: string,
        taskStatus: boolean
        todolistId: string
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    payload: {
        taskId: string,
        taskTitle: string
        todolistId: string
    }
}


export type ActionType = RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistsActionType

export const tasksReducer = (state: TasksStateType, action: ActionType):TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK":
            return {
                ...state,
                [action.payload.todolistId] : state[action.payload.todolistId]
                    .filter(t => t.id !== action.payload.taskId)
            }
        case "ADD-TASK": {
            const newTask: TaskType = {
                id: v1(),
                title: action.payload.taskTitle,
                isDone: false
            }
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-STATUS':{
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId? {...t, isDone: action.payload.taskStatus} : t)}
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId? {...t, title: action.payload.taskTitle} : t)}
        }
        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolistID]: []}
        }
        case "REMOVE-TODOLIST": {
            const newState = {...state}
            delete newState[action.payload.todolistId]
            return newState;
        }
        default:
            return state;
    }
}


export const removeTaskAC = (taskId: string, todolistId: string):RemoveTaskActionType => {
    return (
        {
            type: 'REMOVE-TASK',
            payload: {
                taskId,
                todolistId
            }
        } as const
    )
}
export const addTaskAC = (taskTitle: string, todolistId: string):AddTaskActionType => {
    return (
        {
            type: 'ADD-TASK',
            payload: {
                taskTitle,
                todolistId
            }
        } as const
    )
}

export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, todolistId: string):ChangeTaskStatusActionType => {
    return (
        {
            type: 'CHANGE-TASK-STATUS',
            payload: {
                taskId,
                taskStatus,
                todolistId
            }
        } as const
    )
}
export const changeTaskTitleAC = (taskId: string, taskTitle: string, todolistId: string):ChangeTaskTitleActionType => {
    return (
        {
            type: 'CHANGE-TASK-TITLE',
            payload: {
                taskId,
                taskTitle,
                todolistId
            }
        } as const
    )
}



