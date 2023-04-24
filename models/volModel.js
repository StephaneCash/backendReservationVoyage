module.exports = (sequelize, DataTypes) => {
    const Vol = sequelize.define("vol", {
        villeDest: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        villeDepart: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        heureDepart: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        heureArrivee: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        maxHeure: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        prix: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        url: {
            type: DataTypes.STRING
        },
        agence: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return Vol;
}