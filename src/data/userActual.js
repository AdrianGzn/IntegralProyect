const user = {
    name: "",
    role: "teacher",
    id: 0
};

function setUser(newName, newRole, newId) {
    user.name = newName;
    user.role = newRole;
    user.id = newId;
}

function clearUser() {
    user.name = "";
    user.role = "";
    user.id = 0;
}

function getName() {
    return user.name;
}

function getRole() {
    return user.role;
}

function getId() {
    return user.id;
}

function printUser() {
    console.log("Id:" + user.id + " Nombre:" + user.name + " Role:" + user.role);
}

export { setUser, clearUser, getName, getRole, getId, printUser };
