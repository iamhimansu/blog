import Box from '@mui/material/Box';
import { Button, Divider, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { CreateTwoTone, HomeTwoTone, PersonAddTwoTone } from '@mui/icons-material';
import { ReactComponent as Logo } from "../assets/Hylogo.svg";
export default function Navbar() {

    return (
        <>
            <Box component='section' sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box component='div' sx={{ p: 2, flexGrow: 1 }}>
                    <Logo style={{ height: '32px', width: 'auto', color: '#0F172A' }} />
                </Box>
                <Stack direction="row" gap={1} sx={{ paddingRight: 2 }}>
                    <IconButton size='small' component={Link} to='/' sx={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}><HomeTwoTone /></IconButton>
                    <IconButton size='small' component={Link} to='/create' sx={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}><CreateTwoTone /></IconButton>
                    <IconButton size='small' component={Link} to='/register' sx={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}><PersonAddTwoTone /></IconButton>
                    <Button size='small' component={Link} to='/login' sx={{ color: '#000', fontSize: 14, fontWeight: 'bold' }}>Login</Button>
                </Stack>
            </Box >
            <Divider></Divider>
        </>
    );

}