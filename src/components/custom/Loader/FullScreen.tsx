import { Box, CircularProgress, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const Styled = {
    Container: styled(Box)(() => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#353535', // Optional background color
        position: 'relative'
    }))
};
const LoadingView = () => (
    <Styled.Container>
        <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
            <CircularProgress size={60} color="inherit" />
            <Typography variant="h6" sx={{ marginTop: 2 }}>
                Loading...
            </Typography>
        </motion.div>
    </Styled.Container>
);

export default LoadingView;
