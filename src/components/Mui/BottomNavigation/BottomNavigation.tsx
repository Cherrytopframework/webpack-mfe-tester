import { Tabs, BottomNavigation as MuiBottomNavigation, BottomNavigationAction, Box } from '@mui/material';

const defaultContainerStyle = {
    position: "fixed", 
    bottom: 0, 
    left: 0, 
    right: 0, 
    maxWidth: "100vw", 
    overflow: "auto"
};

const BottomNavigation = ({
    items, ...props
}: {
    items: any[],
    [key: string]: any
}) => {
    return (!items || !items.length) 
        ? <></> 
        : (
            <Box sx={defaultContainerStyle}>
                <MuiBottomNavigation
                    component={Tabs}
                    showLabels
                    variant="scrollable"
                    scrollButtons="auto"
                    // value={0}
                    sx={{ zIndex: 1000, pt: 2 }}
                >
                    {items.map((item: string, index: number) => (
                        <BottomNavigationAction
                            key={index} 
                            label={item} 
                            icon={(items as any)[item]}
                            onClick={() => props?.onClick(item)}
                        />
                    ))}
                </MuiBottomNavigation>
            </Box>
        );
};

export default BottomNavigation;
