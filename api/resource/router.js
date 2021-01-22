const express = require('express')

const router = express.Router()

const Resources = require('./model.js')

router.get('/', (req, res) => {
    Resources.get()
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message: 'Error getting all resources'
            })
        })
})

router.post('/', async (req, res) => {
    if (!req.body.resource_name) {
        res.status(400).json({ error: "resource_name is a required field" })
    } else {
        const resourcesArray = await Resources.get()
        const alreadyThere = resourcesArray.filter(resource => {
            return resource['resource_name'] === req.body.resource_name
        })
        if (alreadyThere.length > 0) {
            res.status(400).json({ error: "resource_name must be unique" })
        } else {
            Resources.add(req.body)
            .then(added => {
                res.status(201).json(added)
            })
            .catch(error => {
                console.log(error)
                res.status(500).json({
                    message: 'Error posting new resource'
                })
            })
        }
    }
})

module.exports = router
