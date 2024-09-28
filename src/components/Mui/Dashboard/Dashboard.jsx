import * as React from 'react';
// import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { 
    AppBar, Container, Divider, Drawer, Grid2,
    List, ListItem, ListItemButton, ListItemText, Toolbar, Typography 
} from '@mui/material';
import { styled } from '@mui/material/styles';

import DrawerContainer, { formatSize } from '../Drawer/Drawer';
import { Chat, ChatView } from '../../custom/Chat';
import { NotionPage } from '../../custom/NotionPage'
import { useAppStore, useChatStore } from '../../../utilities/store';
import { useWindowSize } from 'usehooks-ts';


const Styled = {
    MainContainer: styled(Box)(({ theme, windowSize }) => ({
        marginTop: "80px",
        overflow: 'auto',
        width: ["xs", "sm", "md"].includes(windowSize)
            ? '100%'
            : "calc(100% - 0px)",
        marginLeft: ["xs", "sm", "md"].includes(windowSize)
            ? 0
            : "200px",
        maxWidth: "100vw",
        padding: "16px"
    })),
    MainContent: styled(Grid2)(({ theme }) => ({ 
        mt: 2, 
        p: 2, 
        px: 3, 
        textAlign: "left" 
    }))
};

export default function Dashboard(props) {
    const appStore = useAppStore();
    const chatStore = useChatStore();
    const windowSize = useWindowSize();
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
            <DrawerContainer
                variant={{ 
                    xs: "temporary", 
                    sm: "temporary", 
                    md: "temporary",
                    lg: "permanent",
                    xl: "permanent"
                }}
                anchor={{ xs: "top", sm: "top", md: "top", lg: "left", xl: "left" }}
                open={false}
                sx={{ width: "auto", zIndex: 8 }}
                // boxStyle={{ width: "500px" }}
            >
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
            </DrawerContainer>

            <Styled.MainContainer component="main" windowSize={formatSize(windowSize)}>
                <Chat chatStore={chatStore} handleCameraClick={() => props.router.go("/camera")} />
                <Styled.MainContent container>
                    <Grid2 item size={12}>
                        {/* Posts feed -- to track progress/updates/etc... */}
                        <ChatView 
                            chatStore={{...chatStore, messages: [
                            {
                                id: "1",
                                text: `
                                    So basically this spot is to be used for posting random thoughts
                                    and ideas. Also any quick updates on the progress of a project, todo lists,
                                    guides, etc.
                                `,
                                sender: "user"
                            },
                            {
                                id: "2",
                                text: `
                                    I still need to connect this feed to a database.
                                `,
                                sender: "bot"
                            },
                            {
                                id: "3",
                                text: `
                                    # CherryTop

                                    ## Todos

                                    - [ ] Document all the components
                                    - [ ] Document all the Microfrontends
                                    - [ ] Create flowchart for architecture
                                `,
                                sender: "user"
                            },
                        ]}} 
                        sx={{ minHeight: "auto", height: "auto" }}
                        />
                    </Grid2>
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