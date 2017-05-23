const pg = require("pg");
const settings = require("./settings"); // settings.json
const name = process.argv[2];

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log('Searching ...');
  client.query("SELECT * FROM famous_people WHERE (first_name = $1 OR last_name = $1)", [name], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    formatResults(result.rows);

    client.end();
  });
});

const formatResults = function(result) {
  console.log(`Found ${result.length} person(s) by the name '${name}'`)
  for (i=0; i<result.length; i++) {
    console.log (`- ${(i+1)} ${result[i].first_name} ${result[i].last_name}, born '${result[i].birthdate.toString().split(' ').slice(0, 4).join(' ')}'`);
  }
};