import { Link, Outlet } from "remix";

export default function Sales() {
    return (
        <>
            <header>
                <h2 className="font-bold text-lg">Sales</h2>
                <nav className="px-0 py-4">
                    <ul className="flex gap-2">
                        <li>
                            <Link to="overview">Overview</Link>
                        </li>
                        <li>
                            <Link to="subscriptions">Subscriptions</Link>
                        </li>
                        <li>
                            <Link to="invoices">Invoices</Link>
                        </li>
                        <li>
                            <Link to="customers">Customers</Link>
                        </li>
                        <li>
                            <Link to="deposits">Deposits</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <section>
                <Outlet />
            </section>
        </>
    );
}
