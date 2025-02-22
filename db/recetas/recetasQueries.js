import config from '../../config.js';


// Helper function to handle query results
const respuesta = (err, result, resolve, reject) => {
    if (err) {
        console.log(err);
        reject(err);
    } else {
        resolve(result);
    }
};
/**
 * Carga la lista de recetas
 */
const listarTodosrecetasQuery = () => {
    // Una promesa es una forma de que siempre se devuelva un resultado al quien llama (sea error o éxito)
    // Si la consulta no genera error, entonces resuelve/cumple la promesa con el resultado
    // Si hay algun error entonces rechaza la consulta e informa la razón 
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM recetas', (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};

/**
 * Buscar un receta por su ID (llave primaria)
 */
const listarrecetaPorIdQuery = (id) => {
    return new Promise((resolve, reject) => {
        config.query('SELECT * FROM recetas WHERE id_receta = ? LIMIT 1', [id], (err, filas) => {
            respuesta(err, filas, resolve, reject);
        });
    });
};


/**
 * Guardar un nuevo receta
 */
const crearrecetaQuery = async (receta) => {
    const { id_recetas, nombre, descripcion, imagen, tiempo } = receta;
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO id_recetas, nombre, descripcion, imagen, tiempo) VALUES (?, ?, ?, ?, ?)';
        config.query(sql, [id_recetas, nombre, descripcion, imagen, tiempo], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Actualizar un receta por su ID
 */
const actualizarrecetaQuery = (id, receta) => {
    const { id_recetas, nombre, descripcion, imagen, tiempo } = receta;
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE id_recetas SET nombre = ?, descripcion = ?, imagen = ?, imagen = ? WHERE id_recetas = ?';
        config.query(sql, [id_recetas, nombre, descripcion, imagen, tiempo], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

/**
 * Eliminar un receta por su ID
 */
const eliminarrecetaQuery = (id) => {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM recetas WHERE id_receta = ?';
        config.query(sql, [id], (err, resultado) => {
            respuesta(err, resultado, resolve, reject);
        });
    });
};

// Exportar todas las funciones definidas en este archivo
export {
    listarTodosrecetasQuery,
    listarrecetaPorIdQuery,
    crearrecetaQuery,
    actualizarrecetaQuery,
    eliminarrecetaQuery   
}
