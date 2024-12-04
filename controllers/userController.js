const controller = {};
const models = require("../models");
const {where} = require("sequelize");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.addUser = async (req, res) => {
  const {firstName, lastName, username, mobile, isAdmin} = req.body;
  try {
    await models.User.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: !!isAdmin,
    });
    res.redirect("/users");
  } catch (e){
    console.error(e);
  }

}

controller.editUser = async (req, res) => {
  const {id, firstName, lastName, mobile, isAdmin} = req.body;
  try {
    await models.User.update({
      firstName,
      lastName,
      mobile,
      isAdmin: !!isAdmin,
    },
        {where: {id}}
    );
    res.send("User updated.");
  } catch (e){
    console.error(e);
    res.status(500).send("Can't update user.");
  }
}

controller.deleteUser = async (req, res) => {
  const id = isNaN(req.params.id) ? 0 : parseInt(req.params.id);
  try {
    await models.User.destroy({where: {id}});
    res.send("User deleted.");
  } catch (e){
    console.error(e);
    res.status(500).send("Can't delete user.");
  }
}

module.exports = controller;
