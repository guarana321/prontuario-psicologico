const app = require("./app");
const { sequelize } = require("./app/models");

const PORT = process.env.PORT || 3333;

// Sync DB tables on start (safe - won't delete data)
sequelize.sync({ alter: true })
  .then(() => {
    console.log("Database synced.");
    app.listen(PORT, () => console.log(`Server is on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to sync database:", err.message);
    process.exit(1);
  });
