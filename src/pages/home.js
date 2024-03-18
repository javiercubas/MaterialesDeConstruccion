import React, { useState, useEffect } from 'react';
import '../components/Menu.css';
import './Home.css'
import Buscador from '../components/Buscador';
import Productos from '../components/Productos';
import { getOfertas } from '../modelos/ProductoModel';
import PromoPopUp from '../components/PromoPopUp';
import ThermoRossiSVG from '../components/thermorossi'
import { getCategorias } from '../modelos/CategoriaModel';

const Home = () => {
  const [productosOferta, setProductosOferta] = useState([]);

  useEffect(() => {
    getOfertas().then((productos) => {
      setProductosOferta(productos);
    });
  }, []);

  const [showPopup, setShowPopup] = useState(false);

  const handleShowPopup = () => {
    // Navegamos a https://www.ifema.es/construtec
    window.location.href = 'https://www.ifema.es/construtec';
  }

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    getCategorias().then((categorias) => {
      setCategorias(categorias);
    });
  }
    , []);

  return (
    <>
      <Buscador />
      <Productos titulo="Ofertas" productos={productosOferta} />
      <div className='categorias-section'>
        <h2>Categorías</h2>
        <div className='categorias'>
          {
            categorias.map((categoria, index) => (
              <a key={index} href={`/productos/${categoria.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{categoria.nombre}</a>
            ))
          }
        </div>
      </div>
      <div className="sponsors-content" onClick={handleShowPopup}>
        <h3 className="sponsors-titulo">promo</h3>
        <ThermoRossiSVG />
      </div>
      {showPopup && <PromoPopUp onClose={() => {
        setShowPopup(false);
        document.body.style.overflow = 'unset';
      }} type={1} />}
    </>
  )
}

export default Home