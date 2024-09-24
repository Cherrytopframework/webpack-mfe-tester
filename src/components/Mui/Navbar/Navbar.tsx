import {
    AppBar, Box, IconButton, 
    Toolbar, Tooltip, Typography
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


interface NavbarLayoutType {
    left: {
        items: any[]
    }
    middle: {
        items: any[]
    }
    right: {
        items: any[]
    }
};

const getIconByKey = (item: any) => ({
    "home": (
        <Tooltip title={item?.buttonProps?.tooltip ? item.buttonProps.tooltip : "Home"}>
            <IconButton color="inherit" onClick={item?.onClick} {...item?.buttonProps || {}}>
                <HomeIcon />
            </IconButton>
        </Tooltip>
    ),
    "drawer": (
        <Tooltip title={item?.buttonProps?.tooltip ? item.buttonProps.tooltip : "Drawer"}>
            <IconButton onClick={item.onClick} color="inherit" {...item?.buttonProps || {}}>
                <KeyboardArrowLeftIcon />
            </IconButton>
        </Tooltip>
    ),
    "menu": (
        <Tooltip title={item?.buttonProps?.tooltip ? item.buttonProps.tooltip : "Menu"}>
            <IconButton onClick={item.onClick} color="inherit" {...item?.buttonProps || {}}>
                <MenuIcon />
            </IconButton>
        </Tooltip>
    ),
    "cart": (
        <Tooltip title={item?.buttonProps?.tooltip ? item.buttonProps.tooltip : "Cart"}>
            <IconButton onClick={item.onClick} color="inherit" {...item?.buttonProps || {}}>
                <ShoppingCartIcon />
            </IconButton>
        </Tooltip>
    ),
}[item.key as string]);

const Navbar = (
    { layout }:
    { layout?: NavbarLayoutType }
) => {
    return (
        <AppBar>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box sx={{ flexGrow: 0 }}>
                    {layout
                        ? layout?.left?.items?.map((item: any) => getIconByKey(item)) 
                        : (
                            <IconButton onClick={() => {}}>
                                <HomeIcon />
                            </IconButton>
                        )}
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    {layout 
                        ? layout?.middle?.items?.map((item: any) => (
                            <Typography variant="h6">{item.content}</Typography>
                        )) : (
                            <Typography variant="h6">CherrytopFramework</Typography> 
                        )
                    }
                </Box>
                <Box sx={{ flexGrow: 0 }}>
                    {layout
                        ? layout?.right?.items?.map((item: any) => (
                            <>
                                {item.key === "menu" 
                                    ? item.content
                                    : getIconByKey(item)
                                }
                            </>
                        )) : (
                            <>
                            {/* default */}
                            </>
                        )
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
export type { NavbarLayoutType };