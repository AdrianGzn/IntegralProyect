let users = [
    {
        name: "Juan",
        password: "123"
    },
    {
        name: "Juana",
        password: "123"
    },
];

const createNewUser = () => {

}

const validate = (userName, userPassword) => {
    let found;

    for (let i = 0; i < users.length; i++) {
        if (userName == users[i].name && userPassword == users[i].password) {
            found = true;
        }
    }

    return found;
}

export { createNewUser, validate };