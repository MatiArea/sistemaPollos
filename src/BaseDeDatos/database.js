import Sequelize from "sequelize";

var sequelize = null;

if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres         database
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres",
    port: 5432,
    host: "ec2-18-205-122-145.compute-1.amazonaws.com",
    logging: true, //false
  });
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize("pollos", "postgres", "matias", {
    host: "localhost",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      require: 30000,
      idle: 10000,
    },
    logging: false,
  });
}

export default sequelize;
