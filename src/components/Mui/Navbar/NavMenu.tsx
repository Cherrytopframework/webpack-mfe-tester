import React from 'react'
import {
    Avatar, IconButton, Menu,
    MenuItem, Tooltip, Typography
} from '@mui/material';

// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const NavMenu = (props: any) => {
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = async (item: { key: string, onClick?: () => void }) => {
        if (item?.onClick) item.onClick()
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
            {props?.items && props.items.map((item: any) => (
                <MenuItem key={item.key} onClick={() => handleCloseUserMenu(item)}>
                    <Typography textAlign="center">{item.key}</Typography>
                </MenuItem>
            ))}
            </Menu>
        </>
    );
};

export default NavMenu;