
const categoryController = require('../controllers/category.controller')
const auth_mw = require('../middlewares/auth.mw')
/**
 * POST localhost:8888/ecomm/api/v1/categories
 */

module.exports = (app)=>{
    app.post("/ecomm/api/v1/categories", [auth_mw.verifyToken, auth_mw.isAdmin], categoryController.createNewCategory)
}