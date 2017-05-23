const settings = require("./settings");
const firstName = process.argv[2];
const lastName = process.argv[3];
const date = process.argv[4];

var pg = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  },
  searchPath: 'knex,public'
});

pg('famous_people')
  .insert({first_name: firstName,
           last_name: lastName,
           birthdate: date})
  .then(function(){ console.log(`Added ${firstName} ${lastName} ${date}`); });
pg.destroy();