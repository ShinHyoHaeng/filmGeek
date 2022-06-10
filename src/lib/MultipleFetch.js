import React from 'react'
import useMultipleFetch from './useMultipleFetch';
import { Skeleton } from '@mui/material';

function MultipleFetch({
    uri1,
    uri2,
    renderSuccess,
    loadingFallback = <Skeleton variant="rectangular" />,
    renderError = error => (<pre>{JSON.stringify(error, null, 2)}</pre>)
}) {
    const { loading, data1, data2, error } = useMultipleFetch(uri1, uri2);
    if (loading) return loadingFallback;
    if (error) return renderError;
    if(data1 && data2) {
        return renderSuccess({data1, data2}) 
    };
}

export default MultipleFetch