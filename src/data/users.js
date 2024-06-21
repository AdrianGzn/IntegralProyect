let users = [
    {
        name: "Juan",
        password: "123"
    },
    {
        name: "Juana",
        password: "123"
    }
];

const validate = (userName, userPassword) => {
    let found = false;

    for (let i = 0; i < users.length; i++) {
        if (userName == users[i].name && userPassword == users[i].password) {
            found = true
        }
    }

    return found;
}

export { validate };