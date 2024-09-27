import { 
    Alert, Badge, IconButton, InputAdornment, InputLabel,
    Box, Paper, TextField, Toolbar, Tooltip, Typography 
} from '@mui/material'
import {
    AttachFile,
    Close as CloseIcon,
    Camera as CameraIcon,
    Send as SendIcon,
    RecordVoiceOver as RecordVoiceOverIcon,
    ArrowDropDown as ArrowDropDownIcon,
    // Delete as DeleteIcon
} from '@mui/icons-material';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useRef } from 'react';
import { useChatStore } from '../../../utilities/store'
import { ChatState } from '../../../utilities/store'
import { client, paths } from '../../../utilities/api';
import { chatScripts } from './chatHelper';


// ***
// * Chat Component
// * Purpose:
// *  - Drop and go chat ui with logic to expose chat values
// ***
const Chat = (props: any) => {
    const chatStore = useChatStore();

    // Plug in the passed in store if there is one
    let chat: ChatState = props?.chatStore
        ? props.chatStore
        : chatStore;

    let stabilityBalance = 0;
    const ref = useRef();

    const handleSubmit = async () => {
        console.log("send", props.submitPath);

        if (props?.submitPath) {

            props.handleSend({ status: "loading", isLoading: true });

            const path = (typeof(props.submitPath) === "function")
                ? props.submitPath(paths) 
                : props.submitPath;

            try {
                const response = await client.post(path, {
                    message: chat.inputMessage
                });

                chatScripts.handleSendMessage({
                    chatStore: chat,
                    serverMutation: {
                        mutate: (payload: any) => console.log('chatScripts.handleSendMessage: ', payload),
                    }
                });

                if (response.data) props.handleSend({ 
                    status: "success", 
                    isLoading: false, 
                    data: response.data 
                });

                
            } catch (error) {
                console.error(error);
                props.handleSend({ 
                    status: "error", 
                    isLoading: false, 
                    error: error 
                });
            }

        }
        else if (props?.handleSend) props.handleSend(chat);
    };

    useEffect(() => {
        if (props?.initialData) {
            const {
                activeChatId,
                activeChat,
                messages
            } = props?.initialData;

            chat.setState({
                activeChatId,
                activeChat,
                messages
            });
        };
    }, []);

    return (

        <Box component={Paper} sx={{ position: 'sticky', bottom: 0, left: 0, right: 0, backdropFilter: 'blur(8px)' }}>
            {/* <Box sx={{ background: "rgba(100, 100, 100, 0.1)", backdropFilter: "blur(2px)" }}>
                <Tabs value={chat.mode} onChange={(event) => chat.handleMode(event.target.value)} sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Tab label="chat" value="chat" />
                    <Tab label="create" value="create" />
                    <Tab label="imagine" value="imagine" />
                </Tabs>
                {console.log(chat.mode)}
            </Box> */}
            {chat?.imageSrc && (
                <Typography sx={{ px: 2 }} variant="subtitle1">Attachments</Typography>
            )}
            <Box sx={{ display: "flex", gap: 2, pt: 1 }}>
            {chat?.imageSrc && (typeof chat.imageSrc === "string")
                ? ( // if it is not null
                <LazyLoadImage 
                    // key={index} 
                    effect="opacity" 
                    src={chat.imageSrc} 
                    alt="Captured image" 
                    width={'100px'} 
                    style={{ maxWidth: '100%', borderRadius: '12px', padding: '0 8px' }} 
                />
                ) : Array.isArray(chat.imageSrc)
                    ? (chat.imageSrc as string[]).map((src: string) => (
                        <Badge 
                            key={src} 
                            color="error" 
                            badgeContent={
                                <IconButton 
                                    size="small" 
                                    // onClick={() => (chat.imageSrc as any).splice(index, 1)}
                                >
                                    <CloseIcon fontSize="small" />
                                </IconButton>}>
                            <LazyLoadImage 
                                // key={index} 
                                effect="opacity" 
                                src={src} 
                                alt="Captured image" 
                                width={'100px'} 
                                style={{ maxWidth: '100%', borderRadius: '12px', padding: '0 8px' }} 
                            />
                        </Badge>
                    )) : <></>
            }
            </Box>
            <Alert severity="info">
                <Box sx={{ height: "auto" }}>
                    <InputLabel id="multiline-input-label" htmlFor="multiline-input">
                        {['create', 'imagine'].includes(chat.mode) 
                            && `${Math.floor((stabilityBalance as any)?.data?.credits * 5).toFixed(0)} images remaining: `} Currently using {chat?.mode} mode. Type <b>{chat?.mode === 'chat' ? '/create' : '/chat'}</b> and press enter to switch to {chat?.mode === 'chat' ? 'create' : 'chat'} mode.
                    </InputLabel>
                </Box>
            </Alert>
            <TextField
                id="multiline-input"
                ref={ref.current}
                variant="outlined"
                fullWidth
                autoFocus
                placeholder={`${chat?.mode} mode: Type your message...`}
                value={chat.inputMessage}
                onChange={(e) => chat.handleInput(e.target.value)}
                // onKeyPress={handleKeyPress}
                sx={{ overflow: 'auto', borderRadius: 0 }} 
                multiline
                maxRows={4}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Tooltip title={!chat.activeChat?.session_id ? "Select a session to use camera" : "Camera"}>
                                <IconButton
                                    sx={theme => ({ color: theme.palette.primary.main })}
                                    aria-label="filter"
                                    size="small"
                                    color="inherit"
                                    // onClick={openCameraApp}
                                    disabled={!chat.activeChat?.session_id}
                                >
                                    <CameraIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={!chat.activeChat?.session_id ? "Select a session to upload" : "Upload"}>
                                <Badge color="primary" invisible={!chat.activeChat?.session_id}>
                                    <IconButton
                                        sx={theme => ({ color: theme.palette.primary.main })}
                                        aria-label="filter"
                                        size="small"
                                        color="inherit"
                                        onClick={
                                            props?.handleAttachmentClick
                                                ? props.handleAttachmentClick
                                                : () => {}
                                        }
                                        // disabled={!chat.activeChat?.session_id}
                                    >
                                        <AttachFile />
                                    </IconButton>
                                </Badge>
                            </Tooltip>
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                sx={theme => ({ color: theme.palette.primary.main })}
                                aria-label="send"
                                color="inherit"
                                onClick={handleSubmit}
                                size="small"
                            >
                                <SendIcon />
                            </IconButton>
                            <IconButton
                                sx={theme => ({ color: theme.palette.primary.main })}
                                aria-label="send"
                                color="inherit"
                                // onClick={() => chat.handleView("voice")}
                                size="small"
                            >
                                <RecordVoiceOverIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    sx: theme => ({ 
                        backgroundColor: theme.palette.background.default,
                        ".MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main,
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main
                        },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: theme.palette.primary.main
                        }
                    }),
                }}
            />
            <Toolbar sx={theme => ({ display: "flex", flexDirection: "space-between", justifyContent: "space-between", backgroundColor: theme.palette.background.default })}>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    chat: <b>{chat?.activeChat?.session_name}</b>
                </Typography>
                <Typography variant="body1" sx={{ flexGrow: 1 }}>
                    model: <b>{chat.defaultModel}</b>
                </Typography>
                <IconButton 
                    onClick={props?.handleDrawerClick 
                        ? props?.handleDrawerClick 
                        : () => {}
                    } 
                    size="small" 
                    color="inherit" 
                    sx={{ color: "text.primary" }}
                > 
                    <ArrowDropDownIcon />
                </IconButton>
                {/* <IconButton onClick={() => chat.setToolsWindowDrawer(true)} sx={{ color: "text.primary" }}> 
                    <ArrowRightIcon />
                </IconButton> */}
            </Toolbar>
        </Box>
    )
}

export default Chat