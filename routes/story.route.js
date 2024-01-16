const express = require('express');
const router = express.Router();
const multer = require('multer');
const storyController = require('../controllers/story.controller');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/', async (req, res) => {
    try {
        const story = await storyController.getStories();
        res.json({
            story,
            status: 200,
            message: 'Stories has been succesfully retrieved from DB!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while retrieving stories from DB!'
        });
    }
});

router.get('/search', async (req, res) => {
    try {
        const { find } = req.query;
        const story = await storyController.searchStory(find);
        res.json({
            story,
            status: 200,
            message: 'Story has been succesfully retrieved from DB!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while retrieving story from DB!'
        });
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyController.readStory(id);
        res.json({
            story,
            status: 200,
            message: 'Story has been succesfully retrieved from DB!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while retrieving story from DB!'
        });
    }
})

router.post('/', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).send('No file uploaded.');
            return;
        }

        const { title, author, synopsis, category, tags, status } = req.body;
        const { filename, path } = req.file;
        const story = await storyController.createStory({ title, author, synopsis, category, filename, path, tags, status });
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
})

router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, author, synopsis, category, tags, status } = req.body;
        const story = await storyController.updateStory(id, title, author, synopsis, category, tags, status);
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
})

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const story = await storyController.deleteStory(id);
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
})

router.get('/filter', async (req, res) => {
    try {
        const { category } = req.query;
        const story = await storyController.filterStory(category);
        res.json({
            story,
            status: 200,
            message: 'Story has been succesfully retrieved from DB!'
        });
    } catch (err) {
        res.json({
            story: null,
            status: err.code || err.statusCode || 500,
            message: err.message || 'Something went wrong while retrieving story from DB!'
        });
    }
})

module.exports = router;