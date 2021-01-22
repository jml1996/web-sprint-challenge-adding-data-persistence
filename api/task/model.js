const db = require('../../data/dbConfig.js')

module.exports = {
    get,
    add
}

function get() {
    return db('tasks')
}

function getById(id) {
    return db('tasks')
        .where('task_id', id)
        .first()
}

function add(task) {
    return db('tasks')
        .insert(task)
        .then(ids => {
            return getById(ids[0])
        })
}