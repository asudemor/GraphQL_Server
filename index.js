// Konsol üzerinden paketlerimizi yüklüyoruz '> npm install apollo-server graphql ' daha sonra projeye dahil ediyoruz
const { ApolloServer, gql } = require('apollo-server');

const  { nanoid }  = require ('nanoid')

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

  type DeleteAllUser {
    count: Int,
    deleted_users: [User]!
  }

 # Veri Girişlerini oluşturalım
  input InputCreateUser {
    username: String!,
    email: String!
  },
  input InputUpdateUser {
    username: String,
    email: String
  }
 
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

  type Mutation{
    # User Mutations
    createUser( data: InputCreateUser!): User!
    updateUser( id: ID!, data: InputUpdateUser!): User!
    deleteUser(id: ID!): User!
    deleteAllUSer: DeleteAllUser!

    # Gereksiz uzayacağı için user dışındakileri yapmamaya karar verdim :/
  }

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

  Mutation: {
    // User Mutations
    createUser: (parent, {data:{username,email}}) => {
      // Eğer daha önce girilen mail'e ait kullanıcı yoksa kullancıyı oluşturacak var ise hata mesajı yollayacak
      const user = users.find(user => user.email == email)
      if(!user){
        const newUser ={
          id: nanoid(),
          email,
          username
        }
        users.push(newUser)
        return newUser
      }
      throw new Error('Kulllanıcı zaten kayıtlı')
    },
    updateUser: (parent, {id, data}) => {
      // Eğer grilen id'de bir kullancı varsa id hariç diğer bilgileri argümanlardan alır.
      const user_index = users.findIndex(user => user.id == id)
      if(user_index === -1) throw new Error('User not found')
      const updated_user = ( users[user_index] = {
        ...users[user_index],
        ...data,
      });
      return updated_user
    },
    deleteUser: (parent, {id}) =>{
      // Eğer girilne id'de değer mevcut ise o değerin içindeki verileri boşaltır.
      const user_index = users.findIndex(user => user.id == id)
      if(user_index === -1) throw new Error('User not found')
      const deletedUser = users[user_index]
      users.splice(user_index, 1)
      return deletedUser;
    },
    deleteAllUSer: () => {
      // kullanıcılar dizinini sıfırdan başlayarak dizinin uzunluğuna göre boşaltır. Silinene toplam kullancıyı sayısını ve sililen kullancıcıları ekrana döndürür 
      const count = users.length;
      const deleted_users = []
      deleted_users.push(...users);  

      users.splice(0, users.length)
      return {
        deleted_users,
        count
      }
    },


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
