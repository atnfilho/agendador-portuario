import FrotaDaCasaForm from "@/components/forms/FrotaDaCasa";

export default function OwnerDetails({params}: {params: {ownerId: string}}) {
    return (
        <FrotaDaCasaForm id={Number(params.ownerId)} />
    )
}