import { format } from "date-fns";
import { json, Outlet, useCatch, useLoaderData, useNavigate } from "remix";
import Button from "../../../components/Button";
import { getInvoice } from "../../../db";
import { invoiceDue, formatToCurrency } from "../../../utils/invoice";

export async function loader({ params }) {
  const invoice = await getInvoice(params.invoiceId);

  if (!invoice)
    throw new Response(params.invoiceId, {
      status: 404,
    });

  return json(invoice);
}

export default function Invoice() {
  const navigate = useNavigate();
  const data = useLoaderData();

  const { title, netTotalAmount, invoiceDate, items, isPaid } = data;

  return (
    <>
      <div className="flex flex-col h-full p-8">
        <div>
          <div className="flex justify-between">
            <h1 className="text-xl mt-2 mb-2">{title}</h1>
            {isPaid ? (
              <span
                className="material-icons text-green-500"
                style={{ fontSize: "3rem" }}
              >
                done
              </span>
            ) : (
              <Button onClick={() => navigate("pay")}>PAY</Button>
            )}
          </div>
          <h2 className="text-4xl mb-2 font-bold">
            {formatToCurrency(netTotalAmount)}
          </h2>
          <p>
            <span>{invoiceDue(data)}</span>
            &ensp;&bull;&ensp;
            <span className="text-gray-500">
              INVOICED {format(new Date(invoiceDate), "MM/dd/yyyy")}
            </span>
          </p>
        </div>
        <div className="mt-auto">
          <ul>
            {items?.map(({ plan, amount }) => (
              <li
                key={plan}
                className="flex justify-between mt-4 pb-4 border-b-2 border-slate-200"
              >
                <span>{plan}</span>
                <span>{formatToCurrency(amount)}</span>
              </li>
            ))}
          </ul>
          <p className="text-right mt-2">
            <span className="font-bold pr-2 ">Net total:</span>
            <span>{formatToCurrency(netTotalAmount)}</span>
          </p>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="mb-4">
          <span className="font-bold text-lg">Ops!</span>{" "}
        </h1>
        <p className="text-sm mb-4">
          Looks like you tried to find an invoice that does not exist.
        </p>
        <p className="text-sm">
          Invoice with id: <span className="font-bold">{caught.data}</span> was
          not found!
        </p>
      </div>
    );
  }

  return (
    <h1 className="text-center">
      Something went wrong {caught.status} - {caught.statusText}
    </h1>
  );
}
