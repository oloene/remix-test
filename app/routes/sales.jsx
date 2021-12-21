import { NavLink, Outlet } from "remix";

function LinkItem({ linkTo = "", text = "", iconName = "", prefetch = false }) {
  return (
    <li className="flex align-middle gap-x-1 ">
      {iconName ? <span className="material-icons">{iconName}</span> : null}
      <NavLink
        prefetch={`${prefetch ? "intent" : "none"}`}
        className={({ isActive }) =>
          ` ${isActive ? "font-bold" : "text-gray-600 hover:text-black"}`
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
      <header className="border-b-slate-200 border-b-2">
        <h2 className="font-bold text-xl mb-6 flex align-middle gap-x-1">
          <span className="material-icons">login</span>
          Sales
        </h2>
        <nav className="px-0 py-4">
          <ul className="flex gap-12">
            <LinkItem text="Overview" linkTo="overview" />
            <LinkItem text="Subscriptions" linkTo="subscriptions" />
            <LinkItem text="Invoices" linkTo="invoices" prefetch />
            <LinkItem text="Customers" linkTo="customers" />
            <LinkItem text="Deposits" linkTo="deposits" />
          </ul>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  );
}
