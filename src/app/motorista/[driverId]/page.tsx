import { MotoristaForm } from "@/components/forms/Motorista";

export default function DriverDetails({ params }: { params: { driverId: string } }) {
    return (
        <MotoristaForm id={Number(params.driverId)} />
    )
}