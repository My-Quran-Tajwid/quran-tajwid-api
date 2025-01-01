const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/sequelize');

const HafsWord = sequelize.define('HafsWord', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Sura: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    Verse: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    PageNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    LineNo: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    WordNum: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    WordText: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    FontName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    FontCode: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    Type: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    FontUniCode: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'Hafs_Word',
    timestamps: false,
});

module.exports = HafsWord;
