import { Link, NavLink } from "remix";

function LinkItem({ title = "", iconName = "", linkTo = "" }) {
  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          `hover:bg-slate-300 rounded-lg w-full h-full px-3 py-2 flex align-middle gap-x-2 ${
            isActive ? "bg-slate-300" : ""
          }`
        }
        to={linkTo}
      >
        {iconName ? <span className="material-icons">{iconName}</span> : null}
        {title}
      </NavLink>
    </li>
  );
}

export default function Navbar() {
  return (
    <nav className="flex flex-col gap-10 py-5 px-7">
      <Link to="/" className="font-bold text-xl text-green-500">
        Fakebooks
      </Link>

      <ul className="flex font-bold flex-col gap-4">
        <LinkItem title="Dashboard" iconName="dashboard" linkTo="dashboard" />
        <LinkItem
          title="Accounts"
          iconName="account_balance"
          linkTo="accounts"
        />
        <LinkItem title="Sales" iconName="attach_money" linkTo="sales" />
        <LinkItem title="Expenses" iconName="payments" linkTo="expenses" />
        <LinkItem title="Reports" iconName="flag" linkTo="reports" />
      </ul>
    </nav>
  );
}
