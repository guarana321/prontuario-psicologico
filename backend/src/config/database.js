module.exports = {
  development: {
    username: "postgres",
    password: "postgres",
    database: "prontuario1",
    host: "localhost",
    dialect: "postgres",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
