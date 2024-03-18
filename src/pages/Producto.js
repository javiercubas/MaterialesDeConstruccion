import React from 'react'
import './Producto.css'
import { FaPencilAlt, FaPlus } from 'react-icons/fa';
import { useState } from 'react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
import FinalizaTuCompra from '../components/FinalizaTuCompra';
import Productos from '../components/Productos';
import axios from 'axios';

const Producto = (props) => {

    const { nombre, imagen, precio, descripcion, pack, peso, estrellas, seEnvia, tipo } = props;

    const precioPack = precio * pack;

    const [codigoPostal, setCodigoPostal] = useState(); // Estado para manejar el código postal

    // Obtener el código postal de las cookies al cargar el componente
    useEffect(() => {
        const cookies = new Cookies();
        const codigoPostalGuardado = cookies.get('codigoPostal');
        if (codigoPostalGuardado) {
            setCodigoPostal(codigoPostalGuardado);
        }
    }, []);

    function calcularPrecioFinalEnvio(totalPeso, zona) {
        let precioPallet = 0;

        // Zona 1
        switch (zona) {
            case "zona1":
                if (totalPeso <= 150) {
                    precioPallet = 54.32
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 61.88;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 81.62;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 80.78
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 87.64;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 90.72;
                }
                break;
            case "zona2":
                // Zona 2
                if (totalPeso <= 150) {
                    precioPallet = 55.86;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 63.42;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 83.16;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 82.32;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 92.12;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 95.20;
                }
                break;
            case "zona3":
                // Zona 3
                if (totalPeso <= 150) {
                    precioPallet = 60.48;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 68.04;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 86.94;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 85.40;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 96.74;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 99.68;
                }
                break;
            case "zona4":
                // Zona 4
                if (totalPeso <= 150) {
                    precioPallet = 64.96;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 72.52;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 95.20;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 88.34;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 105.84;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 108.78;
                }
                break;
            case "zona5":
                // Zona 5
                if (totalPeso <= 150) {
                    precioPallet = 65.66;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 73.22;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 97.44;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 91.42;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 111.02;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 114.80;
                }
                break;
            case "zona6":
                // Zona 6
                if (totalPeso <= 150) {
                    precioPallet = 67.20;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 77.0;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 105.0;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 98.98;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 122.36;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 129.92;
                }
                break;
            case "zona7":
                // Zona 7
                if (totalPeso <= 150) {
                    precioPallet = 73.22;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 83.16;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 119.42;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 111.02;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 139.02;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 146.58;
                }
                break;
            case "zona8":
                // Zona 8
                if (totalPeso <= 150) {
                    precioPallet = 74.76;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 87.64;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 143.64;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 126.14;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 169.26;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 173.88;
                }
                break;
            case "zona9":
                // Zona 9
                if (totalPeso <= 150) {
                    precioPallet = 105.84;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 129.92;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 204.82;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 185.92;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 235.06;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 277.34;
                }
                break;
            case "zona10":
                // Zona 10
                if (totalPeso <= 150) {
                    precioPallet = 108.78;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 133.70;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 213.08;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 189.70;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 250.88;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 292.46;
                }
                break;
            case "zona11":
                // Zona 11
                if (totalPeso <= 150) {
                    precioPallet = 106.54;
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 131.46;
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 275.10;
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 187.46;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 262.22;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 302.40;
                }
                break;
            case "zona12":
                // Zona 12
                if (totalPeso <= 150) {
                    precioPallet = 156.38
                }
                else if (totalPeso > 150 && totalPeso <= 300) {
                    precioPallet = 191.94
                }
                else if (totalPeso > 300 && totalPeso <= 450) {
                    precioPallet = 253.96
                }
                else if (totalPeso > 450 && totalPeso <= 600) {
                    precioPallet = 250.88;
                }
                else if (totalPeso > 600 && totalPeso <= 750) {
                    precioPallet = 331.80;
                }
                else if (totalPeso > 750 && totalPeso <= 1200) {
                    precioPallet = 371.84;
                }
                break;
        }

        return precioPallet;
    }


    function calcularPrecios(precio, cp, tipoPallet, peso) {

        // Use optional chaining to access toString method safely
        const codigoPostalStr = cp?.toString();

        if (!codigoPostalStr) {
            console.log('El código postal no está definido.');
            return;
        }
        else {

            const zonas = {
                zona1:
                    [
                        "19XXX",
                        "28XXX"
                    ],

                zona2: [
                    "42XXX",
                    "45XXX",
                ],

                zona3: [
                    "02XXX",
                    "05XXX",
                    "09XXX",
                    "26XXX",
                    "40XXX",
                    "47XXX",
                    "50XXX",
                ],

                zona4: [
                    "01XXX",
                    "13XXX",
                    "16XXX",
                    "22XXX",
                    "24XXX",
                    "31XXX",
                    "34XXX",
                    "37XXX",
                    "44XXX",
                    "46XXX",
                    "49XXX",
                ],

                zona5: [
                    "03XXX",
                    "12XXX",
                    "20XXX",
                    "25XXX",
                    "30XXX",
                    "33XXX",
                    "39XXX",
                    "43XXX",
                    "48XXX",
                ],

                zona6: [
                    "06XXX",
                    "08XXX",
                    "10XXX",
                    "14XXX",
                    "18XXX",
                    "23XXX",
                    "41XXX",
                    "24300",
                    "24301",
                    "24302",
                    "24303",
                    "24304",
                    "24305",
                    "24306",
                    "24307",
                    "24308",
                    "24309",
                    "24310",
                    "24311",
                    "24312",
                    "24313",
                    "24314",
                    "24315",
                    "24316",
                    "24317",
                    "24318",
                    "24319",
                    "24367",
                    "24368",
                    "24369",
                    "24370",
                    "24371",
                    "24372",
                    "24373",
                    "24374",
                    "24375",
                    "24376",
                    "24377",
                    "24378",
                    "24379",
                    "24380",
                    "24385",
                    "24386",
                    "24387",
                    "24388",
                    "24389",
                    "24390",
                    "24394",
                    "24395",
                    "24398",
                    "24399",
                    "24400",
                    "24401",
                    "24402",
                    "24403",
                    "24404",
                    "24405",
                    "24406",
                    "24407",
                    "24408",
                    "24409",
                    "24410",
                    "24411",
                    "24412",
                    "24413",
                    "24414",
                    "24415",
                    "24416",
                    "24417",
                    "24418",
                    "24419",
                    "24420",
                    "24421",
                    "24422",
                    "24423",
                    "24424",
                    "24425",
                    "24426",
                    "24427",
                    "24428",
                    "24429",
                    "24430",
                    "24431",
                    "24432",
                    "24433",
                    "24434",
                    "24435",
                    "24436",
                    "24437",
                    "24438",
                    "24439",
                    "24440",
                    "24441",
                    "24442",
                    "24443",
                    "24444",
                    "24445",
                    "24446",
                    "24447",
                    "24448",
                    "24449",
                    "24450",
                    "24451",
                    "24452",
                    "24453",
                    "24454",
                    "24455",
                    "24456",
                    "24457",
                    "24458",
                    "24459",
                    "24460",
                    "24461",
                    "24462",
                    "24463",
                    "24464",
                    "24465",
                    "24466",
                    "24467",
                    "24468",
                    "24469",
                    "24470",
                    "24471",
                    "24472",
                    "24473",
                    "24474",
                    "24475",
                    "24476",
                    "24477",
                    "24478",
                    "24479",
                    "24488",
                    "24490",
                    "24491",
                    "24492",
                    "24493",
                    "24494",
                    "24500",
                    "24501",
                    "24502",
                    "24503",
                    "24504",
                    "24505",
                    "24506",
                    "24507",
                    "24508",
                    "24509",
                    "24510",
                    "24511",
                    "24512",
                    "24513",
                    "24514",
                    "24515",
                    "24516",
                    "24517",
                    "24518",
                    "24519",
                    "24520",
                    "24521",
                    "24522",
                    "24523",
                    "24524",
                    "24525",
                    "24526",
                    "24527",
                    "24528",
                    "24529",
                    "24530",
                    "24531",
                    "24532",
                    "24533",
                    "24534",
                    "24535",
                    "24536",
                    "24537",
                    "24538",
                    "24539",
                    "24540",
                    "24541",
                    "24542",
                    "24543",
                    "24544",
                    "24545",
                    "24546",
                    "24547",
                    "24548",
                    "24549",
                    "24550",
                    "24551",
                    "24552",
                    "24553",
                    "24554",
                    "24555",
                    "24556",
                    "24557",
                    "24558",
                    "24559",
                    "24560",
                    "24561",
                    "24562",
                    "24563",
                    "24564",
                    "24565",
                    "24566",
                    "24567",
                    "24568",
                    "24569",
                    "24700",
                    "24700",
                    "24701",
                    "24702",
                    "24703",
                    "24704",
                    "24705",
                    "24706",
                    "24707",
                    "24708",
                    "24709",
                    "24710",
                    "24714",
                    "24715",
                    "24716",
                    "24717",
                    "24718",
                    "24720",
                    "24721",
                    "24722",
                    "24723",
                    "24724",
                    "24725",
                    "24726",
                    "24727",
                    "24728",
                    "24729",
                    "24730",
                    "24731",
                    "24732",
                    "24733",
                    "24734",
                    "24735",
                    "24736",
                    "24737",
                    "24738",
                    "24739",
                    "24740",
                    "24741",
                    "24742",
                    "24743",
                    "24744",
                    "24745",
                    "24746",
                    "24747",
                    "24748",
                    "24749",
                    "24750",
                    "24764",
                    "24765",
                    "24766",
                    "24767",
                    "24793",
                    "24794",
                    "24795",
                    "33700",
                    "33701",
                    "33702",
                    "33703",
                    "33704",
                    "33705",
                    "33706",
                    "33707",
                    "33708",
                    "33709",
                    "33710",
                    "33711",
                    "33712",
                    "33713",
                    "33714",
                    "33715",
                    "33716",
                    "33717",
                    "33718",
                    "33719",
                    "33720",
                    "33724",
                    "33725",
                    "33726",
                    "33727",
                    "33728",
                    "33729",
                    "33730",
                    "33731",
                    "33732",
                    "33733",
                    "33734",
                    "33735",
                    "33736",
                    "33740",
                    "33741",
                    "33742",
                    "33743",
                    "33744",
                    "33745",
                    "33746",
                    "33747",
                    "33749",
                    "33750",
                    "33757",
                    "33758",
                    "33759",
                    "33760",
                    "33761",
                    "33762",
                    "33763",
                    "33764",
                    "33765",
                    "33766",
                    "33767",
                    "33768",
                    "33769",
                    "33770",
                    "33771",
                    "33772",
                    "33773",
                    "33774",
                    "33775",
                    "33776",
                    "33777",
                    "33778",
                    "33779",
                    "33780",
                    "33781",
                    "33782",
                    "33783",
                    "33784",
                    "33785",
                    "33787",
                    "33788",
                    "33789",
                    "33790",
                    "33791",
                    "33792",
                    "33793",
                    "33794",
                    "33795",
                    "33796",
                    "33797",
                    "33798",
                    "33799",
                    "33800",
                    "33801",
                    "33802",
                    "33803",
                    "33804",
                    "33805",
                    "33806",
                    "33807",
                    "33808",
                    "33809",
                    "33810",
                    "33811",
                    "33812",
                    "33813",
                    "33814",
                    "33815",
                    "33816",
                    "33817",
                    "33818",
                    "33819",
                    "33827",
                    "33830",
                    "33831",
                    "33832",
                    "33833",
                    "33834",
                    "33835",
                    "33836",
                    "33837",
                    "33838",
                    "33839",
                    "33842",
                    "33843",
                    "33844",
                    "33845",
                    "33846",
                    "33847",
                    "33848",
                    "33849",
                    "33850",
                    "33851",
                    "33852",
                    "33853",
                    "33854",
                    "33855",
                    "33856",
                    "33857",
                    "33858",
                    "33859",
                    "33860",
                    "33866",
                    "33867",
                    "33868",
                    "33869",
                    "33870",
                    "33871",
                    "33872",
                    "33873",
                    "33874",
                    "33875",
                    "33876",
                    "33877",
                    "33878",
                    "33879",
                    "33880",
                    "33881",
                    "33882",
                    "33883",
                    "33884",
                    "33885",
                    "33887",
                    "33888",
                    "33889",
                    "33890",
                    "33891",
                ],

                zona7: [
                    "04XXX",
                    "11XXX",
                    "15XXX",
                    "17XXX",
                    "21XXX",
                    "27XXX",
                    "29XXX",
                    "32XXX",
                    "36XXX",
                ],

                zona8: [],

                zona9: [],

                zona10: [
                    "07XXX"
                ],

                zona11: [],

                zona12: [
                    "35XXX",
                    "38XXX",
                ],

                noEnvios: [
                    "51XXX",
                    "52XXX",
                ],
            }

            const totalPeso = peso * tipoPallet; // Peso total del envío

            let estaDentro = false;
            let zona = "";
            let tipo = 0;

            // Buscar una coincidencia exacta del código postal en alguna zona
            const keys = Object.keys(zonas);
            let i = 0;
            while (i < keys.length && !estaDentro) {
                const key = keys[i];
                const codigosPostalesZona = zonas[key];
                if (codigosPostalesZona.includes(cp)) {
                    estaDentro = true;
                    zona = key;
                    tipo = calcularPrecioFinalEnvio(totalPeso, zona);
                }
                i++;
            }

            // Si el código postal completo no se encuentra en ninguna zona, buscar por los dos primeros dígitos
            if (!estaDentro) {
                const dosPrimerosDigitosCP = cp.substring(0, 2);
                const keys2 = Object.keys(zonas);
                let j = 0;
                while (j < keys2.length && !estaDentro) {
                    const key = keys2[j];
                    const codigosPostalesZona = zonas[key];
                    let k = 0;
                    while (k < codigosPostalesZona.length && !estaDentro) {
                        if (codigosPostalesZona[k].startsWith(dosPrimerosDigitosCP)) {
                            estaDentro = true;
                            zona = key;
                            tipo = calcularPrecioFinalEnvio(totalPeso, zona);
                        }
                        k++;
                    }
                    j++;
                }
            }

            if (estaDentro) {
                // tipo = tipo * 1.21; // Añadir IVA
                const precioFinal = (precio + tipo).toFixed(2);
                console.log(`El precio final para el código postal ${cp} y tipo de pallet ${tipoPallet} es: ${precioFinal}`);
                return precioFinal;
            } else {
                console.log(`El código postal ${cp} no se encuentra en ninguna zona válida.`);
                return 0;
            }
        }
    }

    const [envio, setEnvio] = useState(false); // Estado para manejar el tipo de envío
    const precioFinal = calcularPrecios(precioPack, codigoPostal, pack, peso);


    const [isEditing, setIsEditing] = useState(false); // Estado para controlar la edición del código postal
    const [showAlert, setShowAlert] = useState(false); // Estado para controlar si se muestra el alert

    // Función para comprobar si un valor es un número entero
    const isInteger = (value) => {
        return /^\d+$/.test(value);
    };

    // Función para comprobar si el código postal es válido
    const isValidCodigoPostal = (codigoPostal) => {
        if (!isInteger(codigoPostal)) {
            return false;
        }

        const parsedCodigoPostal = parseInt(codigoPostal, 10);
        return parsedCodigoPostal >= 1000 && parsedCodigoPostal <= 50999;
    };

    // Función para guardar el código postal en las cookies y actualizar el estado
    const handleGuardarCodigoPostal = (newCodigoPostal) => {
        if (isValidCodigoPostal(newCodigoPostal)) {
            setCodigoPostal(newCodigoPostal);
            setIsEditing(false);
            setShowAlert(false); // Reiniciar el estado de showAlert cuando el código postal sea válido

            // Guardar el código postal en las cookies
            const cookies = new Cookies();
            cookies.set('codigoPostal', newCodigoPostal, { path: '/' });
        } else {
            setShowAlert(true); // Mostrar el alert si el código postal no es válido
        }
    };

    // Controlador de evento para guardar el código postal al presionar "Enter"
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleGuardarCodigoPostal(event.target.value);
        }
    };

    const [valoracion, setValoracion] = useState(estrellas); // Aquí puedes cambiar el valor de ejemplo

    // Genera un array de estrellas basado en la valoración del producto
    const generarEstrellas = () => {
        const estrellas = [];
        for (let i = 1; i <= 5; i++) {
            estrellas.push(
                i <= valoracion ? (
                    <span key={i} className="estrella-llena">
                        &#9733;
                    </span>
                ) : (
                    <span key={i} className="estrella-vacia">
                        &#9734;
                    </span>
                )
            );
        }
        return estrellas;
    };

    const [showPopup, setShowPopup] = useState(false); // Estado para controlar si se muestra el popup

    // Función para mostrar el popup
    const handleShowPopup = () => {
        setShowPopup(true);
        document.body.style.overflow = 'hidden';
    };

    return (
        <>
            <div className="producto-page">
                <div className="multimedia-producto-page">
                    <img src={imagen} alt={nombre} className="img-producto-page" />
                    <h3 className="title-section-producto">Valoraciones</h3>
                    <p className="descripcion-valoraciones">
                        Los productos son evaluados por expertos en la materia, quienes han otorgado una valoración de {valoracion} sobre 5 estrellas. La valoración se basa en criterios como la calidad del producto, la sostenibilidad, la eficiencia energética y la satisfacción del cliente. Puedes confiar en que nuestras valoraciones reflejan la excelencia de nuestros productos.
                    </p>
                    <div className="estrellas">{generarEstrellas()}</div>
                </div>
                <div className="info-producto-page">
                    <h1 className="title-producto-page">{nombre}</h1>
                    <div className="shipping-container">
                        <button onClick={() => setEnvio(false)} className={!envio ? 'shipping-title active' : 'shipping-title'}>Recogida gratis</button>
                        {
                            seEnvia ? (
                                <button onClick={() => setEnvio(true)} className={envio ? 'shipping-title active' : 'shipping-title'}>Envío a domicilio</button>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                    {!envio ? (
                        <></>
                    ) : (
                        <div className="cp-container">
                            {isEditing ? (
                                <div className="editar-cp">
                                    <input
                                        type="text"
                                        className="cp-input"
                                        defaultValue={codigoPostal}
                                        onBlur={(e) => handleGuardarCodigoPostal(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button className="cp-button" onClick={() => handleGuardarCodigoPostal(codigoPostal)}>Actualizar</button>
                                </div>
                            ) : codigoPostal == undefined ? (
                                <p className="cp-envio" onClick={() => setIsEditing(true)} style={{ cursor: 'pointer' }}>
                                    Añadir un código postal para calcular el precio <FaPlus size={15} color="#ee1f26" />
                                </p>
                            )
                                :
                                (
                                    <p className="cp-envio" onClick={() => setIsEditing(true)}>
                                        Código postal: <span>{codigoPostal}</span> <FaPencilAlt size={15} style={{ cursor: 'pointer' }} color="#ee1f26" />
                                    </p>
                                )}
                            {showAlert && (
                                <p className="alert-text">El código postal debe ser un número de 5 dígitos entre 01000 y 50999.</p>
                            )}
                        </div>
                    )}
                    {!envio ? (
                        <div className="precio-producto-page">{precioPack.toFixed(2)} €</div>
                    ) : (
                        <div className="precio-producto-page">{precioFinal} €</div>
                    )}
                    <div className="descripcion-producto-page">
                        <div dangerouslySetInnerHTML={{ __html: descripcion }} />
                    </div>
                    <button className="cta-producto-page" onClick={handleShowPopup}>COMPRAR AHORA</button>
                    {showPopup && <FinalizaTuCompra nombre={nombre} imagen={imagen} precioPack={precioPack} envio={envio} precioFinal={precioFinal} onClose={() => {
                        setShowPopup(false);
                        document.body.style.overflow = 'unset';
                    }} />}
                </div>
            </div>
            <div className="info-adicional-producto-page">
                <img src='/assets/suministrado.png' alt="Suministrado en españa" />
                <p>Nuestro COMPROMISO: <br></br>PRECIOS mínimos,<br></br>GARANTIZADO.-!</p>
            </div>
        </>
    )
}

export default Producto