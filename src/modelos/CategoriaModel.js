class CategoriaModel {
    constructor({ id, nombre, descripcion, categoriaSuperior }) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoriaSuperior = categoriaSuperior;
    }
}

// Función para consultar todas las marcas de la api
export const getCategorias = async () => {
    const response = await fetch('https://api.primepellet.es/categorias?bbdd=2');
    const categorias = await response.json();
    return categorias.map((categoria) => new CategoriaModel(categoria));
};

// Función para buscar marcas de la api
export const buscarCategoria = async (query) => {
    const response = await fetch(`https://api.primepellet.es/categorias?search=${query}&bbdd=2`);
    const categorias = await response.json();
    return categorias.map((categoria) => new CategoriaModel(categoria));
};

export default CategoriaModel;