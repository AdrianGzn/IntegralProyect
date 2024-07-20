const user = {
    name: localStorage.getItem('userName') || "",
    role: localStorage.getItem('userRole') || "",
    id: localStorage.getItem('userId') || 0,
    token: localStorage.getItem('token') || ""
};

function setUser(name, role, id, token) {
    user.name = name;
    user.role = role;
    user.id = id;
    user.token = token;
}

function clearUser() {
    user.name = "";
    user.role = "";
    user.id = 0;
    user.token = "";
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    localStorage.removeItem('personal_id');
    localStorage.removeItem('token');
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

function getToken() {
    return user.token;
}

function printUser() {
    console.log("Id:" + user.id + " Nombre:" + user.name + " Role:" + user.role + " Token:" + user.token);
}

export { setUser, clearUser, getName, getRole, getId, getToken, printUser };
