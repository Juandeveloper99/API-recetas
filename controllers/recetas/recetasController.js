import {
  listarTodosrecetasQuery,
  listarrecetaPorIdQuery,
  crearrecetaQuery,
  actualizarrecetaQuery,
  eliminarrecetaQuery
} from "../../db/recetas/recetasQueries.js";

/**
 * Obtener todos los recetas de la base de datos
 */
const listarTodosrecetas = async (req, res) => {
  // Un bloque try-catch  sirve para validar si la peticion se obtiene o se devuelve un error
  // Try -> intentar
  // Catch -> capturar el error
  try {
    //  Ejecutar la consulta en la base de datos
    const recetas = await listarTodosrecetasQuery();
    res.json(recetas);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Obtener el receta con el ID especificado en la query / url
 * @param {*} req 
 * @param {*} res 
 */

const listarrecetaPorId = async (req, res) => { 
  try {
    //  Ejecutar la consulta en la base de datos
    const receta = await listarrecetaPorIdQuery(req.params.id);
    res.json(receta);
  } catch (error) {
    res.status(500).send(error);
  }
};

/**
 * Crear un receta
 */
const crearreceta = async (req, res) => {
  console.log(req.body)
  try {
      const datosreceta = req.body;
      const resultado = await crearrecetaQuery(datosreceta);
      res.json({ mensaje: 'receta creado con éxito', id: resultado.insertId });
  } catch (error) {
      res.status(500).send(error);
  }
};

/**
 * Actualizar los datos de un receta
 */
const actualizarreceta = async (req, res) => {
  try {
      const id = req.params.id;
      const datosreceta = req.body;
      const resultado = await actualizarrecetaQuery(id, datosreceta);
      if (resultado.affectedRows > 0) {
          res.json({ mensaje: 'receta actualizado con éxito', id: id });
      } else {
          res.status(404).json({ mensaje: 'receta no encontrado' });
      }
  } catch (error) {
      res.status(500).send(error);
  }
};

/**
 * Eliminar un receta
 */
const eliminarreceta = async (req, res) => {
  try {
      const id = req.params.id;
      const resultado = await eliminarrecetaQuery(id);
      if (resultado.affectedRows > 0) {
          res.json({ mensaje: 'receta eliminado con éxito' });
      } else {
          res.status(404).json({ mensaje: 'receta no encontrado' });
      }
  } catch (error) {
      res.status(500).json({ mensaje: 'Error al eliminar el receta', error: error.message });
  }
};

export {
  listarTodosrecetas,
  listarrecetaPorId,
  crearreceta,
  actualizarreceta,
  eliminarreceta,
};
