const router = require('koa-router')();
const list_controller = require('../app/controllers/list');

router.prefix('/projects')

router.post('/createListItem', list_controller.createListItem);
router.get('/findList', list_controller.findList);
router.post('/changeListItem', list_controller.changeListItem);
router.post('/deleteListItem', list_controller.deleteListItem);

module.exports = router;