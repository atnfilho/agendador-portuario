import VeiculoForm from "@/components/forms/Veiculo"

export default function VehicleDetails({ params }: {
    params: {
        vehicleId: string
    }
}) {
    return (
        <VeiculoForm id={Number(params.vehicleId)}/>
    )
}