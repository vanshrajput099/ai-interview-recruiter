"use client";
import React, { useState } from 'react'
import { toast } from 'sonner';

const useFetch = (fun) => {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const fn = async (...args) => {
        try {
            setLoading(true);
            const res = await fun(...args);
            setData(res);
        } catch (error) {
            toast.error(error.message);
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { loading, data, error, fn };
}

export default useFetch