import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { 
    AppBar, Container, Divider, Drawer, Grid2,
    List, ListItem, ListItemButton, ListItemText, Toolbar, Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

import { NotionPage } from '../../custom/NotionPage'
import { useAppStore } from '../../../utilities/store';


const Styled = {
    MainContainer: styled(Box)(({ theme }) => ({
        marginTop: "80px",
        overflow: 'auto',
        width: '80%' - 200,
        marginLeft: "220px",
        maxWidth: "100vw",
    })),
    MainContent: styled(Grid2)(({ theme }) => ({ mt: 2, p: 2, px: 3, textAlign: "left" })),
};

export default function Dashboard(props) {
    const appStore = useAppStore();
    console.log("Dashboard.props: ", props)
    return (
        <Box sx={{ display: 'flex' }}>

            {/* <AppBar sx={{ zIndex: 100 }}>
                <Toolbar>
                    <Typography color="inherit" variant="h6" component="h6">
                        CherryTop Framework
                    </Typography>
                </Toolbar>
            </AppBar> */}

            <Drawer
                variant="permanent"
                open={true}
                anchor="left"
                sx={{
                    display: { xs: 'none', md: 'block' },
                    zIndex: 90,
                }}
            >
                {/* <React.Suspense fallback="Loading...">
                    {props?.DashboardComponents?.DrawerContent && (
                        <props.DashboardComponents.DrawerContent />
                    )}
                </React.Suspense> */}
                <Box sx={{ width: 200, height: '100%', mt: 8 }}>
                    <List dense>
                        <Divider />
                        {props?.initialData && [
                            {
                                title: "Getting Started",
                                id: ""
                            }, 
                            {
                                title: "Home",
                                id: "2a822d5e-ac09-4df3-9981-588809928086"
                            }, 
                            ...props.initialData
                                .map((block) => ({
                                    title: block.child_page.title,
                                    id: block.id
                                }))
                        ].map((item, index) => (
                            <ListItem 
                                key={item.id} 
                                // component="button" 
                                sx={{ "&:hover": { cursor: "pointer" }}}
                            >
                                <ListItemButton disabled={!index} onClick={() => appStore.setView(item)}>
                                    <ListItemText primary={item.title} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>

            <Styled.MainContainer component="main">
                <Styled.MainContent container>
                    <Grid2 item size={12}>
                        <Typography variant="h4">
                            {appStore.view.title}
                        </Typography>
                    </Grid2>
                    {appStore.view?.id && (
                        <Grid2 item size={12}>
                            <NotionPage path={(paths) => `/notion/${appStore.view.id}`} />
                        </Grid2>
                    )}
                </Styled.MainContent>
            </Styled.MainContainer>

        </Box>
    )
}