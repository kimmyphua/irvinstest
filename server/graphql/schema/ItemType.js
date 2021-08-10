const graphql = require("graphql");
const { GraphQLObjectType, GraphQLFloat, GraphQLString, GraphQLList} = graphql;

const ItemType = new GraphQLObjectType({
  name: "Item",
  fields: () => ({
    _id: { type: GraphQLString },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLFloat },
    image: { type: GraphQLString },
    tags: {type: GraphQLString},
  }),
});

module.exports = ItemType;