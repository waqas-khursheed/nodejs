export default (models) => {
  models.User.hasMany(models.ResetPasswordCode, {
    foreignKey: "user_id",
    as: "resetPasswordCodes",
    onDelete: "CASCADE",
  });

  models.ResetPasswordCode.belongsTo(models.User, {
    foreignKey: "user_id",
    as: "user",
  });
};