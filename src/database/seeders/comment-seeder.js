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
        
        const likers = [...users];
        const likes = [];
        const numLikes = Math.floor(Math.random() * users.length);
        for (let j = 0; j < numLikes; j++) {
            const randomLikerIndex = Math.floor(Math.random() * users.length);
            likes.push(users[randomLikerIndex]._id);
            likers.splice(randomLikerIndex, 1); // Remove the selected liker so they can"t like the post twice
        }
        const post = posts[randomPostIndex]._id;
        // const replies = [];
        // const numReplies = Math.floor(Math.random() * 5);

        const comment = {
            author: users[randomUserIndex]._id,
            post: post,
            content: faker.lorem.words({ min: 1, max: 255 }),
            likes: likes,
            //replies: replies
        }
        comments.push(comment);
    }
    await Comment.create(comments);
    console.log("comments created successfully!");
}

export default seedComments;