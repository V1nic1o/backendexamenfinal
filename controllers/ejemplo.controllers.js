const db = require('../config/db.config.js');
const Ejemplo = db.ejemplo;

// Crear un nuevo registro
exports.create = (req, res) => {
  const { nombre, precio, stock, descripcion, fechaExpiracion, estatusPago } = req.body;

  if (!nombre || !precio) {
    return res.status(400).json({ message: "El nombre y el precio son obligatorios." });
  }

  Ejemplo.create({
    nombre,
    precio,
    stock: stock || 0,
    descripcion,
    fechaExpiracion,
    estatusPago: estatusPago || false,
  })
    .then((result) => {
      res.status(201).json({
        message: "Registro creado con éxito.",
        data: result,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fallo al crear el registro.",
        error: error.message,
      });
    });
};

// Obtener todos los registros
exports.findAll = (req, res) => {
  Ejemplo.findAll()
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ message: "Error al obtener registros.", error: error.message }));
};

// Obtener un registro por ID
exports.findById = (req, res) => {
  const { id } = req.params;

  Ejemplo.findByPk(id)
    .then((data) => {
      if (!data) return res.status(404).json({ message: `No se encontró un registro con id = ${id}.` });
      res.status(200).json(data);
    })
    .catch((error) => res.status(500).json({ message: `Error al obtener el registro con id = ${id}.`, error: error.message }));
};

// Actualizar un registro por ID
exports.update = (req, res) => {
  const { id } = req.params;

  Ejemplo.update(req.body, { where: { id } })
    .then((num) => {
      if (num == 1) return res.status(200).json({ message: "Registro actualizado exitosamente." });
      res.status(404).json({ message: `No se encontró un registro con id = ${id}.` });
    })
    .catch((error) => res.status(500).json({ message: `Error al actualizar el registro con id = ${id}.`, error: error.message }));
};

// Eliminar un registro por ID
exports.delete = (req, res) => {
  const { id } = req.params;

  Ejemplo.destroy({ where: { id } })
    .then((num) => {
      if (num == 1) return res.status(200).json({ message: "Registro eliminado exitosamente." });
      res.status(404).json({ message: `No se encontró un registro con id = ${id}.` });
    })
    .catch((error) => res.status(500).json({ message: `Error al eliminar el registro con id = ${id}.`, error: error.message }));
};
