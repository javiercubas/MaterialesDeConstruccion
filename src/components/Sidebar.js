import React, { useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

const Sidebar = (props) => {
    const { categorias, marcas, productores, onFilterChange } = props;

    const [openSections, setOpenSections] = useState({
        categorias: true,
        marcas: true,
        productores: true,
    });

    return (
        <div className="sidebar">
            <h4 onClick={() => setOpenSections({ ...openSections, categorias: !openSections.categorias })}>
                Categorías
                {openSections.categorias ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </h4>
            {openSections.categorias && (
                <ul>
                    {categorias.map((categoria, index) => (
                        <li key={index} onClick={() => { onFilterChange('categoria', categoria); window.scrollTo(0, 0); }}>
                            {categoria}
                        </li>
                    ))}
                </ul>
            )}
            <h4 onClick={() => setOpenSections({ ...openSections, marcas: !openSections.marcas })}>
                Marcas
                {openSections.marcas ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </h4>
            {openSections.marcas && (
                <ul>
                    {marcas.map((marca, index) => (
                        <li key={index} onClick={() => onFilterChange('marca', marca)}>
                            {marca}
                        </li>
                    ))}
                </ul>
            )}
            <h4 onClick={() => setOpenSections({ ...openSections, productores: !openSections.productores })}>
                Productores
                {openSections.productores ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
            </h4>
            {openSections.productores && (
                <ul>
                    {productores.map((productor, index) => (
                        <li key={index} onClick={() => onFilterChange('productor', productor)}>
                            {productor}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Sidebar;