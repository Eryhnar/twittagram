import User from "../../entities/User/user-model.js";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";
import isValidHandle from "../../utils/validators/isValidHandle.js";
import processHandle from "../../utils/treatment-utils/processHandle.js";

const seedUsers = async () => {
    const users = [
        {
            userHandle: "@super_admin",
            userName: "Super_admin",
            email: "superadmin@superadmin.com",
            password: await bcrypt.hash("Aa123456", 10),
            role: "super_admin",
            profilePicture: "https://example.com/profile1.jpg",
            bio: "I'm a fixed user",
            isActive: true,
            followers: [],
            following: [],
            friends: []
        },
        {
            userHandle: "@admin",
            userName: "Admin",
            email: "admin@admin.com",
            password: await bcrypt.hash("Aa123456", 10),
            role: "admin",
            profilePicture: "https://example.com/profile2.jpg",
            bio: "I'm another fixed user",
            isActive: true,
            followers: [],
            following: [],
            friends: []
        },
        {
            userHandle: "@user",
            userName: "User",
            email: "user@user.com",
            password: await bcrypt.hash("Aa123456", 10),
            role: "user",
            profilePicture: "https://example.com/profile3.jpg",
            bio: "I'm the third fixed user",
            isActive: true,
            followers: [],
            following: [],
            friends: []
        },
    ];

    for (let i = 0; i < 17; i++) {
        
        const userName = faker.internet.displayName();
        const userHandle = processHandle(userName);
        const user = {
            userName: userName,
            userHandle: userHandle,
            email: faker.internet.email({firstName: `${userName}`}),
            password: await bcrypt.hash("Aa123456", 10),
            role: "user",
            profilePicture: faker.image.avatar(),
            bio: faker.person.bio(),
            isActive: true,
            followers: [],
            following: [],
            friends: []
        };
        users.push(user);
        
    }
    await User.create(users);

    //add followers and following
    const allUsers = await User.find();
    
    for (const user of allUsers) {
        let usersCopy = allUsers.filter(u => u !== user);
        const maxNum = Math.floor(Math.random() * usersCopy.length);
        for (let i = 0; i < maxNum; i++) {
            const randomIndex = Math.floor(Math.random() * usersCopy.length);
            const follower = usersCopy[randomIndex];
            user.following.push(follower._id);
            follower.followers.push(user._id);
            usersCopy.splice(randomIndex, 1);

            await follower.save();
        }
        //add friends
        usersCopy = allUsers.filter(u => u !== user);
        for (let i = 0; i < maxNum; i++) {
            const randomIndex = Math.floor(Math.random() * usersCopy.length);
            const friend = usersCopy[randomIndex];
            user.friends.push(friend._id);
            usersCopy.splice(randomIndex, 1);
            
        }
        
        await user.save();
    }
        
        
}

export default seedUsers;