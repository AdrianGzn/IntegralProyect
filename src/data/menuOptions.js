const options = {
    teacher: [
        {
            text: "Asistencias",
            link: "/teacher/asistance"
        },
        {
            text: "Reuniones",
            link: "/teacher/meetings"
        },
        {
            text: "Boletas",
            link: "/teacher/ballots"
        },
        {
            text: "Calificaciones",
            link: "/teacher/qualifications"
        },
        {
            text: "Horario",
            link: "/teacher/schedules"
        },
        {
            text: "Reportes",
            link: "/teacher/reports"
        },
        {
            text: "Home",
            link: "/teacher/home"
        },
    ],
    escolarControl: [
        {
            text: "Boletas",
            link: "/escolarControl/ballots"
        },
        {
            text: "Horarios",
            link: "/escolarControl/schedules"
        },
        {
            text: "Reuniones",
            link: "/escolarControl/meetings"
        },
        {
            text: "Home",
            link: "/escolarControl/home"
        },
    ],
    resourses : [
        {
            text: "Recursos",
            link: "/resourses/administration"
        },
        {
            text: "Home",
            link: "/resourses/home"
        },
    ],
    management: [
        {
            text: "Reportes",
            link: "/management/reports"
        },
        {
            text: "Recursos",
            link: "/management/resourses"
        },
        {
            text: "Home",
            link: "/management/home"
        },
    ]
}

function getOptions () {
    return options;
}

export default getOptions;