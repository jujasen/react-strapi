import useAxios from '../utils/useAxios';
import { useState, useContext } from 'react';
import { useHistory} from 'react-router-dom';
import { PRODUCTS_PATH } from '../utils/constants';
import AuthContext from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const AddProduct = () => {
    const [auth] = useContext(AuthContext);
    const history = useHistory();
    const http = useAxios();
    const [submitting, setSubmitting] = useState(false);
    const [postError, setPostError] = useState(null);    
    const [success, setSuccess] = useState(null);
    const [product, setProduct] = useState(null);

    if (!auth) {
        history.push('/login');
    }


    const productSchema = yup.object().shape({
        title: yup.string().required('Please provide a title'),
        price: yup.number().required('Please provide a price'),
        description: yup.string().required('Please provide a description'),
        image_url: yup.string().required('Please provide an image url')
    });

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(productSchema)
    });

    const onSubmit = async data => {
        setSubmitting(true);
        setPostError(null);

        console.log(data);


        try {
            const response = await http.post(`${PRODUCTS_PATH}`, data);
            console.log('response', response.data);
            setSuccess(true);
            setProduct(response.data);
        } catch (error) {
            console.log('error', error);
            setPostError(error.toString());
        } finally {
            setSubmitting(false);
        }
    };



    return (
        <>
            <h1>Add Product</h1>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                {postError && <p>{postError}</p>}
                <fieldset disabled={submitting}>
                    <div>
                        <input
                            name='title'
                            placeholder='Title'
                            ref={register}
                        />
                        {errors.title && <p>{errors.title.message}</p>}
                    </div>

                    <div>
                        <input
                            name='price'
                            placeholder='Price'
                            ref={register}
                            type='number'
                        />
                        {errors.price && <p>{errors.price.message}</p>}
                    </div>
                    <div>
                        <textarea
                            name='description'
                            placeholder='Description'
                            ref={register}
                            type='text'
                        />
                        {errors.description && <p>{errors.description.message}</p>}
                    </div>
                    <div>
                        <input
                            name='image_url'
                            placeholder='Image URL'
                            ref={register}
                            type='text'
                        />
                        {errors.image_url && <p>{errors.image_url.message}</p>}
                    </div>

                    <button type='submit'>{submitting ? 'Adding ...' : 'Add'}</button>
                </fieldset>
            </form>
            {success ? <p>{product?.title} was added</p> : null}
        </>
    );
};

export default AddProduct;