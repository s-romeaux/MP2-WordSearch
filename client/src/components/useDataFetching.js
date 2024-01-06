import { useState, useEffect } from 'react';
import axios from 'axios';

const useDataFetching = (url, initialData) => {
const [data, setData] = useState(initialData);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        try {
        const response = await axios.get(url);
        setData(response.data);
    } catch (error) {
        setError(error);
    } finally {
        setLoading(false);
    }
    };

    fetchData();
}, [url]);

return { data, loading, error };
};

export default useDataFetching;
