import { useRef, useState } from "react"
import { Box, Popover, Typography } from "@mui/material";
import { motion } from "framer-motion";
// import MarkdownWrapper from "../wrappers/MarkdownWrapper/MarkdownWrapper";

const ReusablePopover = (props: any) => {
    const { children, ...params } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    
    const anchorRef = useRef<any | null>(null);

    return (
        <Box ref={anchorRef}>
            <Typography 
                pt={2} 
                variant="body2" 
                color="text.secondary" 
                sx={{ cursor: 'pointer' }} 
                component={motion.p} 
                onClick={() => setIsOpen(!isOpen)} 
                whileHover={{ scale: 1.1 }}
            >
                {console.log("params: ", params) as any}
                {children}
            </Typography>
            <Popover
                open={isOpen}
                anchorEl={anchorRef.current}
                onClose={() => setIsOpen(false)}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                sx={{ p: 2 }}
            >
                {/* <MessagesWrapper messages={params.value} /> */}
                {/* <MarkdownWrapper>{JSON.stringify(params.value)}</MarkdownWrapper> */}
                {/* <Typography sx={{ p: 2 }}>{JSON.stringify(params.value)}</Typography> */}
            </Popover>
        </Box>
    )
}

export default ReusablePopover

// const MessagesWrapper = (props: any) => {
//     const { messages } = props;

//     return (
//         <>
//         {messages
//             .map((message: any, index: number) => (
//                 <motion.div 
//                     key={index} 
//                     animate={{ opacity: 1 }}
//                     initial={{ opacity: 0 }}
//                     transition={{ duration: 0.35 }}
//                     exit={{ opacity: 0 }}
//                     style={{ 
//                         marginBottom: '1rem', 
//                         textAlign: message.sender === 'bot' ? 'left' : 'right', 
//                         background: 'rgba(255, 255, 255, 0.4)', 
//                         borderRadius: '8px', 
//                         backdropFilter: 'blur(16px)', 
//                         padding: '8px'
//                     }}
//                 >
//                     {console.log("message: ", message) as any}
//                     <ListItemText
//                         primary={message.sender === 'bot' ? 'AI' : 'You'} 
//                         secondary={message?.model}
//                     />
//                     {
//                         message?.imageSrc ? (
//                             <>
//                                 {message?.imageSrc && (typeof message.imageSrc === "string")
//                                     ? ( // if it is not null
//                                         <img 
//                                             key={index} 
//                                             // effect="opacity" 
//                                             src={message.imageSrc} 
//                                             alt="Captured image" 
//                                             width={'100%'} 
//                                             style={{ maxWidth: '100%', borderRadius: '8px' }} 
//                                         />
//                                     ) : Array.isArray(message.imageSrc)
//                                         ? (message.imageSrc as string[]).map((src: string) => (
//                                             <img 
//                                                 // key={index} 
//                                                 // effect="opacity" 
//                                                 src={src} 
//                                                 alt="Captured image" 
//                                                 width={'400px'} 
//                                                 style={{ maxWidth: '100%', borderRadius: '12px', padding: '0 8px' }} 
//                                             />
//                                         ))
//                                         : <></>
//                                 }
//                                 <MarkdownWrapper isLastElement={(messages.length - 1 === index)}>
//                                     {message?.text || ""}
//                                 </MarkdownWrapper>
//                             </>
//                         ) : (
//                             <>
//                                 <MarkdownWrapper isLastElement={(messages.length - 1 === index)}>
//                                     {message?.text || ""}
//                                 </MarkdownWrapper>
//                             </>
//                         )
//                     }
//                 </motion.div>
//             ))
//             // .concat(isLoading 
//             //     ? (
//             //         <Box ref={loadingRef}>
//             //             <CircularProgress />
//             //             {/* <LoadingSpinner /> */}
//             //         </Box> 
//             //     ) 
//             // : null)
//         }
//         </>
//     )
// }