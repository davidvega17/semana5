const routerx = require('express-promise-router');
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

const router = routerx();


router.post('/login', userController.login);
router.post('/add',userController.add);
router.put('/update', auth.verifyUsuario, userController.update);
router.put('/activate', auth.verifyUsuario, userController.activate);
router.put('/deactivate', auth.verifyUsuario, userController.deactivate);
router.get('/list', auth.verifyUsuario, auth.verifyUsuario,userController.list);
module.exports = router;