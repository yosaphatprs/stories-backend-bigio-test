const express = require('express');
const router = express.Router();
const chapterController = require('../controllers/chapter.controller');

router.post('/', async (req, res) => {
    try {
        const { storyId, title, content } = req.body;
        const story = await chapterController.createChapter(storyId, {
            title,
            content
        });
        res.json({
            story,
            status: 200,
            message: 'Story has been succesfully created!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while creating story!'
        });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, synopsis, category, tags, status } = req.body;
        const story = await chapterController.updateChapter(id, {
            title,
            author,
            synopsis,
            category,
            tags,
            status
        });
        res.json({
            story,
            status: 200,
            message: 'Story has been succesfully updated!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while updating story!'
        });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const story = await chapterController.deleteChapter(id);
        res.json({
            story,
            status: 200,
            message: 'Story has been succesfully deleted!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while deleting story!'
        });
    }
});

module.exports = router;