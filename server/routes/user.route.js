// Importing necessary controllers and middleware
const UserController = require('../controllers/user.controller'); // Controller for user-related operations
const { authenticate } = require('../config/jwt.config'); // Middleware for JWT authentication
const JobController = require('../controllers/job.controller'); // Controller for job-related operations

// Exporting a function that sets up routes for the provided Express app
module.exports = (app) => {

    // Routes for job-related operations
    app.get("/api/jobs/view", JobController.findAllJobs); // Route to retrieve all jobs
    app.get("/api/jobs/view/:id", JobController.findOneJob); // Route to retrieve a specific job by ID
    app.patch("/api/jobs/edit/:id", JobController.updateExistentJob); // Route to update an existing job
    app.post("/api/jobs/addJob", JobController.createNewJob); // Route to add a new job
    app.delete("/api/jobs/:id", JobController.deleteAnExistingJob); // Route to delete an existing job
    
    //////////
    
    // Routes for user-related operations
    app.get('/api/register', authenticate, UserController.getLoggedInUser); // Route to get logged-in user information
    app.get('/api/getLoggedInUser', authenticate, UserController.getLoggedInUser); // Another route to get logged-in user information
    app.get('/api/users/:id', authenticate, UserController.getUserById); // Route to get a specific user by ID
    app.post('/api/register', UserController.register); // Route to register a new user
    app.post('/api/login', UserController.login); // Route to login
    app.post('/api/logout', UserController.logout); // Route to logout

}
