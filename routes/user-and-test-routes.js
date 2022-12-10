const router = require('express').Router()

const userController = require('../controllers/user-controller')
const testController = require('../controllers/test-controller')

const checkAuth = require('../middleware/check-auth')

router.get('/',(req,res)=>{res.json("Backend running!")});

router.post('/api/signup', userController.signup)

router.post('/api/login',userController.login)

// Get all tests when user is on home page
router.get('/api/get-tests',testController.getTests)

// Unauthorized access is not allowed for below routes
router.use(checkAuth)

// Save test score in the database
router.post('/api/save-score',userController.saveScore)

// Show tests attempted by user
router.get('/api/my-tests/:userId', userController.showTestsTakenByUser)

// Save a test in the database
router.post('/api/save-test',testController.saveTest)

// Delete a test from the database
router.delete('/api/delete-test/:testId',testController.deleteTest)

module.exports = router