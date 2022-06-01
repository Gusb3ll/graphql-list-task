# graphql-list-task

List & Task application built with:

- Express
- ApolloServer
- TypeGraphQL
- Prisma
- TypeScript 💪

## Setup

Install dependencies:

```bash
git clone https:/github.com/gusb3/graphql-list-task
cd graphql-list-task

yarn install
```

Create .env file with the following content:

```bash
  NODE_ENV= # your environment (development, production)
  DATABASE_URL= # your mysql database url (example: mysql://user:password@host:port/database)
```

## Development

Run the development command

```bash
yarn dev
```

Express server will be running at ```localhost:3333``` and you can query the grahpql server using Apollo Server Explorer at ```localhost:3333/graphql```

[Query & Mutation collection](https://studio.apollographql.com/graph/My-Graph-grk1ml/explorer?collectionId=1e873094-cf5a-4b14-99bb-e6208557bf3c&focusCollectionId=1e873094-cf5a-4b14-99bb-e6208557bf3c&overlay=view-collection-details&variant=current)

Testing

```bash
# Make sure you have your 'test' database setup live

yarn test
```

## Production

Built & Start the application

```bash
yarn build

yarn start
```

Production server will be running at localhost:3333
