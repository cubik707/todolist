import {Button, ButtonProps} from "@mui/material";
import {memo} from "react";


type ButtonMemoPropstType = ButtonProps

export const ButtonMemo = memo(({...props}: ButtonMemoPropstType)=>{
    return <Button {...props}>{props.children}</Button>
})