import { DataTypes, Model } from 'sequelize'
import type { Optional } from 'sequelize'
import type { Client } from '@/models'
import { sequelize } from '../database'

class ClientEntity extends Model {
  declare id: number
  declare name: string
  declare address: string
  declare contactPhone: string
  declare cpf?: string
  declare cnpj?: string
}

ClientEntity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contactPhone: {
    type: DataTypes.STRING(11),
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING(11),
    allowNull: true
  },
  cnpj: {
    type: DataTypes.STRING(14),
    allowNull: true
  }
}, { sequelize })

export { ClientEntity }
