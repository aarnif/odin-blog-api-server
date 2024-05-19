import "dotenv/config";

const PORT = process.env.PORT;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const SESSION_SECRET = process.env.SESSION_SECRET;

export default { DATABASE_USERNAME, DATABASE_PASSWORD, SESSION_SECRET, PORT };
