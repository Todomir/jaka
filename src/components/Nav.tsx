import Button from './Button'

const Nav: React.FC = () => {
  return (
    <nav>
      <section className="px-10 py-5 flex justify-between items-center dark:bg-gray-900">
        <p className="font-black font-cursive text-xl tracking-tighter dark:text-white">
          JAKA
        </p>

        <div className="flex space-x-10">
          <Button label="Login" color="primary" small />
          <Button label="Register now" color="primary" outlined small />
        </div>
      </section>
    </nav>
  )
}

export default Nav
