
export default function ComentaryComponent({ data }) {

    return (
        <div className="items-center justify-center w-full ">
            <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                {data ? data.comentary : 'Cargando'}
            </div>
        </div>

    )
}
