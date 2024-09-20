import FormularioExpedienteComponent from "./component/form";
import ExpedientePage from "./component/evaluacion/tableEvaluacion";

export default function AlumnoExpediente({ params }) {
    return (
        <div className="grid max-w-[1400px] mx-auto gap-10">
            <div>
                <FormularioExpedienteComponent id={params.id} />
            </div>

            <div>
                <ExpedientePage id={params.id} />
            </div>
        </div>
    )
}