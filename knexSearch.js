const settings = require("./settings");
const name = process.argv[2];

var pg = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

pg.select().where('first_name', name).orWhere('last_name', name).from('famous_people').asCallback(function (err, rows) {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  formatResults(rows);
});

const formatResults = function(result) {
  console.log(`Found ${result.length} person(s) by the name '${name}'`);
  for (i = 0; i < result.length; i ++) {
    console.log(`- ${(i + 1)} ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate.toString().split(' ').slice(0, 4).join(' ')}'`);
  }
};
pg.destroy();