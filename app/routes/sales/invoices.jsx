import { json, NavLink, Outlet, useLoaderData } from "remix";
import Progress from "../../components/Progress";
import { getInvoices } from "../../db";
import { isAfter } from "date-fns";
import { formatToCurrency, invoiceDue } from "../../utils/invoice";

export const loader = async () => {
  const data = await getInvoices();

  const invoices = data.map(
    ({ invoiceId, title, netTotalAmount, dueDate, isPaid }) => ({
      invoiceId,
      title,
      netTotalAmount,
      dueDate,
      isPaid,
    })
  );

  const today = new Date();

  const invoiceAmounts = invoices.reduce((acc, invoice) => {
    if (!("totalAmount" in acc)) acc["totalAmount"] = 0;
    if (!("overdueAmount" in acc)) acc["overdueAmount"] = 0;
    if (!("dueSoon" in acc)) acc["dueSoon"] = 0;

    if (invoice.isPaid) return acc;

    if (isAfter(today, new Date(invoice.dueDate))) {
      acc["overdueAmount"] += invoice.netTotalAmount;
    } else {
      acc["dueSoon"] += invoice.netTotalAmount;
    }

    acc["totalAmount"] += invoice.netTotalAmount;

    return acc;
  }, {});

  return json({
    invoiceAmounts,
    invoices,
  });
};

export default function Invoices() {
  const { invoices, invoiceAmounts } = useLoaderData();

  const amountOverduePercentage =
    ((invoiceAmounts?.overdueAmount ?? 0) /
      (invoiceAmounts?.totalAmount ?? 1)) *
    100;

  return (
    <>
      {invoices.length < 1 ? (
        <h1 className="text-center text-5xl mt-16">No invoices</h1>
      ) : (
        <>
          <header className="grid grid-cols-progress items-center gap-3 mt-12 mb-12 w-full">
            <div className="flex flex-col items-center">
              <h3 className="font-bold">overdue</h3>
              <span className="text-cyan-800">
                {formatToCurrency(invoiceAmounts.overdueAmount)}
              </span>
            </div>
            <Progress startPercentage={amountOverduePercentage} />
            <div className="flex flex-col items-center">
              <h3 className="font-bold">due soon</h3>
              <span className="text-cyan-800">
                {formatToCurrency(invoiceAmounts.dueSoon)}
              </span>
            </div>
          </header>
          <section className="flex max-h-[500px]">
            <aside className="border-2 flex-full border-slate-200 rounded-bl-md rounded-tl-md overflow-y-auto custom-scrollbar">
              <ul>
                {invoices.map((invoice) => (
                  <li key={invoice.invoiceId}>
                    <NavLink
                      to={invoice.invoiceId}
                      className={({ isActive }) =>
                        `p-4 inline-block w-full ${
                          isActive ? "bg-sky-50" : "hover:bg-green-50"
                        }`
                      }
                    >
                      <div className="flex">
                        <span className="font-bold">{invoice.title}</span>
                        &emsp;
                        <span className="ml-auto font-bold">
                          {formatToCurrency(invoice.netTotalAmount)}
                        </span>
                      </div>
                      <div className="text-right">{invoiceDue(invoice)}</div>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </aside>
            <div className="border-t-2 border-r-2 flex-full border-b-2 border-slate-200 rounded-tr-md rounded-br-md">
              <Outlet />
            </div>
          </section>
        </>
      )}
    </>
  );
}
