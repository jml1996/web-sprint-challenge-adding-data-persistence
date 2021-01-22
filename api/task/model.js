const db = require('../../data/dbConfig.js')

module.exports = {
    get,
    add
}

function get() {
    return db('tasks as t')
        .join('projects as p', 't.project_id', 'p.project_id')
        .select('task_id', 'task_description', 'task_notes', 'task_completed', 'project_name', 'project_description')
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