import React, { createContext, useState, useContext } from 'react';

// Creamos el contexto del carrito
const CartContext = createContext();

// Proveedor del contexto
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Función para añadir un producto al carrito
    const addToCart = (product) => {
        setCart([...cart, product]);
    };

    const removeProduct = (product) => {
        const newCart = cart.filter((cartProduct) => cartProduct.id !== product.id);
        setCart(newCart);
    };

    // Función para obtener la cantidad total de productos en el carrito
    const getTotalItems = () => {
        return cart.reduce((total, product) => total + product.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, getTotalItems, removeProduct }}>
            {children}
        </CartContext.Provider>
    );
};

// Hook para consumir el contexto del carrito
export const useCart = () => {
    return useContext(CartContext);
};
