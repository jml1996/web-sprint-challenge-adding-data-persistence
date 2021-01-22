const db = require('../../data/dbConfig.js')

module.exports = {
    get,
    add
}

function get() {
    return db('projects')
}

function getById(id) {
    return db('projects')
        .where('project_id', id)
        .first()
}

function add(proj) {
    return db('projects')
        .insert(proj)
        .then(ids => {
            return getById(ids[0])
        })
}