const sequelize = require('../config/connection');
const { Blog, User } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });
    // [{id: 1}, {id: 2}, {id: 3}]
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[0].id,
        });
    }

    process.exit(0);
};

seedDatabase();