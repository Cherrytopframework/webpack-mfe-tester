import { ReactNode, Suspense } from 'react';
import { useQuery, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';

import { queries, paths } from '../../../../utilities/api';


const queryClient = new QueryClient();

const QueryWrapper2 = ({
    path,
    children,
    options,
    loadingContent,
    errorContent
} : {
    path: (paths: any) => string,
    children: (data: any) => ReactNode
    options?: {
        method: string
        payload?: any
        graphql: false | boolean
    }
    loadingContent?: ReactNode,
    errorContent?: (error: any) => ReactNode
}) => {
    const queryPath = path(paths);
    const wrapperQuery = useQuery(
        // queries.query(queryPath)
        !options?.graphql
            ? queries.query(queryPath, options?.payload, options?.method)
            : queries.graphQuery(queryPath, options?.payload, options?.method)
    );
    
    return ({
        pending: (<></>),
        loading: (loadingContent ? loadingContent : <CircularProgress />),
        error: (
            errorContent 
                ? errorContent(wrapperQuery.error) 
                : <>Something went wrong. {JSON.stringify(wrapperQuery.error, null, 2)}</>
        ),
        success: (
            <Suspense fallback={<CircularProgress />}>
                {children({ data: wrapperQuery.data })}
            </Suspense>
        )
    }[wrapperQuery.status])
};

const QueryWrapper = ({ 
    children, 
    ...args 
}: { 
    children: (data: any) => ReactNode, 
    path: (paths: any) => string,
    options?: {
        method: string
        payload?: any
        graphql: boolean
    }
}) => {
    return (
        <QueryClientProvider client={queryClient}>
            {/* @ts-ignore */}
            <QueryWrapper2 {...args}>
                {children}
            </QueryWrapper2>
        </QueryClientProvider>
    )
}

export default QueryWrapper;