const options = {
    teacher: [
        {
            text: "Listas",
            link: "/teacher/list"
        },
        {
            text: "Calificaciones",
            link: "/teacher/qualifications"
        },
    ],
    escolarControl: [
        {
            text: "Clases",
            link: "/escolarControl/class"
        },
        {
            text: "Añadir Maestros",
            link: "/escolarControl/teachers"
        },
        {
            text: "Alumnnos",
            link: "/escolarControl/alumns"
        },
        {
            text: "Baja de Alumno",
            link: "/escolarControl/delete"
        },
    ]
}

function isnertOption (option) {
    if(option === 'Reportes') {
        return options.teacher.link;
    }
}

function getOptions () {
    return options;
}

export {isnertOption, getOptions};