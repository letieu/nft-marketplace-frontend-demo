import ConnectWallet from "./ConnectWallet";
import Logo from "./Logo";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className="h-[64px] sticky top-0 z-50 flex flex-col w-full antialiased backdrop-blur-sm backdrop-saturate-200 bg-white/80 dark:bg-black/50">
      <nav className="mb-[-1px] h-full flex items-center w-full max-w-screen-xl px-4 mx-auto">
        <Logo />
        <Menu />
        <ConnectWallet />
      </nav>
    </header >
  )
}
