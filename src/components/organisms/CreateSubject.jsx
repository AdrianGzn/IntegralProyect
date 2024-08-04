import Text from "../atoms/Text"
import Field from "../molecules/Field"
import Button from "../atoms/Button"

function CreateSubject(props) {
    return <div className="w-4/5 my-5 bg-slate-700 rounded-md flex flex-col flex-wrap items-center">
        <Text text="Crear asignatura"></Text>
        <Field 
            text="Nombre de la materia:"
            ref={props.name}
        ></Field>
        <Button
            text="Crear"
            onClick={props.onClick}
        ></Button>
    </div>
}

export default CreateSubject;