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
    ],
    escolarControl: [
        {
            text: "Boletas",
            link: "/escolarControl/ballots"
        },
    ],
    management: [
        {
            text: "Reportes",
            link: "/management/reports"
        },
    ]
}

function getOptions () {
    return options;
}

export default getOptions;