import React from 'react'
import useFetch from './useFetch';
import { Skeleton } from '@mui/material';

function Fetch({
    uri,
    renderSuccess,
    loadingFallback = <Skeleton variant="rectangular" />,
    renderError = error => (<pre>{JSON.stringify(error, null, 2)}</pre>)
}) {
    const { loading, data, error } = useFetch(uri);
    if (loading) return loadingFallback;
    if (error) return renderError;
    if(data) {
        return renderSuccess({data}) 
    };
}

export default Fetch