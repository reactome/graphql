--- README Doc Under Progress ---

# GraphQL Interface For Querying Reactome Data

## Quick Start

### Get Reactome's Neo4j database running

Execute docker command:

```
docker run -p 7687:7687 -p 7474:7474 -e NEO4J_dbms_allow__upgrade=true -v $(pwd)/graph.db:/var/lib/neo4j/data/databases/graph.db neo4j:3.5.17
```
(It is recommended to open the Neo4j database link in incognito mode to avoid cache problems).

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

![GraphQL Playground](Readme-Assets/1.png)

## Configure

Set your Neo4j connection string and credentials in `.env`. For example:

_.env_

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=reactome
```
