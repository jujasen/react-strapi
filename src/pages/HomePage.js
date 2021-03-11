import { useEffect } from 'react';
import { BASE_URL, PRODUCTS_PATH } from '../utils/constants';
import axios from 'axios';

const HomePage = () => {
    useEffect(() => {
        axios
            .get(`${BASE_URL}${PRODUCTS_PATH}`)
            .then(response => console.log(response));
    }, []);
    return (
        <>
            <h1 className="home">Homepage</h1>
            <div className="home__desc"> VIP instruments made with code</div>
        </>
    );
};

export default HomePage;