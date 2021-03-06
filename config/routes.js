const router          = require('express').Router();
const users           = require('../controllers/users');
const groups          = require('../controllers/groups');
const authentications = require('../controllers/authentications');

router.route('/register')
.post(authentications.register);
router.route('/login')
.post(authentications.login);

router.route('/users')
.get(users.index)
.post(users.create);

router.route('/users/:id')
.get(users.show)
.put(users.update)
.delete(users.delete);

router.route('/groups')
.get(groups.index)
.post(groups.create);

router.route('/groups/:id')
.get(groups.show)
.put(groups.update)
.delete(groups.delete);

router.route('/groups/:id/join')
.get(groups.join);

router.route('/groups/:id/leave')
.get(groups.leave);

module.exports = router;
