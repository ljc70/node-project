var router = require('koa-router')();
var user_controller = require('../app/controllers/user');

router.prefix('/projects/users')

router.post('/registerUser', user_controller.registerUser);

module.exports = router;
