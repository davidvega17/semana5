/* un Ejemplo  de como se veria la ruta listar - modelo del  articulo*/
const routerx = require('express-promise-router');
const { verify } = require('jsonwebtoken');
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middlewares/auth');

const router = routerx();


router.get('/list', categoriaController.list);
router.post('/add', auth.verifyUsuario, categoriaController.add);
router.put('/update', auth.verifyUsuario, categoriaController.update);
router.put('/activate', auth.verifyUsuario,categoriaController.activate);
router.put('/deactivate', auth.verifyUsuario,categoriaController.deactivate);
module.exports = router;