const authRouter = require("../Controller/AuthController")
const express = require("express")
const router = express.Router()

router.post('/register',authRouter.register)
router.post('/login',authRouter.login)

module.exports = router