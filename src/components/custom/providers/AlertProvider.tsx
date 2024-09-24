import { Alert, Collapse, Snackbar } from "@mui/material";
import { useUtilityStore } from "../../../utilities/store";


const AlertProvider = ({ children }: { children?: any }) => {
    const { alert, setAlert } = useUtilityStore();
    return (
        <>
            {children && children}
            <Collapse in={alert.open}>
                <Snackbar 
                    open={alert.open} 
                    autoHideDuration={4000} 
                    onClose={() => setAlert({ ...alert, open: false })}
                >
                    <Alert
                        severity={alert.severity}
                        onClose={() => setAlert({ ...alert, open: false })}
                    >
                        {alert.message}
                    </Alert>
                </Snackbar>
            </Collapse>
        </>
    )
};

export default AlertProvider;