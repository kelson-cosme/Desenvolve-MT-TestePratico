# Consulta de Pessoas Desaparecidas - PJC-MT

Este projeto é uma Single Page Application (SPA) desenvolvida como parte de um desafio prático. A aplicação consome a API da Polícia Judiciária Civil de Mato Grosso para permitir que cidadãos consultem registros de pessoas desaparecidas e enviem informações adicionais que possam auxiliar na localização.

## Funcionalidades

- **Listagem e Paginação:** Visualização dos registros de pessoas desaparecidas em formato de cards, com paginação para navegar entre os resultados.
- **Busca Dinâmica:** Campo de busca para filtrar pessoas por nome.
- **Detalhes do Registro:** Visualização completa dos dados de uma pessoa, incluindo um histórico de informações e avistamentos já registrados.
- **Envio de Informações:** Formulário para que o cidadão possa enviar novas informações sobre uma pessoa, incluindo data, local, observações e anexos de fotos.
- **Responsividade:** Layout adaptável para diferentes tamanhos de tela, de dispositivos móveis a desktops.

## Tecnologias Utilizadas

- **Vite:** Build tool para desenvolvimento frontend moderno e rápido.
- **React:** Biblioteca para construção da interface de usuário.
- **TypeScript:** Superset do JavaScript que adiciona tipagem estática.
- **Tailwind CSS:** Framework CSS utility-first para estilização rápida e responsiva.
- **React Router DOM:** Para gerenciamento de rotas e navegação na SPA.
- **Axios:** Cliente HTTP para realizar as requisições à API.
- **React IMask:** Para aplicação de máscaras em campos de formulário.
- **Docker:** Para containerização da aplicação, garantindo um ambiente de execução consistente.

---

## Passo a Passo para Instalação, Execução e Testes

Existem duas maneiras de executar este projeto: localmente para desenvolvimento ou via Docker para um ambiente de produção.

### 1. Execução em Ambiente de Desenvolvimento Local

**Pré-requisitos:**
- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [npm](https://www.npmjs.com/) (geralmente instalado com o Node.js)

**Passos:**

1.  **Clone o repositório:**
    ```bash
    git clone <URL_DO_SEU_REPOSITORIO_NO_GITHUB>
    cd <NOME_DA_PASTA_DO_PROJETO>
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Execute o servidor de desenvolvimento:**
    ```bash
    npm run dev
    ```

4.  **Acesse a aplicação:** Abra seu navegador e acesse `http://localhost:5173` (ou a porta indicada no seu terminal).

### 2. Execução com Docker

**Pré-requisitos:**
- [Docker](https://www.docker.com/products/docker-desktop/) instalado e em execução.

**Passos:**

1.  **Construa a imagem Docker:**
    No terminal, na raiz do projeto, execute o comando abaixo. Isso irá ler o `Dockerfile`, baixar as dependências, construir o projeto e empacotar tudo em uma imagem.
    ```bash
    docker build -t desaparecidos-mt .
    ```

2.  **Execute o container a partir da imagem:**
    Este comando irá iniciar um container com a sua aplicação e mapear a porta `8080` do seu computador para a porta `80` do container (onde o servidor Nginx está rodando).
    ```bash
    docker run -p 8080:80 desaparecidos-mt
    ```

3.  **Acesse a aplicação:** Abra seu navegador e acesse `http://localhost:8080`.

### Testes Manuais

Para garantir que todas as funcionalidades estão operando corretamente, siga os passos abaixo:

1.  **Teste de Listagem e Paginação:**
    - Verifique se a lista de pessoas é carregada na página inicial.
    - Clique nos botões de paginação e confirme se a lista de pessoas é atualizada.

2.  **Teste da Busca:**
    - Digite um nome no campo de busca e clique em "Buscar".
    - A lista deve ser atualizada para exibir apenas os resultados correspondentes.
    - Limpe o campo de busca e pesquise novamente para ver a lista completa.

3.  **Teste da Tela de Detalhes e Histórico:**
    - Clique em qualquer card na página inicial.
    - Verifique se você foi redirecionado para a página de detalhes da pessoa correta.
    - Confira se os detalhes da pessoa e o histórico de informações são exibidos.
    - Clique no botão "&larr; Voltar para a lista" e confirme que você retornou para a página exata de onde saiu (mantendo a paginação e a busca).

4.  **Teste de Envio de Informações:**
    - Na página de detalhes, clique em "Enviar Informações Adicionais".
    - Preencha todos os campos do formulário, incluindo a seleção de um ou mais arquivos de imagem.
    - Envie o formulário e verifique se a mensagem de sucesso é exibida.
    - (Opcional) Atualize a página de detalhes para ver se a nova informação aparece no histórico.

---

## Dados de Inscrição

- **Nome Completo:** Kelson Cosme de Almeida
- **E-mail:** Kelson.almeida123@gmail.com
- **Inscrição:** 
