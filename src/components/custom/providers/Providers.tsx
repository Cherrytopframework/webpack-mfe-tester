import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import AlertProvider from './AlertProvider'
import { ConfirmProvider } from './Confirm'
import { PageTransitionWrapper, ThemeProvider } from '../../../utilities/theme'
import QueryWrapper from '../wrappers/QueryWrapper/QueryWrapper'
import Drawer from '../../Mui/Drawer/Drawer';


const Providers = (
    { children, path }: 
    { 
        children: (callback?: { data: any }) => React.ReactNode
        path?: (paths: any) => string | boolean,
    }
) => {
    const handlePath = (paths: any) => path ? path(paths) : "";
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <ThemeProvider>
                <PageTransitionWrapper>
                    {((typeof(path) === "boolean") && !path)
                        ? children()
                        : (
                            <QueryWrapper path={handlePath as (paths: any) => string}>
                                {({ data }) => children(data)}
                            </QueryWrapper>
                        )
                    }
                    <AlertProvider />
                    <ConfirmProvider />
                    <Drawer />
                </PageTransitionWrapper>
            </ThemeProvider>
        </LocalizationProvider>
    )
}

export default Providers
export type Providers = ReturnType<typeof Providers>