// Konsol üzerinden paketlerimizi yüklüyoruz '> npm install apollo-server graphql ' daha sonra projeye dahil ediyoruz
const { ApolloServer, gql } = require('apollo-server');

// Şimdi data.json dosyasını projemize dahil edelim
const {events, locations, users, participants} = require('./data.json');

// Veri tiplerini hazırlayalım
const typeDefs = gql`
  type Event {
    id: ID!,
    title: String!,
    desc: String,
    date: String,
    from: String,
    to: String,
    location_id: String,
    location: [Location!]!
    user_id: ID,
    user: [User!]!
    participant: [Participant!]! 
  },

  type Location {
    id: ID!,
    name: String!,
    desc: String,
    lat: Float,
    lng: Float
  },

  type User {
    id: ID!,
    username: String!,
    email: String!
  },

  type Participant {
    id: ID!,
    user_id: ID!,
    event_id: ID!
    username: [User]
  },
 
 # Queryleri oluşturlım
  type Query {
    users:  [User]
    user(id: ID!):  [User]

    # Events 
    events:  [Event]
    event(id: ID!):  [Event]

    # Pariticipants
    participants: [Participant!]!
    participant(id: ID!): [Participant]

    # Locations
    locations: [Location!]!
    location(id: ID!): [Location]
  },

`;

// Daha sonra da yukarıdaki querylere karşılık gelecek cevapları yazalım
const resolvers = {
  Query: {
    //Users
    users: () => users,
    user: (parent, args) => users.filter(user => user.id == args.id),

    //Events 
    events: () => events,
    event: (parent, args) => events.filter(event => event.id == args.id),

    // Pariticipants
    participants:  () => participants,
    participant:  (parents,args) => participants.filter(item => item.id == args.id),

    // Locations
    locations: () => locations,
    location: (parents, args ) => locations.filter( location => location.id == args.id )
  },

  // Bu kısımda özel cevaplar oluşturdum
  Event: {
    user: (parent) => users.filter(user => user.id === parent.user_id),
    participant: (parent) => participants.filter(item => item.event_id === parent.id),
    location: (parent) => locations.filter ( location => location.id === parent.location_id)
  },

  Participant: {
    username: ( parent , args) => users.filter(user => user.id === parent.user_id)
  }
};

// Servere başlatmak için bu kodları yazalım
const server = new ApolloServer({ typeDefs, resolvers, csrfPrevention: true })
  .listen()
  .then(({ url }) => console.log('server started on ' + url));
