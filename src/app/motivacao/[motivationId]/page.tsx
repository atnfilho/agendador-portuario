import { MotivacaoForm } from "@/components/forms/Motivacao";

export default function MotivationDetail({ params }: { params: { motivationId: string } }) {
    return (
        <MotivacaoForm id={Number(params.motivationId)} />
    )
}