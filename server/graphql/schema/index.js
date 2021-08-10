const graphql = require("graphql");
require('../../lib/mongodb')
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLFloat,
  GraphQLString,
  GraphQLList,
} = graphql;
const itemData = require("../../models/item.model")
const MessageType = require("./MessageType")
const ItemType = require("./ItemType");

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    getAllItems: {
      type: new GraphQLList(ItemType),
      args: { _id: { type: GraphQLString } },
      resolve(parent, args) {
        return itemData.find()
        .then(u => {
            return u.map(el=> {
                return { ...el._doc, _id: el.id, tags: el.tags.join(",")}
            })
            })
            .catch(err => {
                throw err
            })
        }
      },
    },
  },
);

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createItem: {
      type: ItemType,
      args: {
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        image: { type: GraphQLString },
        tags: { type: GraphQLString },
      
      },
      resolve(parent, args) {
        const item = new itemData({
          
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            name: args.name,
            description: args.description,
            price: args.price,
            image: args.image,
            tags: args.tags.split(","),
        });
        return item
        .save()
        .then(result => {
            console.log(result);
            return { ...result._doc, _id: result._doc._id.toString(), tags: result.tags.toString()};
          })
          .catch(err => {
            console.log(err);
            throw err;
          });
      },
    },
    deleteItem: {
    type: MessageType,
    args: { _id: { type: GraphQLString } },
    
    async resolve(parent, args) {
        console.log(args)
        await itemData.findByIdAndDelete(args._id)
        return { successful: true, _id: args._id, message: "DELETE WORKED" };
      }
},
updateItem : {
    type: MessageType,
    args: {
        _id: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        price: { type: GraphQLFloat },
        image: { type: GraphQLString },
        tags: { type: GraphQLString },
    },
    async resolve(parent,args) {
        const item = {
          
            createdAt: args.createdAt,
            updatedAt: args.updatedAt,
            name: args.name,
            description: args.description,
            price: args.price,
            image: args.image,
            tags: args?.tags?.split(","),
        };
        await itemData.findByIdAndUpdate(args._id, item)
        return {successful: true, ...item._doc, message: "edit WORKED"}
    }
}





  },
});

module.exports = new GraphQLSchema({ query: RootQuery, mutation: Mutation });
