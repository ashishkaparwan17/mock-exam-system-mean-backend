const Test = require('../models/test-model')
const testDataValidation = require('../validations/test-data-validation')

// Fetch all the tests from test database
const getTests = async(req,res) => {
    let tests
    try {
        tests = await Test.find()
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong. Please try again later." })
    }
    return res.status(200).json({ tests: tests })
}

// Save test details
const saveTest = async (req, res) => {
    const { test_name, total_marks, test_duration, test_pin, questions } = req.body

    // Validate the test data
    try {
        await testDataValidation.saveTestValidationSchema.validate(req.body)
    } catch (error) {
        return res.status(400).json({ message: error.message })
    }

    // Logged in user should be admin to save the test
    const isAdmin = req.isAdmin
    if(!isAdmin){
        return res.status(400).json({ message: "Only an admin can save the test." })
    }

    // Create the test object
    const newTest = new Test({
        test_name,
        total_marks,
        test_duration,
        test_pin,
        number_of_questions: questions.length,
        questions
    })

    // Save the test in the database
    try{
        await newTest.save()
    }catch(error){
        return res.status(500).json({message: "Internal server error."})
    }

    return res.status(200).json({ message: "Test added." })
}

// Delete a test
const deleteTest = async (req, res) => {
    // Only an admin can delete the test
    const isAdmin = req.isAdmin
    if(!isAdmin){
        return res.status(400).json({ message: "You are not allowed to delete this test." })
    }

    // Find whether the test is present in the database
    const testId = req.params.testId
    const test = await Test.findById(testId)

    if (!test) {
        return res.status(400).json({ message: "Test does not exist." })
    }

    // Delete the test from the database
    try {
        await test.remove()
    } catch (err) {
        return res.status(500).json({message: "Internal server error."})
    }

    return res.status(200).json({ message: "Test deleted." })
}

module.exports = { getTests, saveTest, deleteTest }