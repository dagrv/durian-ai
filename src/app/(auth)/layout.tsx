interface Props {
    children: React.ReactNode;
}

const Layout = ({children}: Props) => {
  return (
    <div className="md:p-10 flex flex-col min-h-svh items-center justify-center">
        <div className="w-full max-w-sm md:max-w-3xl text-white">
            {children}
        </div>
    </div>
  )
}

export default Layout;