# GraphQL Interface For Querying Reactome Data

## Quick Start

### 0. Install essentials
A. Install Docker (https://docs.docker.com/get-docker/)
B. Install NodeJS (https://nodejs.org/en/download/)

### 1. Get Reactome's Neo4j database running

Execute docker command:

```
docker run -p 7687:7687 -p 7474:7474 -e NEO4J_dbms_allow__upgrade=true -v $(pwd)/graph.db:/var/lib/neo4j/data/databases/graph.db neo4j:3.5.17
```

Note:
A. It is recommended to open the Neo4j database link in incognito mode to avoid cache problems
B. Default username = neo4j and password = neo4j
C. Set and remember new password (which will be required in step 3)

### 2. Clone/Download project files and install dependencies

```
npm install
```

### 3. Configure credentials

Set your Neo4j connection string and credentials in `.env` file. For example:

```
NEO4J_URI=bolt://localhost:7687
NEO4J_USER=neo4j
NEO4J_PASSWORD=reactome
```

### 4. Start the GraphQL service

a. Development mode:-

```
npm run start:dev
```

b. Production mode:-

```
npm start
```

This will start the GraphQL service (http://0.0.0.0:4001/graphql) where you can issue GraphQL requests by accessing GraphQL Playground in the browser.

![GraphQL Playground](Readme-Assets/1.png)