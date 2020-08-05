------- README Under Progress -------

# GraphQL Interface For Querying Reactome Data

## PART - A: Project Setup

### 0. Install essentials
A. Install Docker (https://docs.docker.com/get-docker/) 

B. Install NodeJS (https://nodejs.org/en/download/)

### 1. Get Reactome's Neo4j database running

Execute docker command:

```
docker run -p 7687:7687 -p 7474:7474 -e NEO4J_dbms_allow__upgrade=true -v $(pwd)/graph.db:/var/lib/neo4j/data/databases/graph.db neo4j:3.5.17
```

**Note:**

A. It is recommended to open the Neo4j database link in incognito mode to avoid cache problems

B. Default ```username = neo4j``` and ```password = neo4j```

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


## PART - B: Project Details

### Description:
Reactome currently uses REST-based API for its backend implementation that allows end-users to obtain specific data from a set of predefined static end-points. To provide better flexibility and allow users to query whatever data they need, Reactome's backend architecture needs to be implemented by GraphQL endpoint that will fetch data from Neo4j database.

### Tools Used:
1. GraphQL (https://graphql.org/)
2. JavaScript (https://developer.mozilla.org/en-US/docs/Web/JavaScript)
3. NodeJS (https://nodejs.org/en/)
4. Neo4j Database (https://neo4j.com/)

### GraphQL Entrypoints:
There are three entrypoints in within GraphQL playground to query the data from Neo4j database and they are:
1. Reaction 
2. Pathway 
3. Protein 

![Entrypoints](Readme-Assets/entrypoints.png)

Currently, Reaction and Pathway entrypoints take single argument i.e. dbId and, Protein takes two arguments i.e. value and ValueType to query data.

Example GraphQL Queries:

**Reaction:**
```
{
  Reaction(dbId: 482621) {
    schemaClass
    name
    dbTypes
    releaseDate
    displayName
  }
}
```

**Pathway:**
```
{
  Pathway(dbId: 109581) {
    dbId
    isInDisease
    displayName
    stId
    speciesName
  }
}
```

**Protein:**
```
{
  Protein(value: "109581", valueType: DB_ID) {
    dbId
    isInDisease
    displayName
    stId
    speciesName
    systematicName
  }
}
```

### Accessing non-entrypoint classes from within entrypoint classes
The non-entrypoint classes can be accessed by using sub-queries within entrypoint classes. Lets consider few cases.

**Case 1:** Accessing ```Reference Entity``` class from ```Protein``` class
```
{
  Protein(value: "109581", valueType: DB_ID) {
    dbId
    displayName
    stId
    speciesName
    referenceEntity {
      dbId
      dbTypes
      name
    }
  }
}
```

**Case 2:** Accessing ```Catalyst``` class from ```Reaction``` class
```
{
  Protein(value: "109581", valueType: DB_ID) {
    dbId
    displayName
    stId
    speciesName
    referenceEntity {
      dbId
      dbTypes
      name
    }
  }
}
```

**Case 3:** Accessing ```Physical Entity``` class from ```Reaction``` class
```
{
  Reaction(dbId: 482621) {
    dbTypes
    schemaClass
    name
    input {
      name
      displayName
    }
    output {
      name
      displayName
    }
  }
}
```


It is recommended to make extensive use of docs and/or schema panel in the right section of GraphQL playground to learn more about which properties are permitted to query from a particular schema class type or sub-query.

![Entrypoints](Readme-Assets/schemapanel.png)


### Abstract and Concrete classes using Interfaces and Types respectively
Reactome database is hierarchical in nature. The top level classes are abstract whereas bottom-most level concrete. Thus, top-level classes are defined as ```Interface``` and others as ```Type```.

**What is an Interface?** 

Like many type systems, GraphQL supports interfaces. An Interface is an abstract type that includes a certain set of fields that a type must include to implement the interface. 

(Learn more about Interface here -> https://graphql.org/learn/schema/#interfaces)

Currently, there are three main Interfaces in GraphQL schema and their corresponding Type sub-classes are as follows:

1. **PhysicalEntity** 
   - Complex
   - Drug
   - Set
   - GenomeEncodedEntity
   - EntityWithAccessionedSequence
   - OtherEntity
   - Polymer
   - SimpleEntity
   - Protein

2. **Event** 
   - Reaction
   - Pathway

3. **ReferenceEntity** 
   - ReferenceGeneProduct
   - ReferenceMolecule 



**Querying using GraphQL inline-fragments:**

**Case 1:** Accessing ```hasEvent``` relation on ```Pathway``` class
```
{
  Pathway(dbId: 109581) {
    hasEvent {
      schemaClass
      speciesName
      name
      ... on Pathway {
        hasEvent {
          schemaClass
          speciesName
          name
        }
      }
    }
  }
}
```

**Case 2:** Accessing ```Members``` class on ```Set``` class
```
{
  Reaction(dbId: 482621) {
    dbTypes
    schemaClass
    stId
    input {
      name
      ... on Set {
        members {
          name
        }
      }
    }
  }
}
```




