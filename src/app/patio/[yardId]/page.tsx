import PatioForm from "@/components/forms/Patio";

export default function YardDetails({ params }: { params: { yardId: string } }) {
    return (
        <PatioForm id={Number(params.yardId)} />
    )
}