// import React from 'react'
// import Webcam from "react-webcam"
import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"
// import { motion } from "framer-motion"


const WebcamContainer = styled(Box)(() => ({
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    width: '100vw',
    background: '#111',
}));

// const defaultVideoConstraints = {
//     width: 1280,
//     height: 720,
//     facingMode: "environment",
// };

const Camera = () => {

    // const webcamRef = React.useRef(null);
    // const canvasRef = React.useRef(null);
    // const videoRef = React.useRef(null);

    // const webcamProps = {
    //     ref: webcamRef,
    //     audio: false,
    //     height: window.innerHeight,
    //     width: window.innerWidth,
    //     screenshotFormat: "image/jpeg",
    //     videoConstraints: defaultVideoConstraints
    // };

    return (
        <WebcamContainer>
            {/* <Webcam {...webcamProps}>
                {() => (
                    <motion.div>
                        <Box onDoubleClick={() => {}} sx={{ height: '100vh', width: '100vw', position: 'absolute', bottom: 0, right: 0, background: 'rgba(0,0,0,0.2)' }}>
                            <canvas ref={canvasRef} style={{ height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0, zIndex: 1 }} />
                            <video ref={videoRef} style={{ height: '100%', width: '100%', position: 'absolute', bottom: 0, right: 0, zIndex: 10 }} />
                        </Box>
                    </motion.div>
                )}
            </Webcam> */}
        </WebcamContainer>
    )
}

export default Camera;