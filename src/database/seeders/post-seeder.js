import Post from "../../entities/Post/post-model.js";
import User from "../../entities/User/user-model.js";
import { faker } from "@faker-js/faker";


const seedPosts = async () => {
    const posts = [];
    const users = await User.find();

    for (let i = 0; i < 10; i++) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const post = {
            author: users[randomUserIndex]._id,
            image: faker.image.url()
        };
        posts.push(post);
    }

    await Post.create(posts);
}

export default seedPosts;