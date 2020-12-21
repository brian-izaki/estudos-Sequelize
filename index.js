require('dotenv/config');
const sequelize = require('./config/database');

async function testeConexao() {
  try{
    await sequelize.authenticate();
    console.log(process.env.DB_NAME)
    console.log('Conected');
  } catch(error){
    console.error(error);
  };
}

testeConexao();
