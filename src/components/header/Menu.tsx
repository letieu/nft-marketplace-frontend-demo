import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="flex item-center gap-6 ml-[44px]">
      <Link to="/" className="text-sm transition-colors duration-200 text-gray-500 hover:text-gray-800">
        Home
      </Link>

      <Link to="/" className="text-sm transition-colors duration-200 text-gray-500 hover:text-gray-800">
        Create
      </Link>
    </div>
  )
}
