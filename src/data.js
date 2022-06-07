const users = [
  {
    id: '1',
    full_name: 'Perle Banet',
    age: 22,
    profile_photo: 'https://randomuser.me/api/portraits/thumb/men/89.jpg'
  },
  {
    id: '2',
    full_name: 'Bernardine Tyler',
    age: 42,
    profile_photo: 'https://randomuser.me/api/portraits/thumb/men/81.jpg'
  },
];

const posts = [
  {
    id: '1',
    title: 'Return, The',
    description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi maxime ab qui ullam pariatur. Nam a dolore doloremque dolor nemo,Lorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, ab iure quod pariatur ea aperiam quos quo placeat! Corporis, inventore! Id error cumque nostrum natus culpa voluptates esse neque ex eligendi corrupti nam dolor, velit nesciunt amet cum accusantium et, tempora ut minima earum voluptatem sapiente nulla aut maiores. Minus? Amet a quia eveniet sit dolore laudantium obcaecati dignissimos velit, qui provident porro tempore sed maiores autem recusandae facere rerum aspernatur! Vitae amet iure accusantium nam consequatur quos commodi magnam!',
    short_description: ' Lorem ipsum dolor sit amet consectetur adipisicing elum dolor sit amet consectetur adipisicing elit. on. Molesit. on. Molestiae, cum nihil. ',
    user_id: '1',
    cover: 'https://i.picsum.photos/id/1004/1280/720.jpg?hmac=nUecTZQlTl9WifsWVR_dCF7yUEx5Jz3jgYpYjbCXh2E'
  },
  {
    id: '2',
    title: 'Bullet for Joey, A',
    description: 'Lorem ipsum  dolor Lorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, abLorem ipsum  dolor sit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, absit amet consectetur adipisicing elit. A corporis incidunt temporibus explicabo officia laudantium. Ad est totam modi nulla perferendis, ab facilis, itaque error aspernatur incidunt enim aliquid sit.',
    short_description: ' Lorem ipsum dolor sit amet consecteturum dolor sit amet consectetur adipisicing elit. on. Moles um dolor sit amet consectetur adipisicing elit. on. Moles adipisicing elit. on. Molestiae, cum nihil. ',
    user_id: '1',
    cover: 'https://i.picsum.photos/id/721/1280/720.jpg?hmac=PoPYPJ147dbwVMxxnctPuO9PtHkTVsQf_r9_3jFvy3o'
  },
  {
    id: '3',
    title: 'Ten Inch Hero',
    short_description: ' Lorem ipsumoriosi veritatis obcaecati non placeat? Atque fuga impedit molestiae amet officia ted non. Molestiae, cum nihil. ',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore,Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur voluptates, deleniti fuga in, odit libero quisquam architecto dolore, ab magni eos eum. Distinctio veniam amet illo maxime magnam? Praesentium, ex?' ,
    user_id: '2',
    cover: 'https://i.picsum.photos/id/269/1280/720.jpg?hmac=J1KYh3jJVuy38lvr9SH19x_FDx5roRu23YChcRd134Y'
  },
];

const comments = [
  {
    id: '1',
    text: 'comment Lorem 1',
    post_id: '1',
    user_id: '2'
  },
  {
    id: '2',
    text: 'Ipsum lorem 2',
    post_id: '1',
    user_id: '1'
  },
  {
    id: '3',
    text: 'Dolor sit Amet 3',
    post_id: '2',
    user_id: '1'
  },
  {
    id: '4',
    text: 'Foo bar 4',
    post_id: '3',
    user_id: '2'
  },
  {
    id: '5',
    text: 'Foo bar 5',
    post_id: '3',
    user_id: '2'
  },
  {
    id: '6',
    text: 'Foo bar 6',
    post_id: '1',
    user_id: '2'
  },
  {
    id: '7',
    text: 'Foo bar 7',
    post_id: '2',
    user_id: '2'
  },
  {
    id: '8',
    text: 'Foo bar 8',
    post_id: '1',
    user_id: '2'
  },
];

module.exports = { users, posts, comments }