import { useEffect, useState } from 'react';
import Layout from '@/components/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Image from 'next/image';
import images from '../../public/images';
import { Product } from '@/models/ProductResponse';
import { Cart } from '@/models/Cart';
import axios from 'axios'

export default function App({ Component, pageProps }: AppProps) {

    const [loaderIsVisible, setLoaderIsVisible] = useState(true);
    const [isFetchingProducts, setIsFetchingProducts] = useState(false);

    const [products, setProducts] = useState<Product[]>();

    // Initialize the cart state
    const [cart, setCart] = useState<Cart>({
        products: [],
        quantity: 0,
        total: 0,
    });

    async function getAllProducts() {
        setIsFetchingProducts(true);

        await axios.get(`${process.env.NEXTAUTH_URL}/api/products`)
            .then((response) => {
                console.log(response);
                setProducts(response.data);
                // close loader 
                setIsFetchingProducts(false);
            })
            .catch((error) => {
                console.log(error);
            })
            .finally(() => {
                // close loader 
                setIsFetchingProducts(false);
            })
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoaderIsVisible(false);
        }
    }, []);

    useEffect(() => {
        getAllProducts();
    }, []);

    // function updateCart(product: Product) {
    //     let _cart = cart;

    //     // _cart?.products.push(product); 

    //     // setCart();

    //     console.log({product})
    //     console.log({cart})
    //     console.log({_cart})
    // } 

    // Function to update the cart state
    const updateCart = (product: Product) => {
        if (cart.products.length == 0) {
            // Handle the case when cart is empty
            setCart({
                products: [...cart.products, { ...product, quantity: 1 }],
                quantity: cart.quantity + 1,
                total: cart.total + 0,
            })
        }
        setCart(
            (prevCart) => {
                // Check if the product is already in the cart
                const existingProduct = prevCart.products.find((item) => item._id === product._id);

                if (existingProduct) {
                    // If the product exists in the cart, update its quantity and total
                    const updatedProducts = prevCart.products.map((item) =>
                        item._id === product._id ? { ...item, quantity: item.quantity && item.quantity + 1 } : item
                    );

                    return {
                        ...prevCart,
                        products: updatedProducts,
                        quantity: prevCart.quantity + 1,
                        total: prevCart.total + product.price,
                    };
                } else {
                    // If the product is not in the cart, add it as a new item
                    return {
                        ...prevCart,
                        products: [...prevCart.products, { ...product, quantity: 1 }],
                        quantity: prevCart.quantity + 1,
                        total: prevCart.total + product.price,
                    };
                }
            }
        );
        // console.log({ cart });
    };

    pageProps = {
        cart: cart,
        updateCart: updateCart,
        products: products
    }

    return <>
        {!loaderIsVisible && <Layout cart={cart}>
            <Component {...pageProps} />
        </Layout>}
        {loaderIsVisible && <div className="splashScreen">
            <div className="image">
                <Image src={images.logoBlack} alt='logo' />
            </div>
        </div>}
    </>
}
