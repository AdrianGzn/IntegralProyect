const user = {
    name: localStorage.getItem('name') || "",
    role: localStorage.getItem('role') || "",
    id: localStorage.getItem('personal_id') || 0,
    token: localStorage.getItem('token') || "",
};

function setUser() {
    user.name = localStorage.getItem('name');
    user.role = localStorage.getItem('role');
    user.id = localStorage.getItem('personal_id');
    user.token = localStorage.getItem('token');
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
