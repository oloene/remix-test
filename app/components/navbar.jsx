import { Link, NavLink } from "remix";

export default function Navbar() {
    return (
        <nav className="flex flex-col gap-10 py-5 px-7">
            <Link to="/" className="font-bold text-green-500">
                Fakebooks
            </Link>
            <ul className="flex font-bold flex-col gap-4">
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg inline-block w-full h-full px-3 py-2 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/dashboard"
                    >
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg inline-block w-full h-full px-3 py-2 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/accounts"
                    >
                        Accounts
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg inline-block w-full h-full px-3 py-2 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/sales"
                    >
                        Sales
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg inline-block w-full h-full px-3 py-2 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/expenses"
                    >
                        Expenses
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) =>
                            `hover:bg-slate-300 rounded-lg inline-block w-full h-full px-3 py-2 ${
                                isActive ? "bg-slate-300" : ""
                            }`
                        }
                        to="/reports"
                    >
                        Reports
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}
