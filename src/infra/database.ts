import { Sequelize } from 'sequelize'

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'baianinho_db',
  username: 'postgres',
  password: 'postgres',
  database: 'baianinhodb',
  port: 5432
})

export { sequelize }
