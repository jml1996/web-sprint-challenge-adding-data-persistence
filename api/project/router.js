const express = require('express')

const router = express.Router()

const Projects = require('./model.js')

router.get('/', (req, res) => {
    Projects.get()
        .then(projects => {
            const toBool = projects.map(proj => {
                if (proj['project_completed'] === 1) {
                    return { ...proj, 'project_completed': true }
                } else {
                    return { ...proj, 'project_completed': false }
                }
            })
            res.status(200).json(toBool)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error getting all projects'
            })
        })
})

router.post('/', (req, res) => {
    console.log(req.body)
    if (!req.body.project_name) {
        res.status(400).json({ message: "project_name is a required field" })
    }
    Projects.add(req.body)
        .then(added => {
            if (req.body.project_completed !== 1){
                const booleanAddedProj = {
                    ...added,
                    'project_completed': false
                }
                res.status(201).json(booleanAddedProj)
            } else {
                const booleanAddedProj = {
                    ...added,
                    'project_completed': true
                }
                res.status(201).json(booleanAddedProj)
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error posting new project'
            })
        })
})

module.exports = router
