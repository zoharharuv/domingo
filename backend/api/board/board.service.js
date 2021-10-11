const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const socketService = require('../../services/socket.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    add,
    remove,
    update
}

function _buildCriteria(filter) {
    const criteria = {};
    if (filter.title) {
        criteria.title = { $regex: filter.title, $options: 'i' };
    }
    return criteria
}

async function query(filter = null) {
    const criteria = filter ? _buildCriteria(filter) : {}
    try {
        const collection = await dbService.getCollection('board')
        var boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ '_id': ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error('cannot find board by ID: ', boardId, 'error: ', err)
        throw err
    }
}

async function add(board, userId = null) {
    const id = ObjectId();
    board._id = id;
    try {
        const collection = await dbService.getCollection('board');
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error(`cannot add board ${board}`, err)
        throw err
    }
}

async function update(board) {
    var id = ObjectId(board._id);
    delete board._id;
    try {
        const collection = await dbService.getCollection('board');
        await collection.updateOne({ "_id": id }, { $set: { ...board } })
        board._id = id;
        return board
    } catch (err) {
        logger.error(`cannot update board ${id}`, err)
        throw err
    }
}

async function remove(boardId) {
    const id = ObjectId(boardId)
    try {
        const collection = await dbService.getCollection('board');
        const length = await collection.countDocuments({})
        if (length > 1){
            const board = await collection.findOne({ "_id": id })
            await collection.deleteOne({ "_id": id })
            return board
        }
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}
