import { NavLink, Outlet } from "remix";

function LinkItem({ linkTo = "", text = "", iconName = "", prefetch = false }) {
    return (
        <li className="flex align-middle gap-x-1 ">
            <span className="material-icons">{iconName}</span>
            <NavLink
                prefetch={`${prefetch ? "intent" : "none"}`}
                className={({ isActive }) =>
                    ` ${
                        isActive
                            ? " decoration-green-500 underline decoration-2 "
                            : ""
                    }`
                }
                to={linkTo}
            >
                {text}
            </NavLink>
        </li>
    );
}

export default function Sales() {
    return (
        <>
            <header>
                <h2 className="font-bold text-xl mb-6 flex align-middle gap-x-1">
                    <span className="material-icons">login</span>
                    Sales
                </h2>
                <nav className="px-0 py-4">
                    <ul className="flex gap-12">
                        <LinkItem
                            text="Overview"
                            linkTo="overview"
                            iconName="panorama"
                        />
                        <LinkItem
                            text="Subscriptions"
                            linkTo="subscriptions"
                            iconName="loyalty"
                        />
                        <LinkItem
                            text="Invoices"
                            linkTo="invoices"
                            iconName="receipt_long"
                            prefetch
                        />
                        <LinkItem
                            text="Customers"
                            linkTo="customers"
                            iconName="hail"
                        />
                        <LinkItem
                            text="Deposits"
                            linkTo="deposits"
                            iconName="savings"
                        />
                    </ul>
                </nav>
            </header>
            <section>
                <Outlet />
            </section>
        </>
    );
}
