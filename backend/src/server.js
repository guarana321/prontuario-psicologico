const app = require("./app");
const { sequelize } = require("./app/models");

const PORT = process.env.PORT || 3333;

// In production (Render), just verify connection — tables were already created via init-neon script.
// In development, use alter to keep schema in sync.
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection OK.");

    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log("Database synced (dev mode).");
    }

    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err.message);
    process.exit(1);
  }
}

startServer();
