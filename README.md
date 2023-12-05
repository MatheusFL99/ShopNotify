# Shopnotify

Shopnotify são 2 aplicações mobile de um e-comerce onde o usuário pode entrar como um comprador ou um vendedor/loja, sendo possível como comprador adicionar ao carrinho e comprar produtos, adicionar aos favoritos verificar histórico de compras. Já como comerciante ele pode adicionar e gerir produtos, e visualizar suas vendas e faturamentos. 
Aplicação desenvolvida utilizando Node.js, React-Native, Expo e MongoDB para armazenamento de dados.

## Instalação

### Prerequisitos

- node
- npm
- mongodb
- react-native
- expo

1. Clone esse repositório

2. Instale as dependencias do servidor
   ```bash
   $ cd backend
   $ npm install
   ```
3. Crie um arquivo .env com as seguintes variaveis
   ```bash
   DB_CONNECTION_STRING=
   JWT_SECRET_USER=
   JWT_SECRET_STORE=
   ```
4. Instale as dependencias do cliente
   ```bash
   $ cd frontend
   $ npm install
   $ cd frontend-store
   $ npm install
   ```

## Run the app

1. Rode mongodb
   ```bash
   $ mongod
   ```
2. Rode o servidor
   ```bash
   $ cd backend
   $ npm start
   ```
3. Rode o client
   ```bash
   $ cd frontend
   $ npm start
   ```
4. Acesse o aplicativo via aplicativo do expo em um aparelho mobile ou emulador
