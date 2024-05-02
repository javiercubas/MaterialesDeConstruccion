import React, { useEffect, useState } from "react";
import { AiOutlineMenu } from 'react-icons/ai';
import { FaTimes } from 'react-icons/fa';
import { BsTrash } from "react-icons/bs";
import "./Header.css";
import { getProductores } from "../modelos/ProductorModel";
import { getMarcas } from "../modelos/MarcaModel";
import { getPartners } from "../modelos/PartnerModel";
import { getTiposProductos } from "../modelos/TipoProductoModel";
import PromoPopUp from "./PromoPopUp";
import Cookies from "universal-cookie";
import { useCart } from "../CartContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubProductosOpen, setIsSubProductosOpen] = useState(false);
  const [isSubProductoresOpen, setIsSubProductoresOpen] = useState(false);
  const [isSubMarcasOpen, setIsSubMarcasOpen] = useState(false);
  const [isSubPartnersOpen, setIsSubPartnersOpen] = useState(false);
  const [marcas, setMarcas] = useState([]);
  const [productores, setProductores] = useState([]);
  const [partners, setPartners] = useState([]);
  const [tiposProductos, setTiposProductos] = useState([]);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }

    getMarcas().then((marcas) => {
      setMarcas(marcas);
    });

    getProductores().then((productores) => {
      setProductores(productores);
    });

    getPartners().then((partners) => {
      setPartners(partners);
    });

    getTiposProductos().then((tiposProductos) => {
      setTiposProductos(tiposProductos);
    });
  }, [isMenuOpen]);

  const handleSubmenuClick = (submenuState, setSubmenuState) => {
    if (window.innerWidth <= 1100) {
      setSubmenuState(!submenuState);
    }
  };

  const handleMenuClick = () => {
    if (window.innerWidth <= 1100) {
      setIsMenuOpen(!isMenuOpen);
    }
  };

  // Determina el elemento de título (a o div) según el ancho de la pantalla
  const TitleElement = window.innerWidth <= 1100 ? "div" : "a";

  const [showPopup, setShowPopup] = useState(false);

  const { cart, removeProduct } = useCart();
  const [showCart, setShowCart] = useState(false);

  // Variable booleana para determinar si se muestra el carrito en función del ancho de la pantalla
  const showCartOnMobile = window.innerWidth <= 1100;

  const handleShowCart = () => {
    setShowCart(!showCart);

    // Bloquear el scroll del body cuando se muestra el carrito
    if (!showCart) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleRemoveProduct = (product) => {
    removeProduct(product);
  };

  useEffect(() => {
    const handleResize = () => {
      clearTimeout(window.resizeTimer);
      window.resizeTimer = setTimeout(() => {
        var outerHeight = document.documentElement.clientHeight;
        var windowHeight = window.innerHeight;

        if (windowHeight > outerHeight) {
          // La barra de dirección está visible
          // Aquí puedes ajustar la posición de tus elementos según sea necesario
          document.querySelector('.shopping-cart-container').style.top = '87vh';
        } else {
          // La barra de dirección no está visible
          // Puedes ajustar la posición de tus elementos de otra manera o dejarlos como están
          document.querySelector('.shopping-cart-container').style.top = '75vh';
        }
      }, 100); // Ajusta el tiempo de espera según sea necesario
    };

    window.addEventListener('resize', handleResize);

    // Limpia el evento al desmontar el componente
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <nav className={`nav ${isMenuOpen ? "menu-open" : ""}`}>
        <div className="logo">
          <a href="/"></a>
        </div>
        <div className="navAll">
          <div className="movil-title">
            <h2>Menu principal</h2>
            <FaTimes size={32} color="var(--logo)" onClick={handleMenuClick} />
          </div>
          <div className="navLinks">
            <ul>
              <li><a href="/">INICIO</a></li>
              <li
                onClick={() => handleSubmenuClick(isSubProductosOpen, setIsSubProductosOpen)}
                onMouseEnter={() => setIsSubProductosOpen(true)}
                onMouseLeave={() => setIsSubProductosOpen(false)}
              >
                <a href="/productos">PRODUCTOS</a>

              </li>
              <li
                onClick={() => handleSubmenuClick(isSubProductoresOpen, setIsSubProductoresOpen)}
                onMouseEnter={() => setIsSubProductoresOpen(true)}
                onMouseLeave={() => setIsSubProductoresOpen(false)}
              >
                <TitleElement href="/productores">PRODUCTORES</TitleElement>
                {isSubProductoresOpen && (
                  <ul className="submenu" onMouseEnter={() => setIsSubProductoresOpen(true)} onMouseLeave={() => setIsSubProductoresOpen(false)}>
                    {productores.map(productor => (
                      <li key={productor.id}><a href={`/productor/${productor.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{productor.nombre}</a></li>
                    ))}
                  </ul>
                )}
              </li>
              <li
                onClick={() => handleSubmenuClick(isSubMarcasOpen, setIsSubMarcasOpen)}
                onMouseEnter={() => setIsSubMarcasOpen(true)}
                onMouseLeave={() => setIsSubMarcasOpen(false)}
              >
                <TitleElement href="/marcas">MARCAS</TitleElement>
                {isSubMarcasOpen && (
                  <ul className="submenu" onMouseEnter={() => setIsSubMarcasOpen(true)} onMouseLeave={() => setIsSubMarcasOpen(false)}>
                    {marcas.map(marca => (
                      <li key={marca.id}><a href={`/marca/${marca.nombre.toLowerCase().trim().replaceAll(' ', '-')}`}>{marca.nombre}</a></li>
                    ))}
                  </ul>
                )}
              </li>
              <li
                onClick={() => handleSubmenuClick(isSubPartnersOpen, setIsSubPartnersOpen)}
                onMouseEnter={() => setIsSubPartnersOpen(true)}
                onMouseLeave={() => setIsSubPartnersOpen(false)}
              >
                <TitleElement href="/partners">PARTNERS</TitleElement>
                {isSubPartnersOpen && (
                  <ul className="submenu" onMouseEnter={() => setIsSubPartnersOpen(true)} onMouseLeave={() => setIsSubPartnersOpen(false)}>
                    {partners.map(partner => (
                      <li key={partner.id}>
                        <a href={partner.url}>{partner.nombre}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li><a href="/sobre-nosotros">SOBRE NOSOTROS</a></li>
            </ul>
          </div>
          {!showCart &&
            <div className="shopping-cart-container" onClick={handleShowCart}>
              {showCartOnMobile &&
                <img src="/assets/shopping-cart.png" alt="shopping-cart" className="shopping-cart" width={40}></img>
              }
              <div className="shopping-cart-counter">
                {cart.length}
              </div>
            </div>
          }
        </div>
        <div className="hamburger" onClick={handleMenuClick}>
          <AiOutlineMenu size={32} color="white" />
        </div>
        {showCart &&
          <div className="cart">
            <div className="cart-bg" onClick={handleShowCart}></div>
            <div className="cart-container">
              <div className="cart">
                <div className="cart-header">
                  <h3>Carrito</h3>
                  <FaTimes size={24} color="var(--logo)" onClick={handleShowCart} />
                </div>
                <div className="cart-items">
                  {cart.map((producto, index) => (
                    <div key={index} className="cart-item">
                      <img src={producto.imagen} alt={producto.nombre} />
                      <div>
                        <h4>{producto.nombre}</h4>
                        <p>{producto.precio}€</p>
                      </div>
                      <BsTrash size={24} color="var(--logo)" onClick={() => handleRemoveProduct(producto)} />
                    </div>
                  ))}
                </div>
                <div className="cart-footer">
                  <h4>Total: {cart.reduce((acc, producto) => acc + parseFloat(producto.precio), 0)}€</h4>
                  <button>COMPRAR</button>
                </div>
              </div>
            </div>
          </div>
        }
      </nav>



      {showPopup && <PromoPopUp onClose={() => {
        setShowPopup(false);
        document.body.style.overflow = 'unset';
      }} type={1} />}
    </>
  );
};

export default Header;