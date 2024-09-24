import { Box, SwipeableDrawer } from '@mui/material'
import { DrawerType, useUtilityStore } from '../../../utilities/store/utilityStore';

const Drawer = ({ children, ...props }: DrawerType) => {
    const { drawer, setDrawer } = useUtilityStore();
    return (
        // @ts-ignore
        <SwipeableDrawer
            {...props} 
            {...drawer} 
            onClose={() => setDrawer({ open: false })}
        >
            <Box sx={{ minWidth: 200, height: '100%', mt: 0, ...(drawer as any)?.boxStyle }}>
                {/* <h2>Remote Drawer</h2> */}
                {drawer?.content && drawer.content}
                {children}
            </Box>
        </SwipeableDrawer>
    );
};

export default Drawer;

// ?? USAGE
// import { useUtilityStore } from '../../../utilities/store';
// const Drawer = React.lazy(() => import('app/Drawer'));

// const Test = () => {
//     const { drawer, setDrawer } = useUtilityStore();
//     return (
//         <>
//             <button onClick={() => setDrawer({ open: true })}>Open Drawer</button>
//             <Drawer {...drawer}>
//                 <Box sx={{ width: 200, height: '100%', mt: 8 }}>
//                     <h2>Drawer</h2>
//                     {drawer?.content && drawer.content}
//                 </Box>
//             </Drawer>
//         </>
//     )
// }