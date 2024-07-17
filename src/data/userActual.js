let id = 0;
let name = "Romeo";
let role = "management";

function setUser(newName, newRole, newId) {
    name = newName;
    role = newRole;
    id = newId;
}

function clearUser() {
    name = "";
    role = "";
    id = 0;
}

function getName() {
    return name;
}

function getRole() {
    return role;
}

function getId() {
    return id;
}

export { setUser, clearUser, getName, getRole, getId };