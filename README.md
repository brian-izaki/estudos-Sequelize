# Estudos do Sequelize

## Inicialização
```shell
  # instalar dependencias
  npm install

  # configurar o .env com as configurações do MySQL que será utilizado

  # inicializar o sequelize
  node index.js
```

## Foi utilizado:

- MySQL instalado,
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

- caso deseje escrever o sql, pode ser feito as [**Raw Querys**](https://sequelize.org/master/manual/raw-queries.html)
