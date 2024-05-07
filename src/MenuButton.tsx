import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'

type MenuButtonProps = {
    background?: string
}


export const MenuButton = styled(Button)<MenuButtonProps>(({background, theme})=>({
    minWidth: '110px',
    fontWeight: 'bold',
    border: '1px solid #fff',
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color:theme.palette.primary.contrastText,
    background: background || theme.palette.primary.light,
}))