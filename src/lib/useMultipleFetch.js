import { useState, useEffect } from 'react'

const useMultipleFetch = (uri1, uri2) => {
    const [data1, setData1] = useState();
    const [data2, setData2] = useState();
    const [error, setError ] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(!uri1) return;
        fetch(uri1)
            .then(data => data.json())
            .then(setData1)
            .then(() => setLoading(false))
            .catch(setError);
    }, [uri1]);
    useEffect(() => {
        if(!uri2) return;
        fetch(uri2)
            .then(data => data.json())
            .then(setData2)
            .then(() => setLoading(false))
            .catch(setError);
    }, [uri2]);
  return {
      loading,
      data1,
      data2,
      error
  }
}

export default useMultipleFetch