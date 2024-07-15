const options = {
    teacher: [
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
        {
            text: "Calificaciones generales",
            link: "/escolarControl/qualifications"
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