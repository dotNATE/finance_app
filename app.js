const express = require('express');
const { json } = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

const records = [];

app.use(json());

app.use('/graphql', graphqlHTTP({
    schema: buildSchema(`    
        type Record {
            _id: ID!
            date: String!
            assets: [String!]!
        }

        input RecordInput {
            date: String!
            assets: [String!]!
        }

        type RootQuery {
            records: [Record!]!
        }

        type RootMutation {
            createRecord(recordInput: RecordInput): Record
        }
    
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        records: () => {
            return records;
        },
        createRecord: (args) => {
            const record = {
                _id: Math.random().toString(),
                date: args.recordInput.date,
                assets: args.recordInput.assets,
            };
            
            records.push(record);

            return record
        }
    },
    graphiql: true,
}));

app.listen(3000);