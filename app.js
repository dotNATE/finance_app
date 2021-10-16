const express = require('express');
const { json } = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`
        type RootQuery {
            records: [String!]!
        }

        type RootMutation {
            createRecord(name: String): String
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        records: () => {
            return ['january', 'february', 'march'];
        },
        createRecord: (args) => {
            const recordName = args.name;

            return recordName;
        }
    },
    graphiql: true,
}));

app.listen(3000);