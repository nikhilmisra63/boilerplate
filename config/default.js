module.exports = {
  db: {
    database: "boilerplate-default",
    setting: {
      host: "localhost",
      dialect: "mysql",
      pool: {
        max: 1000,
        min: 0,
        idle: 10000,
        acquire: 10000
      },
      dialectOptions: {
        supportBigNumbers: true,
        bigNumbersStrings: true
      },
      replication: {
        read: [{ host: "localhost", username: "root", password: "pendrive" }],
        write: { host: "localhost", username: "root", password: "pendrive" }
      },
      logging: console.log
    }
  },
  port: 3005,
  accessTokenLifetime: 86400, // 1 hour
  refreshTokenLifetime: 2592000, // 1 month
  accessTokenLength: 64
};
