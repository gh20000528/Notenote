import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('sys', 'root', 'gh890528', {
  host: '127.0.0.1',
  dialect: 'mysql',
});

export default sequelize;
