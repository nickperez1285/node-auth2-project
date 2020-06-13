<<<<<<< HEAD
exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'test', password:'test'},
      
      ]);
};

=======

exports.seed = function(knex) {
      return knex('users').insert([
        {username: 'test', password:'testy', department:'testers'},
      
      ]);
};
>>>>>>> 4f1177536def50bbac20829c5bf5a44fc388e49c
