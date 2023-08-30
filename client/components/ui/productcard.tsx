interface ProductCardProps {
    name: string; // Properly annotate the type of 'name' prop
    price: number;
    imageUrl: string;
    AddToCart: () => void
}

const Productcard = ({ name, price, imageUrl, AddToCart }: ProductCardProps) => {

    return <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <img className="p-8 rounded-t-lg" src={imageUrl} alt="product image" style={{ maxHeight: "240px" }} />

        <div className="px-5 pb-5">
            <a href="#">
                <h5 className="text-xl font-semibold tracking-tight mx-2 pb-4 text-gray-900 dark:text-white">{name}</h5>
            </a>

            <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">${price}</span>
                <button onClick={() => AddToCart} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to Cart</button>
            </div>
        </div>
    </div>

}

export default Productcard;