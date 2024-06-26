# GraphQL для взрослых: как не влипнуть в молодежные фреймворки и внедрить технологию в старый проект

![image](./pic.jpg)

**GraphQL** сейчас на хайпе. Модные фреймворки, доклады о том, как GraphQL помогает и ускоряет разработку. Но что делать, если проекту много лет, стек устарел, а вам все-таки нужен **GraphQL**?

Внедрение фреймворка **Relay**, **Apollo** или **URQL** занимает много времени. Например, синхронизация Apollo c Redux звучит, как плохая идея. Во время доклада расскажу, как внедрить **GraphQL** и получить все модные «плюшки» фреймворков: автокомплит, типизацию, кодогенерацию, линтинг и документацию, не сломав все на своем пути.

- [GraphQL для взрослых: как не влипнуть в молодежные фреймворки и внедрить технологию в старый проект](#graphql-для-взрослых-как-не-влипнуть-в-молодежные-фреймворки-и-внедрить-технологию-в-старый-проект)
  - [Запуск проекта](#запуск-проекта)
  - [Запуск тестов](#запуск-тестов)
  - [Режим отладки](#режим-отладки)
  - [Проверка](#проверка)
  - [Env variables](#env-variables)
  - [Пару слов о коде](#пару-слов-о-коде)
    - [01. Клиент](#01-клиент)
    - [02. Плейграунд](#02-плейграунд)
      - [Запуск плейграунда](#запуск-плейграунда)
    - [03. Кодогенерация](#03-кодогенерация)
      - [Генерация](#генерация)
      - [Сборка плагина](#сборка-плагина)
    - [04. Тесты](#04-тесты)
      - [Запуск тестов](#запуск-тестов-1)
  - [Фиксация договоренностей](#фиксация-договоренностей)
    - [Eslint](#eslint)
      - [Запуск линтинга](#запуск-линтинга)
  - [Материал](#материал)

## Запуск проекта

```bash
yarn start
```

## Запуск тестов

```bash
yarn test
```

## Режим отладки

```bash
yarn graphql:generate-debug

yarn graphql:generate-debug-watch
```

## Проверка

```bash
yarn lint
```

## Env variables

[Файл с переменными](.env)

```bash
GRAPHQL_ENDPOINT=https://rickandmortyapi.com/graphql
```

## Пару слов о коде

В этом репозитории собраны 4 шага, которые можно повторить на своем проекте. Каждый шаг отвязан от фреймворка и библиотек.

Для демонстрации в коде специально используется нативная среда. Максимальная концентрация на технологии `GraphQL`.

Рассматривайте этот репозиторий как starter-kit.

Пару примеров:

1. Дорого внедрять фреймворк в старый проект? Посмотрите доклад и повторите 4 шага.

2. На проекте есть `apollo`, но не устраивает кодогенерация, то возьмите пример плагина и дополните свой проект удобной вам реализацией.

### 01. Клиент

http клиент для выполнения запросов к GraphQL
серверу:

- [Types](./client/types.ts)
- [Request](./client/request.ts)
- [Fetcher](./client/fetcher.ts)

### 02. Плейграунд

Онлайн редактор для вашего GraphQL сервера - с навигацией
по схеме и возможностью выполнить запросы реалтайм

[GraphiQL](https://github.com/graphql/graphiql)

[Playground](./playground/index.html)

#### Запуск плейграунда

```bash
yarn graphql:playground
```

### 03. Кодогенерация

Избавляемся от рутины и генерируем код на лету.

- [Получение схемы](./scripts/schema/schema.ts)
- [Плагин](./scripts/bootstrap-generate/index.ts)
- [Плагин: visitor](./scripts/bootstrap-generate/visitor.ts)
- [Плагин: конфиг](./scripts/bootstrap-generate/types.ts)
- [Интерфейс template build](./scripts/bootstrap-generate/template/types.ts)
- [Шаблон для генерации **fetch**](./scripts/bootstrap-generate/template/defaultTemplateBuild.ts)
- [Шаблон для генерации **mock**](./scripts/bootstrap-generate/template/defaultTemplateMockBuild.ts)
- [Шаблон для генерации **hook**](./scripts/bootstrap-generate/template/defaultTemplateReactQueryHook.ts)
- [Объявление конфигурации плагина](./.graphqlrc.yml#L35)

#### Генерация

```bash
// schema
yarn graphql:schema

// generate
yarn graphql:generate

// watch
yarn graphql:generate-watch

// debug
yarn graphql:generate-debug
```

#### Сборка плагина

```bash

yarn build-plugin

```

### 04. Тесты

В примерах использую раннер тестов `vitest`, альтернативный
пакет `jest`

- [Мок сети](./src/api/tests/createMockRequest.ts)
- [Генерация мока на graphql запрос](./scripts/bootstrap-generate/template/defaultTemplateMockBuild.ts)
- [Пример react компонента](./src/app/components/__tests__/episodes.test.tsx)

⚠️ В файле [createMockRequest.ts](./src/api/tests/createMockRequest.ts) используется нативный fetch из `nodejs` 18 версии и старше.

Альтернативные библиотеки для мок сети можно посмотреть [тут](./links.md#network-layer-🌏)

#### Запуск тестов

```bash
yarn test
```

## Фиксация договоренностей

✅ Операции и фрагменты только в файлах

✅ Для компонентов используем только фрагменты

❌ Не пишем запросы во вью слое, не собираем template literals запросы

### Eslint

- [Rules](./.eslintrc.json)

#### Запуск линтинга

```bash
yarn lint
```

## Материал

Все ссылки на материал, который был в докладе, и сама презентация

- [Презентация](https://docs.google.com/presentation/d/1K7FBa-NrWeqGlUsXOHlxNCjxT9bUV_Tp/edit?usp=drive_link&ouid=114002188979982635975&rtpof=true&sd=true)
- [Ссылки на все ссылки](./links.md)
