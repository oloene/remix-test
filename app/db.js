import { addDays, endOfDay, subDays } from "date-fns";

const today = new Date();

const invoices = [
  {
    invoiceId: "og6launjp0o",
    title: "Santa Monica",
    netTotalAmount: 10800,
    dueDate: endOfDay(today),
    invoiceDate: subDays(today, 7),
    isPaid: false,
    items: [
      {
        plan: "Pro plan",
        amount: 6000,
      },
      {
        plan: "Custom",
        amount: 4800,
      },
    ],
  },
  {
    invoiceId: "ig6laxynpoxFf",
    title: "ST. Marinette",
    netTotalAmount: 17300,
    dueDate: endOfDay(subDays(today, 1)),
    invoiceDate: subDays(today, 12),
    isPaid: false,
    items: [
      {
        plan: "Pro plan",
        amount: 7300,
      },
      {
        plan: "Surcharge",
        amount: 4800,
      },
      {
        plan: "Custom",
        amount: 5200,
      },
    ],
  },
  {
    invoiceId: "2nlbchiq80o",
    title: "Stankonia",
    netTotalAmount: 8000,
    dueDate: endOfDay(addDays(today, 15)),
    invoiceDate: subDays(today, 27),
    isPaid: false,
    items: [
      {
        plan: "Pro plan",
        amount: 6000,
      },
      {
        plan: "Custom",
        amount: 2000,
      },
    ],
  },
  {
    invoiceId: "2aaen1n6o28",
    title: "Ocean Avenue",
    netTotalAmount: 9500,
    dueDate: endOfDay(addDays(today, 5)),
    invoiceDate: subDays(today, 22),
    isPaid: true,
    items: [
      {
        plan: "Membership",
        amount: 1000,
      },
      {
        plan: "Custom",
        amount: 8500,
      },
    ],
  },
  {
    invoiceId: "po1hr4nqgv8",
    title: "Tubthumper",
    netTotalAmount: 14000,
    dueDate: endOfDay(subDays(today, 19)),
    invoiceDate: subDays(today, 30),
    isPaid: false,
    items: [
      {
        plan: "Membership",
        amount: 1000,
      },
      {
        plan: "Pro plan",
        amount: 6000,
      },
      {
        plan: "Custom",
        amount: 7000,
      },
    ],
  },
  {
    invoiceId: "dcc86rou6o",
    title: "Wide Open Space",
    netTotalAmount: 4600,
    dueDate: endOfDay(addDays(today, 1)),
    invoiceDate: subDays(new Date(), 4),
    isPaid: false,
    items: [
      {
        plan: "Membership",
        amount: 1000,
      },
      {
        plan: "Custom",
        amount: 3600,
      },
    ],
  },
];

async function mockFetch(items, timeMs = 100) {
  return await new Promise((resolve) =>
    setTimeout(() => resolve(items), timeMs + Math.random() * 100)
  );
}

export async function getInvoices() {
  return await mockFetch(invoices);
}

export async function getInvoice(id) {
  const invoice = invoices.find((invoice) => invoice.invoiceId === id);
  return await mockFetch(invoice);
}

export async function payInvoice(id) {
  await mockFetch(
    [
      ...invoices.map((invoice) => {
        if (invoice.invoiceId === id) {
          return { ...invoice, isPaid: true };
        }

        return invoice;
      }),
    ],
    1200
  );

  return true;
}
