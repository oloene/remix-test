const invoices = [
    {
        invoiceId: "og6launjp0o",
        title: "Santa Monica",
        netTotalAmount: 10800,
        dueDate: "Sun Oct 10 2022 16:13:48 GMT+0200",
        invoiceDate: "Thu Sep 30 2021 20:35:39 GMT+0200",
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
        invoiceId: "2nlbchiq80o",
        title: "Stankonia",
        netTotalAmount: 8000,
        dueDate: "Sat Oct 09 2021 09:11:30 GMT+0200",
        invoiceDate: "Sat Sep 08 2021 09:11:30 GMT+0200",
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
        dueDate: "Sun Oct 10 2022 16:13:48 GMT+0200",
        invoiceDate: "Thu Sep 30 2021 20:35:39 GMT+0200",
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
        dueDate: "Sun Oct 10 2021 16:13:48 GMT+0200",
        invoiceDate: "Thu Feb 28 2022 20:35:39 GMT+0200",
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
        dueDate: "Sun Jan 10 2022 16:13:48 GMT+0200",
        invoiceDate: "Thu Sep 30 2021 20:35:39 GMT+0200",
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

async function mockFetch(items) {
    return await new Promise((resolve) =>
        setTimeout(() => resolve(items), 200)
    );
}

export async function getInvoices() {
    return await mockFetch(invoices);
}
