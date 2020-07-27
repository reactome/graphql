--- README Doc Under Progress ---

# GraphQL Interface For Querying Reactome Data

## Quick Start

Install dependencies:

```
npm install
```

Start the GraphQL service:

1. Development mode:-

```
npm run start:dev
```

2. Production mode:-

```
npm start
```

This will start the GraphQL service (http://0.0.0.0:4001/graphql) where you can issue GraphQL requests by accessing GraphQL Playground in the browser.
(Preferably use incognito mode to query the database to avoid any cache problems)

![GraphQL Playground](Readme-Assets/1.png)

## Configure

Set your Neo4j connection string and credentials in `.env`. For example:

_.env_

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=reactome
```
