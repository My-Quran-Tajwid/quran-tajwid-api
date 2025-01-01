const { Sequelize } = require('sequelize');

console.log('Database user:', process.env.DATABASE_USER);


const sequelize = new Sequelize('quran_tajwid', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
        acquire: 30000,
    },
    dialectModule: require('mysql2'),
    logging: false, // Disable logging for cleaner output
});

// Test the connection
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

module.exports = { sequelize };
