
const Job = require("../models/job.model")



// READ ALL
module.exports.findAllJobs = (req, res) => {
    Job.find()
        .then((allJobs) => {
            console.log(">>> Jobs.find()  >>>", allJobs)
            res.json(allJobs)
        })
        .catch((err) => {
            res.json(err)
        })
}

// READ ONE 
module.exports.findOneJob = (req, res) => {
    Job.findOne({ _id: req.params.id })
        .then(oneJob => {
            res.json(oneJob)
        })
        .catch(err => {
            res.json(err)
        })
}


// CREATE 
module.exports.createNewJob = (req, res) => {
    Job.create(req.body)
        .then((oneJob) => {
            console.log(">>> Adding a new job to DB >>>", oneJob)
            res.status(200).json(oneJob)
        })
        .catch((err) => {
            res.status(400).json(err)
        })
}

// UPDATE
module.exports.updateExistentJob= (req, res) => {
    Job.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
        .then(updateJob => {
            res.status(200).json(updateJob)
        })
        .catch(err => {
            res.status(400).json(err)
        })
}



// DELETE
module.exports.deleteAnExistingJob = (req, res) => {
    Job.deleteOne({ _id: req.params.id })
        .then(result => {
            res.json(result)
        })
        .catch(err => {
            res.json(err)
        })
}