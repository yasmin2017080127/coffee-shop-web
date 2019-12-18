const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');
// Welcome Pag
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.post("/delete", (req, res) => {
  const deleteItem = req.body.id;
  User.findByIdAndDelete(deleteItem, (err) => {
    if (!err) {
      console.log("Successfully deleted");
      console.log(deleteItem);
      
      res.redirect("/users/login");
    } else {
      console.log(err);
    }
  });
});
module.exports = router;
