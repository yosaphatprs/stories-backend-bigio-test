const Story = require('../models/story')
const Chapter = require('../models/chapter')

exports.createChapter = async function (storyId, chapterObj) {
    try {
        if (!storyId || !chapterObj || !chapterObj.title || !chapterObj.content) {
            throw new Error('Invalid arguments!');
        }

        const { title, content } = chapterObj;

        let chapter = new Chapter({
            title,
            content
        });

        let story = await Story.findById(storyId);

        return await story.children.push(chapter);

    } catch (err) {
        return Promise.reject(err);
    }
}

exports.editChapter = async function (chapterId, chapterObj) {
    try {
        if (!chapterId || !chapterObj || !chapterObj.title || !chapterObj.content) {
            throw new Error('Invalid arguments!');
        }

        const { title, content } = chapterObj;

        let chapter = await Chapter.findById(chapterId);

        if (!chapter) {
            throw new Error('Chapter not found!');
        }

        chapter.title = title;
        chapter.content = content;

        return await chapter.save();

    } catch (err) {
        return Promise.reject(err);
    }
}

exports.deleteChapter = async function (chapterId) {
    try {
        if (!chapterId) {
            throw new Error('Invalid arguments!');
        }

        let chapter = await Chapter.findById(chapterId);

        if (!chapter) {
            throw new Error('Chapter not found!');
        }

        chapter.isDeleted = true;

        return await chapter.save();
    } catch (err) {
        return Promise.reject(err);
    }
}