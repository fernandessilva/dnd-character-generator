# Gerador de Personagem de D&D 5e

Este é um projeto para gerar personagens aleatórios para Dungeons & Dragons 5ª edição. Ele permite criar personagens com atributos, raça, classe, antecedentes, alinhamento e equipamentos, além de gerar uma ficha de personagem em PDF.

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Como rodar o projeto

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/seu-usuario/dnd-character-generator.git

   ```

2. **Acesse o diretório do projeto**

   ```bash
   cd dnd-character-generator

   ```

3. **Instale as dependências:**

   ```bash
   npm install

   ```

4. **Inicie o servidor de desenvolvimento**

   ```bash
   npm run dev
   ```

5. **Abra o projeto no navegador**

   http://localhost:5174/

## Estrutura do projeto

### Visão geral da estrutura de diretórios do projeto:

```
│   ├── style.css                       # Estilos CSS do projeto
│   └── src/                            # Código Fonte
│       ├── main.js                     # Arquivo principal JavaScript
│       ├── data/                       # Dados mockados usados no projeto
│       │   ├── alinhamentos.js
│       │   ├── antecedentes.js
│       │   ├── classes.js
│       │   ├── equipamentos.js
│       │   ├── habilidades.js
│       │   ├── racas.js
│       │   └── subracas.js
│       └── models/                     # Modelos de classes do projeto
│           ├── Classe.js
│           ├── GeradorAtributos.js
│           ├── GeradorNome.js
│           ├── Personagem.js
│           ├── Raca.js
│           └── SubRaca.js
```
