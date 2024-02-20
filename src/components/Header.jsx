import React, { useState } from "react";

export const Headers = ({
    allProducts,
    setAllProducts,
    total,
    countProducts,
    setCountProducts,
    setTotal,
}) => {
    const [active, setActive] = useState(false);
    const [modalContent, setModalContent] = useState({
        isOpen: false,
        title: "",
        description: ""
    });

    const onDeleteProduct = (product) => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este artículo del carrito?");
        if (isConfirmed) {
            const result = allProducts.filter(item => item.id !== product.id);
            setTotal(total - product.price * product.quantity);
            setCountProducts(countProducts - product.quantity);
            setAllProducts(result);
        }
    };

    const onClearCart = () => {
        const isConfirmed = window.confirm("¿Estás seguro de que deseas vaciar el carrito?");
        if (isConfirmed) {
            setAllProducts([]);
            setTotal(0);
            setCountProducts(0);
        }
    };

    const handleImageClick = (title, description) => {
        setModalContent({
            isOpen: true,
            title: title,
            description: description
        });
    };

    const closeModal = () => {
        setModalContent({
            isOpen: false,
            title: "",
            description: ""
        });
    };

    return (
        <header>
            <h1>Tienda de Libros</h1>
            <div className="container-icon">
                <div
                    className="container-cart-icon"
                    onDoubleClick={() => setActive(!active)}
                >
                    <img
                        src="https://e7.pngegg.com/pngimages/833/426/png-clipart-black-shopping-cart-icon-for-free-black-shopping-cart.png"
                        alt="carrito"
                        className="icon-cart"
                    />
                    <div className="count-products">
                        <span className="cantidad-producto-carrito">{countProducts}</span>
                    </div>
                </div>

                <div
                    className={`container-cart-products ${active ? "" : "hidden-cart"}`}
                >
                    {allProducts.length ? (
                        <>
                            <div className="row-product">
                                {allProducts.map((product) => (
                                    <div className="cart-product" key={product.id}>
                                        <div className="info-cart-product">
                                            <img 
                                                src={product.urlImage} 
                                                alt={product.title} 
                                                onClick={() => handleImageClick(product.title, product.description)}
                                            />
                                            <span className="cantidad-producto-carrito">
                                                {product.quantity}
                                            </span>
                                            <p className="titulo-producto-carrito">
                                                {product.title}
                                            </p>
                                            <span className="precio-producto-carrito">
                                                ${product.price}
                                            </span>
                                        </div>
                                        <img
                                            src="https://static.vecteezy.com/system/resources/previews/018/887/462/original/signs-close-icon-png.png"
                                            alt="cerrar"
                                            className="icon-close"
                                            onClick={() => onDeleteProduct(product)}
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="cart-total">
                                <h3>Total:</h3>
                                <span className="total-pagar">${total}</span>
                            </div>
                            <button className="btn-clear-all" onClick={onClearCart}>
                                Vaciar Carrito
                            </button>
                        </>
                    ) : (
                        <p className="cart-empty">El carrito está vacío</p>
                    )}
                </div>
            </div>
            {modalContent.isOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>{modalContent.title}</h2>
                        <p>{modalContent.description}</p>
                    </div>
                </div>
            )}
        </header>
    );
};