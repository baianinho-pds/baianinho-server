import { Feedstock } from '@/models'
import { DataTypes, Model, Optional } from 'sequelize'
import { sequelize } from '../database'
import { ProductEntity } from './product'

class FeedstockEntity extends Model<Feedstock, Optional<Feedstock, 'id'>> {}

FeedstockEntity.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  suppliesType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provider: {
    type: DataTypes.STRING,
    allowNull: false
  },
  unit: {
    type: DataTypes.STRING,
    allowNull: false
  },
  amount: {
    type: DataTypes.INTEGER
  },
  validity: {
    type: DataTypes.DATE
  }
}, { sequelize })

ProductEntity.belongsToMany(FeedstockEntity, { through: 'Product_Feedstock', as: 'feedstocks' })
FeedstockEntity.belongsToMany(ProductEntity, { through: 'Product_Feedstock', as: 'products' })

export { FeedstockEntity }
