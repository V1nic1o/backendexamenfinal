module.exports = (sequelize, Sequelize) => {
    const Ejemplo = sequelize.define(
      "ejemplo",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        nombre: {
          type: Sequelize.STRING(100),
          allowNull: false,
          validate: {
            notEmpty: true,
            len: [1, 100],
          },
        },
        precio: {
          type: Sequelize.DECIMAL(10, 2),
          allowNull: false,
          validate: {
            isDecimal: true,
            min: 0,
          },
        },
        stock: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        descripcion: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        fechaExpiracion: {
          type: Sequelize.DATE,
          allowNull: true,
        },
        estatusPago: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      },
      {
        freezeTableName: true,
      }
    );
  
    return Ejemplo;
  };
  