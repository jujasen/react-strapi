const Item = props => {
    const { title, description, image_url, price } = props;
    return (
        <div style={{ width: '100%', maxWidth: '500px' }}>
            <h2 className="cards__item-title">{title}</h2>
            <img src={image_url} alt={title} style={{ width: '100%' }} />
            <h3 className="cards__item-price">$ {price}</h3>
            <p className="cards__item-desc">{description}</p>
        </div>
    );
};

export default Item;