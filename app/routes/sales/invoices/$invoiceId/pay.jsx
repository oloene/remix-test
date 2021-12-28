import {
  Form,
  json,
  redirect,
  useTransition,
  useLoaderData,
  useNavigate,
} from "remix";
import Modal from "../../../../components/Modal";
import { getInvoice, payInvoice } from "../../../../db";
import { formatToCurrency } from "../../../../utils/invoice";
import Button from "../../../../components/Button";
import { format } from "date-fns";

export async function loader({ params }) {
  const invoice = await getInvoice(params.invoiceId);

  if (!invoice) throw new Response("no invoice found", { status: 404 });

  return json({
    invoiceId: invoice.invoiceId,
    title: invoice.title,
    amount: invoice.netTotalAmount,
    items: invoice.items,
    invoiceDate: invoice.invoiceDate,
  });
}

export async function action({ params }) {
  const success = await payInvoice(params.invoiceId);

  if (success) return "ok"; //redirect("/sales/invoices");
}

export default function Pay() {
  const data = useLoaderData();
  const transition = useTransition();
  const navigate = useNavigate();

  const isSaving = transition.state === "submitting";

  const { invoiceId, title, amount, items, invoiceDate } = data;

  return (
    <Modal
      title="Invoice payment"
      onClose={() => navigate(`/sales/invoices/${invoiceId}`)}
      open
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <label className="font-bold underline" htmlFor="title">
            Invoice:
          </label>
          <h1 id="invoice">{invoiceId}</h1>
        </div>
        <div className="mb-4">
          <label className="font-bold underline" htmlFor="title">
            Title:
          </label>
          <h1 id="title">{title}</h1>
        </div>
        <div className="mb-4">
          <label className="font-bold underline" htmlFor="date">
            Invoice date:
          </label>
          <h1 id="date">{format(new Date(invoiceDate), "MM/dd/yyyy")}</h1>
        </div>
        <ul className="mt-auto">
          {items.map((item) => (
            <li
              key={item.plan}
              className="mb-4 pb-2 pt-2 border-b-2 flex justify-between border-b-slate-100"
            >
              <span className="font-bold">{item.plan}</span>
              <span>{formatToCurrency(item.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="mb-2 flex justify-end">
          <span className="font-bold underline text-lg">
            Net total: {formatToCurrency(amount)}
          </span>
          <span className="font-bold">{}</span>
        </div>
        <div className="min-h-[42px] mt-2">
          <Form method="post" className="flex gap-2 justify-end">
            <Button
              disabled={isSaving}
              type="submit"
            >{`${"Pay with BankID"}`}</Button>
            <Button
              disabled={isSaving}
              type="submit"
            >{`${"Pay with Card"}`}</Button>
          </Form>
        </div>
      </div>
    </Modal>
  );
}
