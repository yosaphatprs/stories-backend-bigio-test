const Story = require('../models/story')

exports.createStory = async function (storyObj) {
    try {
        if (!storyObj || !storyObj.title || !storyObj.author || !storyObj.synopsis || !storyObj.category || !storyObj.tags || !storyObj.status) {
            throw new Error('Invalid arguments!');
        }

        const {
            title,
            author,
            synopsis,
            category,
            tags,
            status
        } = storyObj;

        let story = new Story({
            title,
            author,
            synopsis,
            category,
            tags,
            status
        });

        return await story.save();

    } catch (err) {
        return Promise.reject(err);
    }
}

exports.updateStory = async function (id, storyObj) {
    try {
        if (!id || !storyObj || !storyObj.title || !storyObj.author || !storyObj.synopsis || !storyObj.category || !storyObj.tags || !storyObj.status) {
            throw new Error('Invalid arguments!');
        }

        const {
            title,
            author,
            synopsis,
            category,
            tags,
            status
        } = storyObj;

        let story = await Story.findById(id);

        if (!story) {
            throw new Error('Story not found!');
        }

        story.title = title;
        story.author = author;
        story.synopsis = synopsis;
        story.category = category;
        story.tags = tags;
        story.status = status;

        return await story.save();
    } catch (err) {
        return Promise.reject(err);
    }
}

exports.readStory = async function (id) {
    try {
        if (!id) {
            throw new Error('Invalid arguments!');
        }

        return await Story.findById(id);
    } catch (err) {
        return Promise.reject(err);
    }
}

exports.getStories = async function () {
    try {
        return await Story.find({});
    } catch (err) {
        return Promise.reject(err);
    }
}

exports.deleteStory = async function (id) {
    try {

        if (!id) {
            throw new Error('Invalid arguments!');
        }

        let story = await Story.findById(id);

        if (!story) {
            throw new Error('Chapter not found!');
        }

        story.isDeleted = true;

        return await story.save();
    } catch (err) {
        return Promise.reject(err);

    }
}

exports.searchStory = async function (str) {
    try {
        if (!str) {
            throw new Error('Invalid arguments!');
        }

        return await Story.find({
            $or: [
                {
                    "title": { '$regex': str, '$options': 'i' }
                },
                {
                    "author": { '$regex': str, '$options': 'i' }
                }
            ]
        });
    } catch (err) {
        return Promise.reject(err);
    }
}

exports.filterByCategoryAndStatur = async function (category, status) {
    try {
        if (!category || !status) {
            throw new Error('Invalid arguments!');
        }

        return await Story.find({
            $and: [
                {
                    "category": category
                },
                {
                    "status": status
                }
            ]
        });
    } catch (err) {
        return Promise.reject(err);
    }
}