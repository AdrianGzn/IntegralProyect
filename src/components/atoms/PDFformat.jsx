import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 30,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    section: {
        marginBottom: 10,
    },
    textNew: {
        marginTop: 5,
        fontSize: 15,
    },
    table: {
        display: "table",
        width: "auto",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
    },
    tableObs: {
        display: "table",
        width: "80%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        minHeight: "80%",
        marginLeft: "10%",
    },
    tableRow: {
        flexDirection: "row",
    },
    tableCol: {
        width: "25%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColNew: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableColRest: {
        width: "75%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 30,
        right: 30,
        borderTopWidth: 1,
        paddingTop: 10,
    },
    column: {
        flexDirection: 'column',
        marginLeft: 20,
    },
    gap: {
        marginBottom: 10,
    },
});

const PDFformat = (props) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text>SISTEMA EDUCATIVO NACIONAL</Text>
                <Text>BOLETA DE EVALUACIÓN</Text>
            </View>
            <View style={styles.header}>
                <Text style={styles.textNew}>Nombre del alumno:</Text>
                <Text style={styles.textNew}>Nombre de la Escuela:</Text>
            </View>
            <View style={styles.section}>
                <Text>Periodo de Evaluación Anual</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Periodo</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Asignatura</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Calificación</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>Observaciones</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{props.ratingFinal}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>{}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}>2º Trimestre</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={styles.tableCell}></Text>
                        </View>
                    </View>
                </View>
                <View style={styles.column}>
                    <View style={[styles.table, styles.gap]}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColNew}>
                                <Text style={styles.tableCell}>Lengua</Text>
                            </View>
                            <View style={styles.tableColRest}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.table, styles.gap]}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColNew}>
                                <Text style={styles.tableCell}>Asistencias</Text>
                            </View>
                            <View style={styles.tableColRest}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.table, styles.gap]}>
                        <View style={styles.tableRow}>
                            <View style={styles.tableColNew}>
                                <Text style={styles.tableCell}>Leng</Text>
                            </View>
                            <View style={styles.tableColRest}>
                                <Text style={styles.tableCell}></Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.tableObs}>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>s</Text>
                    </View>
                    <View style={styles.tableColRest}>
                        <Text style={styles.tableCell}>Sugerencias de los aprendizajes</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>1</Text>
                    </View>
                    <View style={styles.tableColRest}>
                        <Text style={styles.tableCell}>{}</Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>2</Text>
                    </View>
                    <View style={styles.tableColRest}>
                        <Text style={styles.tableCell}></Text>
                    </View>
                </View>
                <View style={styles.tableRow}>
                    <View style={styles.tableCol}>
                        <Text style={styles.tableCell}>3</Text>
                    </View>
                    <View style={styles.tableColRest}>
                        <Text style={styles.tableCell}></Text>
                    </View>
                </View>
            </View>
            <View style={styles.footer}>
                <Text>Firma del docente</Text>
                <Text>Nombre y firma de la directora o director</Text>
                <Text>Lugar de expedición</Text>
                <Text>Fecha de expedición</Text>
                <Text>Folio</Text>
            </View>
        </Page>
    </Document>
);

export default PDFformat;
