import User from "../../entities/User/user-model.js";
import {faker} from "@faker-js/faker";
import bcrypt from "bcrypt";

const seedUsers = async () => {
    const users = [
        {
            userHandle: "@super_admin",
            userName: "Super_admin",
            email: "super_admin@super_admin.com",
            password: await bcrypt.hash("Aa123456", 10),
            role: "super_admin",
            profilePicture: "https://example.com/profile1.jpg",
            bio: "I'm a fixed user",
            isActive: true,
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
        },
    ];

    for (let i = 0; i < 10; i++) {
        
        const userName = faker.internet.displayName();
        const user = {
            userName: userName,
            userHandle: `@${userName.toLowerCase()}`,
            email: faker.internet.email({firstName: `${userName}`}),
            password: await bcrypt.hash("Aa123456", 10),
            role: "user",
            profilePicture: faker.image.avatar(),
            bio: faker.person.bio(),
            isActive: true,
        };
        users.push(user);
        
    }

    await User.create(users);
}

export default seedUsers;