const user = {
    name: localStorage.getItem('userName') || "",
    role: localStorage.getItem('userRole') || "",
    id: localStorage.getItem('userId') || 0,
    token: localStorage.getItem('token') || ""
};

function setUser(newName, newRole, newId, newToken) {
    user.name = newName;
    user.role = newRole;
    user.id = newId;
    user.token = newToken;
    localStorage.setItem('userName', newName);
    localStorage.setItem('userRole', newRole);
    localStorage.setItem('userId', newId.toString());
    localStorage.setItem('token', newToken);
}

function clearUser() {
    user.name = "";
    user.role = "";
    user.id = 0;
    user.token = "";
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
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
