import React from 'react'
import {
    Avatar, IconButton, Menu,
    MenuItem, Tooltip, Typography
} from '@mui/material';

const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavMenu = () => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = async () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="M" src="M" />
                </IconButton>
            </Tooltip>
            <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
            >
            {settings.map((setting: any) => (
                <MenuItem key={setting} onClick={() => handleCloseUserMenu()}>
                    <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </>
    );
};

export default NavMenu;