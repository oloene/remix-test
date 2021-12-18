import { Link, NavLink } from "remix";

export default function Navbar() {
    return (
        <nav className="flex flex-col gap-10 py-5 px-7">
            <Link to="/" className="font-bold text-xl text-green-500">
                Fakebooks
            </Link>

            <ul className="flex font-bold flex-col gap-4">
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg w-full h-full px-1 py-2 flex align-middle gap-x-1 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/dashboard"
                    >
                        <span className="material-icons">dashboard</span>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg w-full h-full px-1 py-2 flex align-middle gap-x-1 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/accounts"
                    >
                        <span className="material-icons">account_balance</span>
                        Accounts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg w-full h-full px-1 py-2 flex align-middle gap-x-1 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/sales"
                    >
                        <span className="material-icons">attach_money</span>
                        Sales
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg w-full h-full px-1 py-2 flex align-middle gap-x-1 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/expenses"
                    >
                        <span className="material-icons">payments</span>
                        Expenses
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg w-full h-full px-1 py-2 flex align-middle gap-x-1 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/reports"
                    >
                        <span className="material-icons">flag</span>
                        Reports
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
