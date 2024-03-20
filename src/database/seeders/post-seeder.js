import Post from "../../entities/Post/post-model.js";
import User from "../../entities/User/user-model.js";
import { faker } from "@faker-js/faker";


const seedPosts = async () => {
    const posts = [];
    const users = await User.find();
    const visibilityOptions = ["public", "friends", "private"];

    for (let i = 0; i < 100; i++) {
        const randomUserIndex = Math.floor(Math.random() * users.length);
        const words = faker.lorem.words({ min: 1, max: 5 }).split(" ");
        const tags = words.map(word => `#${word}`);
        const visibility = visibilityOptions[Math.floor(Math.random() * visibilityOptions.length)];
        
        const likers = [...users];
        const likes = [];
        const numLikes = Math.floor(Math.random() * users.length);
        for (let j = 0; j < numLikes; j++) {
            const randomLikerIndex = Math.floor(Math.random() * users.length);
            likes.push(users[randomLikerIndex]._id);
            likers.splice(randomLikerIndex, 1); // Remove the selected liker so they can"t like the post twice
        }
        
        const post = {
            author: users[randomUserIndex]._id,
            image: faker.image.url(),
            caption: faker.lorem.words({ min: 1, max: 50 }),
            visibility: visibility,
            tags: tags,
            likes: likes,
        };
        posts.push(post);
    }
    await Post.create(posts);
    console.log("posts created successfully!")
}

export default seedPosts;