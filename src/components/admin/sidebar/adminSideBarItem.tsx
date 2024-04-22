import Link from "next/link";
import { ChevronLeft } from "lucide-react";
const AdminSideBarItem = (props: {
  href: string;
  title: string;
  className: string;
  onClick: () => void;
}) => {
  return (
    <li
      className={`w-full text-gray-600 hover:text-grsy-900 hover:scale-110 text-xl py-2 transition-all ${props.className}`}
      onClick={props.onClick}
    >
      <Link href={props.href} className="flex justify justify-evenly">
        <div>{props.title}</div>
        <ChevronLeft />
      </Link>
    </li>
  );
};

export default AdminSideBarItem;
