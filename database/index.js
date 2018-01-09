const config = require('../config');
// const knex = require('knex')({
//   client: 'pg',
//   connection: {
//     database: 'airhnr'
//   }
// });
// const bookshelf = require('bookshelf')(knex);

Bookshelf.conn.knex.schema.createTable('users', function (user) {
  user.string('username');
  user.string('firstName');
  user.string('lastName');
  
}


var User = bookshelf.Model.extend({
  tableName: 'users',

  posts: function () {
    return this.hasMany(Posts);
  }
});

var Posts = bookshelf.Model.extend({
  tableName: 'messages',
  tags: function () {
    return this.belongsToMany(Tag);
  }
});

var Tag = bookshelf.Model.extend({
  tableName: 'tags'
})

User.where('id', 1).fetch({ withRelated: ['posts.tags'] }).then(function (user) {
  console.log(user.related('posts').toJSON());
}).catch(function (err) {
  console.error(err);
});