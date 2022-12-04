import { Product } from '@/models'
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database'

class ProductEntity extends Model<Product, Optional<Product, 'id'>> {}

ProductEntity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  batchCode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  grammage: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  productionDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  expirationDate: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, { sequelize })

export { ProductEntity }
