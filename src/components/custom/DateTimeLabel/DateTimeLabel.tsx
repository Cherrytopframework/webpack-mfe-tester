import { useEffect, useState } from "react";
import moment from "moment";
import { IconButton, Typography } from "@mui/material";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';


const DateTimeLabel = () => {
    const timeString = moment().format('MMMM Do YYYY, h:mm:ss a');
    const [timeLabel, setTimeLabel] = useState(timeString);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLabel(moment().format('MMMM Do YYYY, h:mm:ss a'));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <Typography variant="body1" component="p" p={1}>
            {timeLabel}
            <IconButton color="inherit">
                <CalendarMonthIcon />
            </IconButton>
        </Typography>
    );
};

export default DateTimeLabel;