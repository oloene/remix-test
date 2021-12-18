import { json, Link, Outlet, useLoaderData } from "remix";
import { getInvoices } from "~/db";

export const loader = async () => {
    const data = await getInvoices();

    const ret = data.map(
        ({ invoiceId, title, netTotalAmount, dueDate, isPaid }) => ({
            invoiceId,
            title,
            netTotalAmount,
            dueDate,
            isPaid,
        })
    );

    return json(ret);
};

export default function Invoices() {
    const data = useLoaderData();
    console.log(data);

    const dueDate = (invoiceDue) => {
        return "DUE DATE";
    };

    return (
        <>
            <header>
                <div>
                    <h3>overdue</h3>
                    <span>$10,800</span>
                </div>
                <div>*progress-bar*</div>
                <div>
                    <h3>due soon</h3>
                    <span>$62,000</span>
                </div>
            </header>
            <section>
                <h3>Invoice list</h3>
                <aside>
                    <ul>
                        {data?.map((invoice) => (
                            <li key={invoice.invoiceId}>
                                <Link to={invoice.invoiceId}>
                                    <div>
                                        <span>{invoice.title}</span>
                                        &emsp;
                                        <span>{invoice.netTotalAmount}</span>
                                    </div>
                                    <div>{dueDate(invoice.dueDate)}</div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </aside>
                <div>
                    <Outlet />
                </div>
            </section>
        </>
    );
}
