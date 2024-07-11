import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {action} from '@storybook/addon-actions'

import { Button } from './Button';
import {AddItemForm, AddItemFormPropsType} from "../AddItemForm";
import React, {ChangeEvent, KeyboardEvent, memo, useState} from "react";
import {IconButton, TextField} from "@mui/material";
import {AddBox} from "@mui/icons-material";


const meta: Meta<typeof AddItemForm> = {
  title: 'TODOLISTS/AddItemForm',
  component: AddItemForm,
  parameters: {

    layout: 'centered',
  },

  tags: ['autodocs'],

  argTypes: {
    addItem: {
      description: 'button clicked inside form',
      // action: 'clicked' //Старый вариант до fn()
    }
  },
  args: {
    addItem: fn()
  },
};

export default meta;
type Story = StoryObj<typeof AddItemForm>;


export const AddItemFormStory: Story = {};

export const AddItemFormError = memo((props: AddItemFormPropsType) => {
  let [title, setTitle] = useState("")
  let [error, setError] = useState<string | null>("Title is required")

  const addItem = () => {
    if (title.trim() !== "") {
      props.addItem(title);
      setTitle("");
    } else {
      setError("Title is required");
    }
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if(error) setError(null);
    if (e.charCode === 13) {
      addItem();
    }
  }

  return <div>
      <TextField variant="outlined"
  error={!!error}
  value={title}
  onChange={onChangeHandler}
  onKeyPress={onKeyPressHandler}
  label="Title"
  helperText={error}
  />
  <IconButton color="primary" onClick={addItem}>
      <AddBox />
      </IconButton>
      </div>
})


//-------argType--------
// export const AddItemFormErrorStory: Story = {
//   render: (argType) => <AddItemFormError addItem={argType.addItem}/>
// };


// --------arg----------
export const AddItemFormErrorStory: Story = {
  render: (args) => <AddItemFormError addItem={args.addItem}/>
};

// export const AddItemFormErrorStory: Story = {
//   render: () => <AddItemFormError addItem={action('addItem')}/>
// };
