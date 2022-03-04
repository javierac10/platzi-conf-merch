import { useState, useEffect } from 'react';
import axios from 'axios';


const useGoogleAddress = address => {
    const [map, setMap] = useState({});
    const API = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyCbKYKGyWml0U_LFLq9L66s_-P-7L-dQnU`;
    console.log('url', API);
    useEffect(async () => {
        console.log('async');
        const response = await axios(API);
        console.log('await', response.data.results[0].geometry.location);
        setMap(response.data.results[0].geometry.location);
    }, []);

    return map;
};

export default useGoogleAddress;