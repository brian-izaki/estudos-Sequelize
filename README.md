# Estudos do [Sequelize](https://sequelize.org/master/manual/getting-started.html)

## Configurações necessárias:

- Node.js instalado
- MySQL em máquina local ou remoto,
- Preencher o .env com os dados relacionados ao BD

## Inicialização

```shell
  # instalar dependencias
  npm install

  # inicializar o sequelize
  node index.js
```

## Foi utilizado:

- sequelize,
- sequelize-cli,
- dotenv,
- mysql2

---

## Acesso ao banco de dados

- forma de string de conexao
- forma por parametros de cada dado da conexao

## Uso de models

- forma com declaração de variavel
- forma da classe que extende a classe Model
- As tabelas criadas no banco pelas models ficam no plural, para desativar esse modo é nessário adicionar em "outras opções" o seguinte atributo: `freezeTableName: true`

---

## Instância de um registro (tempo de execução sem persistir o dado no BD):

- Insert:

  - pode ser utilizado o `[nome da model].build({chave:valor})`, porém isto não persiste no banco, apenas fica na aplicação
  - para persistir é utilizado `[nome da model].build({chave:valor}).save()`
  - a maneira mais fácil é utilizar `[nome da model].create({chave:valor})`

- update:

  - Pegar a instancia do registro e alterar o atributo dentro dela e depois realizar o `[nome da model].build({chave:valor}).save()` novamente.

- delete:

  - é utilizado o comando `destroy()` onde fica o `save()`

- reload
  - caso durante o tempo de execução esteja manipulando um dado mas queira voltar para o que está persistido no BD, basta passar o comando `reload()`

---

## Comandos para CRUD:

- ### Insert

  - `[nome da model].create({chave:valor})`

- ### Select

  - é utilizado a função `[nome da model].findAll()`
  - caso queira apenas algumas colunas é utilizado

  ```javascript
    [nome da model].findAll({
      attributes: [nome da coluna, nome da coluna]
    })
  ```

  - Para nomear uma coluna pode ser utilizado um array aninhado

  ```javascript
    [nome da model].findAll({
      attributes: [nome da coluna, [nome da coluna, alias dela]]
    })
  ```

  - Cláusula Where

  ```javascript
    [nome da model].findAll({
      where: {
        [nome da coluna]: [valor que deseja]
      }
    })
  ```

  - para utilizar operadores como like, >, not, or, and, entre outros é necessário ver a [**lib op do sequelize**](https://sequelize.org/master/manual/model-querying-basics.html#operators)

- ### Update

  ```JavaScript
    [nome da model].update(
      {[coluna q vai Alterar]:[valor a ser alterado]},
      {
        where: {
          [coluna de identificação]: [valor de identificação]
        }
      }
    )
  ```

- ### Delete

  - Para realizar a operação delete

  ```JavaScript
    [nome da model].destroy({
      where: {
        [coluna de identificação]: [valor de identificação]
      }
    })
  ```

  - tambem pode realizar a operação truncate (mais rápido, porém não tem como realizar rollback depois) **Vai apagar os registros de toda a tabela**

  ```JavaScript
    [nome da model].destroy({
      truncate: true
    })
  ```
---

- caso deseje escrever o sql, pode ser feito as [**Raw Querys**](https://sequelize.org/master/manual/raw-queries.html)

---

## [Migrations](https://sequelize.org/master/manual/migrations.html) - pasta [comMigrations](./comMigration/index.js)
- é necessário utilizar o sequelize-cli 
```
  npm i --save-dev sequelize-cli 
```
- após isso é necessário inicializar ele `npx sequelize-cli init` 
  - será criado 4 pastas: config, migrations, models e seeders

- Ver a pasta config e atualizar os dados de acordo com seu BD
- Migration:
  - criar migration `model:generate` para ter um model.
  ```shell
  npx sequelize-cli model:generate --name [nome da tabela] --attributes [nomes da coluna]:[tipo],[nomes da coluna]:[tipo]
  ```
  - executar migration `db:migrate` para criar tabela de acordo com a model criada.
  ```shell
  npx sequelize-cli db:migrate
  ```
  - revertendo uma migration `db:migrate:undo` ele apaga a tabela criada com o `db:migrate`
  ```shell
  npx sequelize-cli db:migrate:undo

  # tambem pode reverter varios com db:migrate:undo:all 
  npx sequelize-cli db:migrate:undo:all --to [nome do arquivo de migration com o .js]
  ```

  - Esqueleto de migration
    - essa forma apenas cria um boilerplate de uma migrate, e o desenvolvedor deve adicionar os atributos da tabela manualmente.
    ```shell
    npx sequelize-cli migration:generate --name [nome da migration (por convenção coloque no inicio migration-)]
    ```
    - queryInterface serve para alterações na tabela,
    - Sequelize.DataTypes serve para os tipos de dados nas colunas (Sequelize é a instancia do próprio sequelize como visto na [linha 3 do index.js da pasta normal](./normal/index.js))

- Seeds:
  - São dados de demonstração que vão ser inseridos na tabela (penso que seja bom para testes)
  - criar seed
  ```shell
  npx sequelize-cli seed:generate --name [nome da seed (por convenção coloque seed- no inicio)]
  ```  
  - executar a seed
  ```shell
  npx sequelize-cli db:seed:all
  ```  
  - revertendo uma seed
  ```shell
  # desfaz o ultimo seed
  # ou pode desfazer todos adicionando apenas :all
  npx sequelize-cli db:seed:undo[:all]

  # desfazer seed especifico
  npx sequelize-cli db:seed:undo --seed [nome do arquivo seed]
  ```

- .sequelizerc
  - Para o caso de querer alterar os nomes ou caminhos dos que foram adicionados no momento do init do cli.
  - Caso queira utilizar variaveis de ambiente na configuração do banco, é necessário alterar o arquivo .json para .js




