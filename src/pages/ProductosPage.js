import React from 'react'
import Productos from '../components/Productos';
import { useState, useEffect } from 'react';
import { getProductos } from '../modelos/ProductoModel';
import { getMarcas } from '../modelos/MarcaModel';
import { getProductores } from '../modelos/ProductorModel';
import { getCategorias } from '../modelos/CategoriaModel';
import Sidebar from '../components/Sidebar';
import './ProductosPage.css';

const ProductosPage = () => {
    const [productos, setProductos] = useState([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const [filteredProductos, setFilteredProductos] = useState(productos);
    const [filters, setFilters] = useState({ categoria: null, marca: null, productor: null });
    const [marcas, setMarcas] = useState([]);
    const [productores, setProductores] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const handleFilterChange = (filterType, value) => {
        setFilters({ ...filters, [filterType]: value });
    };

    useEffect(() => {
        getProductos().then((productos) => {
            setProductos(productos);
        });

        getMarcas().then((marcas) => {
            setMarcas(marcas);
        });

        getProductores().then((productores) => {
            setProductores(productores);
        });

        getCategorias().then((categorias) => {
            setCategorias(categorias);
        });

        // Apply filters
        let filtered = productos;
        if (filters.categoria) {
            filtered = filtered.filter((producto) => producto.categoria === filters.categoria);
        }
        if (filters.marca) {
            filtered = filtered.filter((producto) => producto.marca === filters.marca);
        }
        if (filters.productor) {
            filtered = filtered.filter((producto) => producto.productor === filters.productor);
        }
        setFilteredProductos(filtered);
    }, [filters, productos]);

    return (
        <div className="productos-page">
            {/* Botón de apertura del Sidebar */}
            <button className="sidebar-button" onClick={toggleSidebar}>
                {sidebarOpen ? 'CERRAR FILTROS' : 'FILTRAR PRODUCTOS'}
            </button>

            <div className={`sidebar-container ${sidebarOpen ? 'open' : 'closed'}`}>
                <Sidebar
                    categorias={categorias.map((categoria) => categoria.nombre)}
                    marcas={marcas.map((marca) => marca.nombre)}
                    productores={productores.map((productor) => productor.nombre)}
                    onFilterChange={handleFilterChange}
                />
            </div>
            <Productos titulo="Productos" productos={filteredProductos} grid="repeat(3, 1fr)" />
        </div>
    )
}

export default ProductosPage