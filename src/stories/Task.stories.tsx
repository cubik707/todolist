import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {TaskType} from "../TodolistWithRedux";


const meta: Meta<typeof Task> = {
    title: 'TODOLISTS/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },

    tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]

};

export default meta;
type Story = StoryObj<typeof Task>;

const TaskRedux = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][1] ?? {id: '2324lkd', title: "DEFAULT-TASK", isDone: true})
    return <Task task={task} todolistId={'todolistId1'} />
}

export const TaskStory: Story = {
    render: () => <TaskRedux />
};


