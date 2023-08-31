import Link from "next/link";


const Navbar = () => {
    return <>
        <nav className="bg-gray-800 py-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="mr-12">
                    <i className="fa-solid fa-house" style={{ color: '#ffffff' }}></i>
                </Link>


                {/* Icons */}
                <div className="flex items-center space-x-6 ">
                    <Link className="text-white mx-4" href={'/add-product'}>
                        <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
                    </Link>
                    <Link className="text-white mx-4" href={'/cart'}>
                        <i className="fa-solid fa-cart-shopping" style={{ color: "#ffffff" }}></i>
                    </Link>
                    <button className="text-white mx-4">
                        <i className="fa-solid fa-right-from-bracket" style={{ color: "#ffffff" }}></i>
                    </button>
                    {/* Add your logout button here */}
                </div>
            </div>
        </nav >






    </>
};
export default Navbar;