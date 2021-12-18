import { useParams } from "remix";

export default function Invoice() {
    const params = useParams();

    return <div>INVOICE : {params.invoiceId}</div>;
}
