const options = {
    teacher: [
        {
            text: "Calificaciones",
            link: "/teacher/qualifications"
        },
        {
            text: "Listas",
            link: "/teacher/list"
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