const express = require('express');

const noticeRouter = express.Router();

const { NoticeModel } = require('../models/Notice.model')

noticeRouter.post('/', async (req, res) => {
    const { name, title, description } = req.body;
    if (!name || !title || !description) {
        return res.status(400).send({ message: 'Author Name, Post Title and Desciption Required' })
    }
    try {
        const notice = new NoticeModel({
            name, title, description, date: new Date()
        })
        await notice.save();
        res.status(201).send({ message: 'Notice Posted Sucessfully' })
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

noticeRouter.get('/', async (req, res) => {
    try {
        const posts = await NoticeModel.find();
        return res.send(posts);
    } catch (error) {
        res.status(501).send({ message: error.message });

    }
})

noticeRouter.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await NoticeModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Notice Not Found' });
        }
        res.status(200).send(post);
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

noticeRouter.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    try {
        const post = await NoticeModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Notice Not Found' });
        }
        await NoticeModel.findOneAndUpdate({ _id: id }, payload);
        res.status(204).send({ message: 'Notice Updated Sucessfully' });
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

noticeRouter.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const post = await NoticeModel.findOne({ _id: id });
        if (!post) {
            return res.status(404).send({ message: 'Notice Not Found' });
        }
        await NoticeModel.findByIdAndDelete({ _id: id });
        res.status(202).send({ message: 'Notice Deleted Sucessfully' });
    } catch (error) {
        res.status(501).send({ message: error.message })
    }
})

module.exports = {
    noticeRouter
}