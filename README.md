# RECIPE APP - REACT NATIVE - EXPO

Bem-vindo ao **Recipe App**, um aplicativo demonstrativo desenvolvido com **React Native** usando o framework **Expo**. O objetivo deste projeto é consumir a API pública **TheMealDB** para listar, buscar e visualizar receitas de diferentes categorias.

Este projeto foi desenvolvido por **Leonel Mendes** e **[Nome do segundo desenvolvedor]**, como parte de um trabalho colaborativo em ambiente educacional.

![Platform](https://img.shields.io/badge/platform-ReactNative-blue.svg)
![Framework](https://img.shields.io/badge/framework-Expo-green.svg)  
![API](https://img.shields.io/badge/api-TheMealDB-red.svg)  

---

## **Índice**

- [Visão geral](#visão-geral)
- [Recursos](#recursos)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação](#instalação)
  - [Pré-requisitos](#pré-requisitos)
  - [Rodando o Projeto](#rodando-o-projeto)
- [Serviços de API](#serviços-de-api)
- [Exemplo de Consumo da API](#exemplo-de-consumo-da-api)
- [Contactos](#contactos)

---

## **Visão Geral**

Este app permite que usuários explorem receitas com base em categorias, nomes ou ingredientes. Ele utiliza a **TheMealDB API**, oferecendo uma interface bonita, responsiva e intuitiva.

O app possui telas de navegação com abas (home, receitas, perfil) e foi pensado para uso pessoal ou estudo.

---

## **Recursos**

- **Listagem de Receitas**: por categoria, ou todas
- **Busca por Nome**: filtragem em tempo real
- **Detalhes da Receita**: visualização de ingredientes e instruções
- **Perfil de Usuário**: com estatísticas e favoritos
- **Estilo Moderno**: inspirado em apps de culinária atuais

---

## **Estrutura do Projeto**

```plaintext
src
├── app/                  # Telas e navegação
│   ├── screens/          # HomeScreen, RecipeScreen, ProfileScreen
│   └── services/         # Integração com TheMealDB
├── assets/               # Imagens e ícones
├── components/           # Componentes reutilizáveis
├── constants/            # Cores e estilos globais
├── App.tsx               # Entry Point
└── app.json              # Configuração do Expo
```

---

## **Instalação**

### **Pré-requisitos**

- Node.js
- Expo CLI (`npm install -g expo-cli`)
- Editor de código (VSCode recomendado)

### **Rodando o Projeto**

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/recipe-app.git
cd recipe-app
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor Expo:
```bash
npx expo start
```

4. Escaneie o QR Code com o app **Expo Go** ou execute no emulador.

---

## **Serviços de API**

O app utiliza a TheMealDB. Exemplos de endpoints usados:

- **Todas as Refeições**:
```ts
GET https://www.themealdb.com/api/json/v1/1/search.php?s=
```

- **Por Categoria**:
```ts
GET https://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood
```

- **Detalhes da Refeição**:
```ts
GET https://www.themealdb.com/api/json/v1/1/lookup.php?i=MEAL_ID
```

- **Busca por Nome**:
```ts
GET https://www.themealdb.com/api/json/v1/1/search.php?s=lasagna
```

---

## **Exemplo de Consumo da API**

```ts
import { useEffect, useState } from 'react';
import { getAllMeals } from '../services/mealApi';

useEffect(() => {
  const fetchMeals = async () => {
    const data = await getAllMeals();
    setMeals(data);
  };

  fetchMeals();
}, []);
```

---

## **Contactos**

Se você tiver alguma dúvida, feedback ou sugestão:

- **Email**: [leonel.francisco@my.istec.pt](mailto:leonel.francisco@my.istec.pt)
- **Telefone**: [+351929393928](tel:+351929393928)
- **Twitter**: [@lionelmendes_](https://x.com/lionelmendes_)

Fique à vontade para contribuir, relatar problemas ou enviar melhorias. Seu feedback é muito importante! 🙌
