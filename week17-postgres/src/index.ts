import { Client } from "pg";
const pgClient = new Client({
  user: "postgres",
  password: "admin",
  port: 5432,
  host: "localhost",
  database: "testingnew",
});
async function main() {
  await pgClient.connect();
  const response = await pgClient.query("Select * FROM users");
  console.log(response.rows);
}
main();
