import { differenceInDays, isAfter } from "date-fns";

export function invoiceDue(invoice) {
  if (invoice.isPaid) return <span className="text-green-500">PAID</span>;

  const today = new Date();
  const dueDate = new Date(invoice.dueDate);

  if (isAfter(today, dueDate)) {
    return <span className="text-red-500">OVERDUE</span>;
  }

  const dueInDays = differenceInDays(dueDate, today);

  if (dueInDays === 0) {
    return <span className="text-gray-500">DUE TODAY</span>;
  } else {
    return <span className="text-gray-500">DUE IN {dueInDays} DAYS</span>;
  }
}

export function formatToCurrency(amount) {
  if (!amount) return "$" + 0;

  return "$" + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
