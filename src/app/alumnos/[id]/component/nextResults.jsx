export default function SiguientesResultadosComponent({ data }) {

    return (
        <>

            <div className="w-full ">
                <div className="w-full p-6 bg-white rounded-lg shadow-lg">
                    siguiente periodo: {data.length > 0 ? data[0].startDate.split("T")[0] : "Proximanente"}
                </div>
            </div>
        </>
    )
}