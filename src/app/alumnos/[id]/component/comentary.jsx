
export default function ComentaryComponent({ data }) {

    return (
        <div className="items-center justify-center w-full min-h-screen">
            <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-lg">
                {data ? data.comentary : 'Cargando'}
            </div>
        </div>

    )
}
