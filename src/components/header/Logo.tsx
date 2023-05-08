import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'

export default function Logo() {
  return (
    <div className="flex gap-1 items-center">
      <Link to="/">
        <img src={logo} alt="logo" className="w-10 h-10" />
      </Link>
    </div>
  )
}
