const express = require('express')

const router = express.Router()

const Tasks = require('./model.js')

router.get('/', (req, res) => {
    Tasks.get()
        .then(tasks => {
            const toBool = tasks.map(task => {
                if (task['task_completed'] === 1) {
                    return { ...task, 'task_completed': true }
                } else {
                    return { ...task, 'task_completed': false }
                }
            })
            res.status(200).json(toBool)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error getting all tasts'
            })
        })
})

router.post('/', (req, res) => {
    if (!req.body.task_description || ! req.body.project_id) {
        res.status(400).json({ error: "task_description and project_id are required fields" })
    } else {
        let toBoolPostBody;
        if (req.body.task_completed === true) {
            toBoolPostBody = {
                ...req.body,
                'task_completed': 1
            }
        } else {
            toBoolPostBody = {
                ...req.body,
                'task_completed': 0
            }
        }
        Tasks.add(toBoolPostBody)
            .then(added => {
                if (added['task_completed'] !== 1){
                    const booleanAddedTask = {
                        ...added,
                        'task_completed': false
                    }
                    res.status(201).json(booleanAddedTask)
                } else {
                    const booleanAddedTask = {
                        ...added,
                        'task_completed': true
                    }
                    res.status(201).json(booleanAddedTask)
                }
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    message: 'Error posting new task'
                })
            })
    }
})

module.exports = router
