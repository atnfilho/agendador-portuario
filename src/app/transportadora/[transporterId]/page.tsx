import TransportadoraForm from "@/components/forms/Transportadora";

export default function TrasporterDetails({ params }: {
    params: {
        transporterId: string
    }
}) {
    return (
        <TransportadoraForm id={Number(params.transporterId)}/>
    )
}