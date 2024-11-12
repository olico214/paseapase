export default function SiguientesResultadosComponent({ data }) {
    const formDate = (date) => {
        console.log(date)
        if (date) {
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formatter = new Intl.DateTimeFormat('es-MX', options);
            return formatter.format(new Date(date));
        }
    };
    return (
        <>

            <div className="w-full ">
                <div className="w-full p-6 bg-white rounded-lg shadow-lg justify-center content-start items-center text-center">
                    siguiente periodo: {data.length > 0 ? formDate(data[0].fecha) : "Proximanente"}
                </div>
            </div>
        </>
    )
}