import { useContext, useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import useAxios from '../utils/useAxios';
import { PRODUCTS_PATH } from '../utils/constants';
import Item from '../components/Item';

function Products() {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const [products, setProducts] = useState(null);
    const [render, setRender] = useState(null);
    const http = useAxios();

    if (!auth) {
        history.push('/login');
    }

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await http.get(PRODUCTS_PATH);
                console.log(response);
                setProducts(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        getProducts();
    }, []);

    const deleteProduct = async (id, productTitle) => {
        try {
            const response = await http.delete(`${PRODUCTS_PATH}/${id}`);
            console.log(response);
            alert(`${productTitle} has been deleted.`);
        } catch (error) {
            console.log(error);
        } finally {
            setRender(render + 1);
        }
    };


    if(!products) {
        return <h3>Loading...</h3>
    }

    return (
        <div className="cards">
            {products.map(function (product) {
                return (
                    <div className="cards__item">
                        <Link key={product.id} to={`/edit/${product.id}`}>
                            <Item key={product.id} title={product.title} description={product.description} image_url={product.image_url} price={product.price}></Item>
                        </Link>
                        <button className="cards__item-btn" onClick={() => deleteProduct(product.id, product.title)}>Delete</button>
                    </div>
                    
                )
            })}
        </div>
    );
}

export default Products;