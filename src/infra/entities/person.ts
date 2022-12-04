import { Model, DataTypes } from 'sequelize'
import type { Optional } from 'sequelize'
import type { Person } from '@/models'
import { sequelize } from '../database'

class PersonEntity extends Model<Person, Optional<Person, 'id'>> {}

PersonEntity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  ctps: {
    type: DataTypes.STRING(8),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  admissionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  demissionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  contactPhone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['admin', 'seller'] as Person.Role[]],
        msg: 'Must be a valid role'
      }
    }
  },
  sector: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: [['external', 'internal'] as Person.Sector[]],
        msg: 'Must be a valid rsector'
      }
    }
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  neighborhood: {
    type: DataTypes.STRING,
    allowNull: false
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false
  },
  postalCode: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, { sequelize })

export { PersonEntity }
