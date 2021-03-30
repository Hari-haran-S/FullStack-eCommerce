import bcrypt from 'bcryptjs'
const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456',10),
        isAdmin: true
    },
    {
        name: 'Hari',
        email: 'hari@example.com',
        password: bcrypt.hashSync('123456',10),
    },
    {
        name: 'Polo G',
        email: 'polo@example.com',
        password: bcrypt.hashSync('123456',10),
    },

]

export default users;