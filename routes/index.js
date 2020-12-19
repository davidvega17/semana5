const routerx = require('express-promise-router');
const articuloRouter = require('./articulo.js');
const userRouter = require('./user.js');
const categoriaRouter = require('./categoria.js');

const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/usuario', userRouter);
router.use('/categoria', categoriaRouter);
module.exports = router;