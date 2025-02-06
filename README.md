# nodejs-api-with-mocha
Este projeto é uma API backend desenvolvida em Node.js para realizar operações CRUD (criar, ler, atualizar e deletar) sobre veículos. Os dados são persistidos em um arquivo JSON e o projeto conta com testes unitários utilizando Mocha, Chai e Supertest.

---

## Estrutura do Projeto

- **server.js**  
  Arquivo principal que inicializa o servidor Express e configura as rotas.

- **controllers**  
  Camada responsável por receber as requisições, processar os dados e enviar as respostas. Essa camada interage com os modelos e delega as operações.

- **models**  
  Camada que representa os dados dos veículos e implementa as operações de persistência. Aqui é definido o CRUD utilizando um arquivo JSON como armazenamento.

- **routes**  
  Camada que define os endpoints REST e mapeia as requisições para os métodos do controller.

- **services**  
  Camada de serviços que abstrai operações auxiliares, como a leitura e escrita de dados no arquivo JSON.

- **data**  
  Pasta que contém o arquivo `vehicles.json`, onde os dados dos veículos são armazenados.

- **test**  
  Pasta que contém os testes unitários, garantindo que as operações de criação, leitura, atualização e deleção funcionem corretamente.

---

## Pré-requisitos

- Node.js (versão 12 ou superior)
- npm (gerenciador de pacotes)

---

## Como Executar o Projeto

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/dominicmonteiro/nodejs-api-with-mocha

   cd nodejs-api-with-mocha
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Crie a pasta `data` e o arquivo `vehicles.json`:**

   ```bash
   mkdir data
   echo "[]" > data/vehicles.json
   ```

4. **Inicie o servidor:**

   ```bash
   npm start
   ```

   O servidor ficará rodando na porta `3000` (ou na porta definida na variável de ambiente `PORT`).

---

## Executando os Testes

Para rodar os testes unitários, utilize o seguinte comando:

```bash
npm test
```

Os testes utilizam Mocha, Chai e Supertest para validar cada uma das operações do CRUD.

---

## Endpoints da API

- **POST `/vehicles`**: Cria um novo veículo.
  - **Exemplo de payload:**
    ```json
    {
      "placa": "ABC1234",
      "chassi": "XYZ987654321",
      "renavam": "123456789",
      "modelo": "Civic",
      "marca": "Honda",
      "ano": 2020
    }
    ```
- **GET `/vehicles`**: Retorna a lista de todos os veículos.
- **GET `/vehicles/:id`**: Retorna os dados de um veículo específico.
- **PUT `/vehicles/:id`**: Atualiza os dados de um veículo.
  - **Exemplo de payload:**
    ```json
    {
      "modelo": "Focus",
      "ano": 2019
    }
    ```
- **DELETE `/vehicles/:id`**: Remove um veículo.

