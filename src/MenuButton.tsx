import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'


type MenuButtonProps = {
    background?: string,
    btnColor?: any
}
export const MenuButton = styled(Button)<MenuButtonProps>(({ background, btnColor }) => ({
    minWidth: '110px',
    fontWeight: 'bold',
    // boxShadow: '0 0 0 2px #054B62, 4px 4px 0 0 #054B62',
    border: "2px solid white",
    borderRadius: '2px',
    textTransform: 'capitalize',
    margin: '0 10px',
    padding: '8px 24px',
    color: btnColor || "#fff",
    background: background || 'inherit',
}))