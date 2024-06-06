const app = require("./app");
const sequelize = require("./db/dbConnection");

const PORT = 5000 || process.env.PORT;

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

const start = async () => {
  try {
    sequelize.authenticate();
    console.log("Connected to the database");
    app.listen(PORT, () =>
      console.log(`Server up and running on port ${PORT}`)
    );
  } catch (error) {
    console.log("An error occurred while connecting to the database");
  }
};

start();
