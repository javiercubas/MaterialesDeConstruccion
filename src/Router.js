import React, { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';
import { getProductos } from './modelos/ProductoModel';
import { getProductores } from './modelos/ProductorModel';
import { getMarcas } from './modelos/MarcaModel';
import { getTiposProductos } from './modelos/TipoProductoModel'

const Home = lazy(() => import('./pages/Home'));
const ProductosPage = lazy(() => import('./pages/ProductosPage'));
const Producto = lazy(() => import('./pages/Producto'));
const CategoriasSection = lazy(() => import('./pages/CategoriasSection'));
const CategoriaPage = lazy(() => import('./pages/CategoriaPage'));
const SobreNosotros = lazy(() => import('./pages/SobreNosotros'));
const CompraExitosa = lazy(() => import('./pages/CompraExitosa'));
const SitemapViewer = lazy(() => import('./pages/SitemapViewer'));
const Terminos = lazy(() => import('./pages/Terminos'));


const Router = () => {

    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [productores, setProductores] = useState([]);
    const [tiposProductos, setTiposProductos] = useState([]);

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

        getTiposProductos().then((tiposProductos) => {
            setTiposProductos(tiposProductos);
        });

    }, []);

    return (
        <Suspense fallback={renderLoader()}>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<ProductosPage />} />
                <Route path="/productores" element={<CategoriasSection isMarcas={false} />} />
                <Route path="/marcas" element={<CategoriasSection isMarcas={true} />} />
                <Route path="/partners" element={<CategoriasSection isMarcas={false} isPartners={true} />} />
                <Route path="/sobre-nosotros" element={<SobreNosotros />} />
                <Route path="/compra-exitosa" element={<CompraExitosa />} />
                <Route path="/sitemap.xml" element={<SitemapViewer />} />
                <Route path="/terminos-y-condiciones" element={<Terminos />} />
                {productos.map(producto => (
                    <Route
                        key={producto.id} // Asegúrate de tener una propiedad 'id' única para cada producto en Firestore
                        path={`/${producto.nombre.toLowerCase().trim().replaceAll(" ", "-").replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u')}`} // Cambiar la ruta como desees
                        element={<Producto nombre={producto.nombre} imagen={producto.imagen} precio={producto.precio} descripcion={producto.descripcion} pack={producto.pack} estrellas={producto.estrellas} peso={producto.peso} seEnvia={producto.envio} tipo={producto.tipo} id={producto.id} />}
                    />
                ))}
                {marcas.map(marca => (
                    <Route
                        key={marca.id}
                        path={`/marca/${marca.nombre.toLowerCase().trim().replaceAll(' ', '-').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u')}`} // Cambiar la ruta como desees
                        element={<CategoriaPage key={marca.uid}
                            titulo={marca.nombre}
                            id={marca.id}
                            descripcion={marca.descripcion}
                            logo={marca.imagen}
                            isMarca={true}
                        />}
                    />
                ))}
                {productores.map(productor => (
                    <Route
                        key={productor.id}
                        path={`/productor/${productor.nombre.toLowerCase().trim().replaceAll(' ', '-').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u')}`} // Cambiar la ruta como desees
                        element={<CategoriaPage key={productor.uid}
                            titulo={productor.nombre}
                            id={productor.id}
                            descripcion={productor.descripcion}
                            logo={productor.imagen}
                            isProductor={true} />}
                    />
                ))}

                {tiposProductos.map(tipoProducto => (
                    <Route
                        key={tipoProducto.id}
                        path={`/productos/${tipoProducto.nombre.toLowerCase().trim().replaceAll(' ', '-').replaceAll('á', 'a').replaceAll('é', 'e').replaceAll('í', 'i').replaceAll('ó', 'o').replaceAll('ú', 'u')}`} // Cambiar la ruta como desees
                        element={<CategoriaPage key={tipoProducto.uid}
                            titulo={tipoProducto.nombre}
                            id={tipoProducto.id}
                            type={tipoProducto.id} />}
                    />
                ))}

            </Routes>
        </Suspense>
    )
}

export default Router