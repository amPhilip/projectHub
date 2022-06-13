//const { projects, clients } = require("../exampledata.js");
const Client = require("../Models/Client.js")
const Project = require("../Models/Project.js")
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull
} = require("graphql");

//Project Type
const ProjectType = new GraphQLObjectType({
  name: "Project",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    status: { type: GraphQLString },

    //adding a relationship between projects and clients
    client: {
      type: ClientType,
      resolve(parent, args) {
        //return clients.find((client) => client.id === parent.clientId);
        return Client.findById(parent.clientId);
      },
    },
  }),
});

//Client Type
const ClientType = new GraphQLObjectType({
  name: "Client",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    email: { type: GraphQLString },
    phone: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    //project
    projects: {
        type: new GraphQLList(ProjectType),
        resolve(parent, args) {
          //return projects;
          return Project.find();
        },
      },
      project: {
        type: ProjectType,
        args: { id: { type: GraphQLID } },
        resolve(parent, args) {
          //return projects.find((project) => project.id === args.id); 
          return Project.findById(args.id)
        },
      },
    //client
    clients: {
      type: new GraphQLList(ClientType),
      resolve(parent, args) {
        //return clients;
        return Client.find();
      },
    },
    client: {
      type: ClientType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
       // return clients.find((client) => client.id === args.id); //data from client
       return Client.findById(args.id)
      },
    },
  },
});


//MUTATIONS
const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        //ADD CLIENT
        addClient:{
            type:ClientType,
            args:{
                name:{type: GraphQLNonNull(GraphQLString)},
                email:{type: GraphQLNonNull(GraphQLString)},
                phone:{type: GraphQLNonNull(GraphQLString)},
            },
            resolve(parent,args){
                const client = new Client({
                    name:args.name,
                    email:args.email,
                    phone:args.phone,
                });
                return client.save();
            }
        }
    }
})







module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation
});
