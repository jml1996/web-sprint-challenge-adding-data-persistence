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
    if (!req.body.project_name) {
        res.status(400).json({ error: 'project_name is a required field' })
    } else {
        let toBoolPostBody;
        if (req.body.project_completed === true) {
            toBoolPostBody = {
                ...req.body,
                'project_completed': 1
            }
        } else {
            toBoolPostBody = {
                ...req.body,
                'project_completed': 0
            }
        }
        Projects.add(toBoolPostBody)
            .then(added => {
                if (added['project_completed'] !== 1){
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
    }
})

module.exports = router
