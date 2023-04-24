module.exports = (sequelize, DataTypes) => {
    const Agence = sequelize.define("agence", {
        nom: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING
        },
    });

    return Agence;
}