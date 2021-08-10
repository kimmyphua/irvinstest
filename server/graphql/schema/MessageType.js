const graphql = require("graphql");
const { GraphQLObjectType, GraphQLBoolean, GraphQLString } = graphql;

const MessageType = new GraphQLObjectType({
  name: "Message",
  fields: () => ({
    successful: { type: GraphQLBoolean },
    message: { type: GraphQLString },
  }),
});
module.exports = MessageType;