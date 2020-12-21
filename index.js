require('dotenv/config');
const sequelize = require('./config/database');
const Processos = require('./models/Processos');
const consoleStringfy = require('./utils/consoleStringfy');

(async ()=> {
  try{
    await sequelize.authenticate();
    console.log(process.env.DB_NAME)
    console.log('Conected');
  } catch(error){
    console.error(error);
  };

  // comando muito destrutivo, não é recomendado para produção
  await sequelize.sync({ force: true });
  

  // Insert
  const processo = await Processos.create({tipo: 'tributário', descricao: 'Dívida de jogo'});
  await Processos.create({tipo: 'elementar', descricao: 'Londres possui o big bang'});
  await Processos.create({tipo: 'elementar', descricao: 'Sherlock Holmes'});
  // quando for fazer log, é bom utilizae o .toJASON
  console.log(processo.toJSON())

  // SELECT
  const selecionar = await Processos.findAll();
  consoleStringfy(selecionar)

  const umaColuna = await Processos.findAll({
    attributes: ['descricao']
  })
  consoleStringfy(umaColuna)

  const alias = await Processos.findAll({
    attributes: [['descricao', 'minhaAlias']]
  })
  consoleStringfy(alias)
  
  const hasWhere = await Processos.findAll({
    where: {
      tipo: 'elementar'
    }
  })
  consoleStringfy(hasWhere)
  
  //UPDATE
  await Processos.update({descricao: 'Circo pegando fogo'}, {
    where: {
      tipo: 'tributário'
    }
  })
  consoleStringfy(await Processos.findAll())
  
  //DELETE
  await Processos.destroy({
    where: {
      id: 1
    }
  })
  consoleStringfy(await Processos.findAll())

  await Processos.destroy({
    // where: {
    //   id: 1
    // },
    truncate: true
  })
  consoleStringfy(await Processos.findAll())

})()

