/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";

export default function useStorage(key, initialValue) {
    const savedData = JSON.parse(sessionStorage.getItem(key));

    const [data, setData] = useState(savedData || initialValue);
    // const [data, setData] = useState(savedData ? savedData : initialValue);

    useEffect(()=> {
        sessionStorage.setItem(key, JSON.stringify(data))
    }, [data])

    return [data, setData]
}