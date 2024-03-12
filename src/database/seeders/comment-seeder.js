import Post from "../../entities/Post/post-model.js";
import User from "../../entities/User/user-model.js";
import Comment from "../../entities/Comment/comment-model.js";
import { faker } from "@faker-js/faker";


const seedComments = async () => {
    const comments = [];
    const users = await User.find();
    const posts = await Post.find();

    for (let i = 0; i < 10; i++) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const randomPostIndex = Math.floor(Math.random() * posts.length);
        const comment = {
            author: users[randomUserIndex]._id,
            post: posts[randomPostIndex]._id,
            content: faker.lorem.words({ min: 1, max: 255 })
        }
        comments.push(comment);
    }
    await Comment.create(comments);
}

export default seedComments;