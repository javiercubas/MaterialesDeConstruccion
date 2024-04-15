import React from 'react'
import Productos from '../components/Productos';
import { useState, useEffect } from 'react';
import { getCategoriasProducto, getProductos } from '../modelos/ProductoModel';
import { getMarcas } from '../modelos/MarcaModel';
import { getProductores } from '../modelos/ProductorModel';
import { getCategorias } from '../modelos/CategoriaModel';
import Sidebar from '../components/Sidebar';
import './ProductosPage.css';
import axios from 'axios';

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

    // Función auxiliar para obtener las categorías de cada producto
    const obtenerCategoriasProductos = async (productos) => {
        const productosConCategorias = await Promise.all(
            productos.map(async (producto) => {
                const categorias = await getCategoriasProducto(producto.id);
                producto.categorias = categorias.map((categoria) => categoria.nombre);
                const categoriaSuperior = categorias.map((categoria) => categoria['categoria-superior']);
                if (categoriaSuperior.length > 0 && categoriaSuperior[0] !== null) {
                    axios.get(`https://api.primepellet.es/categorias/${categoriaSuperior}?bbdd=2`).then((res) => {
                        producto.categorias.push(res.data.nombre);
                    }
                    );
                }
                return producto;
            })
        );
        setProductos(productosConCategorias);
    };

    useEffect(() => {
        // Obtener los productos y sus categorías
        getProductos().then((productos) => {
            obtenerCategoriasProductos(productos);
        });
    }
        , []);

    useEffect(() => {

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
            filtered = filtered.filter((producto) => producto.categorias.includes(filters.categoria));
        }
        if (filters.marca) {
            filtered = filtered.filter((producto) => producto.marca === filters.marca);
        }
        if (filters.productor) {
            filtered = filtered.filter((producto) => producto.productor === filters.productor);
        }
        setFilteredProductos(filtered);

    }, [productos, filters]);

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
            <div style={{ width: '77vw' }}>
                <Productos titulo="Productos" productos={filteredProductos} grid="repeat(3, 1fr)" />
            </div>
        </div>
    )
}

export default ProductosPage;