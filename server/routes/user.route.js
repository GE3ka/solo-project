const UserController =require('../controllers/user.controller')
const {authenticate} = require ('../config/jwt.config')
const JobController = require('../controllers/job.controller')
module.exports = (app) =>{

    app.get("/api/jobs/view", JobController.findAllJobs)
    app.get("/api/jobs/view/:id", JobController.findOneJob)
    app.patch("/api/jobs/edit/:id", JobController.updateExistentJob)
    app.post("/api/jobs/addJob", JobController.createNewJob)
    app.delete("/api/jobs/:id", JobController.deleteAnExistingJob)
    //////////    
    app.get('/api/register',authenticate,UserController.getLoggedInUser)
    app.get('/api/getLoggedInUser',authenticate,UserController.getLoggedInUser)
    app.get('/api/users/:id', authenticate, UserController.getUserById);     
    app.post('/api/register',UserController.register)
    app.post('/api/login',UserController.login)
    app.post('/api/logout',UserController.logout)
   
}