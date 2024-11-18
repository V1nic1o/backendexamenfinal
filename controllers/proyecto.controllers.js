const db = require('../config/db.config.js');
const Proyecto = db.Proyecto;

// Crear un nuevo proyecto - '/api/proyecto/create'
exports.create = (req, res) => {
    let proyecto = {};

    try {
        proyecto.titulo = req.body.titulo;
        proyecto.descripcion = req.body.descripcion;
        proyecto.completada = req.body.completada || false;
        proyecto.fecha_vencimiento = req.body.fecha_vencimiento;
        proyecto.prioridad = req.body.prioridad || 'media';
        proyecto.asignado_a = req.body.asignado_a;
        proyecto.categoria = req.body.categoria;
        proyecto.costo_proyecto = req.body.costo_proyecto;
        proyecto.pagado = req.body.pagado || false;

        Proyecto.create(proyecto).then(result => {
            res.status(200).json({
                message: "Proyecto creado con éxito con id = " + result.id_proyecto,
                proyecto: result,
            });
        });    
    } catch (error) {
        res.status(500).json({
            message: 'Fallo al crear proyecto',
            error: error.message
        }); 
    };
};

exports.findAll = (req, res) => {
    Proyecto.findAll()
        .then(proyectos => {
            res.status(200).json(proyectos);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Fallo al obtener proyectos',
                error: error.message
            });
        });
};

// Obtener un proyecto por ID - '/api/proyecto/:id'
exports.findById = (req, res) => {
    const id = req.params.id;

    Proyecto.findByPk(id)
        .then(proyecto => {
            if (!proyecto) {
                return res.status(404).json({
                    message: "Proyecto no encontrado con id = " + id
                });
            }
            res.status(200).json(proyecto);
        })
        .catch(error => {
            res.status(500).json({
                message: 'Error al obtener el proyecto con id = ' + id,
                error: error.message
            });
        });
};

// Actualizar un proyecto - '/api/proyecto/:id'
exports.update = (req, res) => {
    const id = req.params.id;

    Proyecto.update(req.body, { where: { id_proyecto: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Proyecto actualizado exitosamente.",
                });
            } else {
                res.status(404).json({
                    message: `No se pudo actualizar el proyecto con id = ${id}. Proyecto no encontrado o req.body vacío.`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "Error al actualizar el proyecto con id = " + id,
                error: error.message
            });
        });
};

// Eliminar un proyecto - '/api/proyecto/:id'
exports.delete = (req, res) => {
    const id = req.params.id;

    Proyecto.destroy({ where: { id_proyecto: id } })
        .then(num => {
            if (num == 1) {
                res.status(200).json({
                    message: "Proyecto eliminado exitosamente."
                });
            } else {
                res.status(404).json({
                    message: `No se pudo eliminar el proyecto con id = ${id}. Proyecto no encontrado.`
                });
            }
        })
        .catch(error => {
            res.status(500).json({
                message: "No se pudo eliminar el proyecto con id = " + id,
                error: error.message
            });
        });
};