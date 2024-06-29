const options = {
    teacher: [
        {
            text: "Asistencias",
            link: "/teacher/asistance"
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
            text: "Home",
            link: "/escolarControl/home"
        },
    ],
    management: [
        {
            text: "Reportes",
            link: "/management/reports"
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