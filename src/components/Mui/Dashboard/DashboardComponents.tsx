import { Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useAppStore } from '../../../utilities/store';

const DashboardComponents = (
    { children, initialData }:
    { children: any, initialData: any }
) => {
    const appStore = useAppStore();

    const Components = {
        toolbarTitle: "Remote Modules",
        DrawerContent: (
            <Box sx={{ width: 200, height: '100%', mt: 8 }}>
                <List>
                    <ListItem color="inherit">
                        <ListItemText primary={<h2>Components</h2>} />
                    </ListItem>
                    <Divider />
                    {initialData && [
                        {
                            title: "Home",
                            id: "2a822d5e-ac09-4df3-9981-588809928086"
                        }, 
                        ...initialData
                            .map((block: any) => ({
                                title: block.child_page.title,
                                id: block.id
                            }))
                    ].map((item) => (
                        <ListItem 
                            key={item.id} 
                            component="button" 
                            sx={{ "&:hover": { cursor: "pointer" }}}
                            onClick={() => appStore.setView(item)}
                        >
                            <ListItemText primary={item.title} />
                        </ListItem>
                    ))}
                </List>
            </Box>
        ),
        MainContent: (
            <>
            </>
        )
    };

    return children(Components);
};

export default DashboardComponents;