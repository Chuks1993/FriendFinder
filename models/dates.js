module.exports = function(sequelize, DataTypes) {
    var Date = sequelize.define("Date", {
      // Giving the Date model a name of type STRING
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      photo: DataTypes.STRING,
      type: DataTypes.STRING,
      tier: DataTypes.INTEGER,
      quote: DataTypes.STRING
    });
  
    return Date;
  };