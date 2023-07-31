import { useEffect, useState } from 'react';
import Layout from '@/components/Layout'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Image from 'next/image';
import images from '../../public/images';
import { Product } from '@/models/ProductResponse';
import { Cart } from '@/models/Cart';
import axios from 'axios'
import Web3 from 'web3';

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
        console.log('Fetching products');

        await axios.get(`${process.env.NEXTAUTH_URL}/api/products`)
            .then((response) => {
                console.log(response);
                setProducts(response.data);
                // close loader 
                setIsFetchingProducts(false);
            })
            .catch((error) => {
                console.log(error);
                // close loader 
                setIsFetchingProducts(false);
            })
            .finally(() => {
                // close loader 
                setIsFetchingProducts(false);
            })
    }
    ///TODO: Create spinner that loads when app comes up, the spinner loads till we check if an account exists, so we render button afterwards

    const [correctNetwork, setCorrectNetwork] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    const [currentAccount, setCurrentAccount] = useState<number>();
    const [checkingUserConnectivity, setCheckingUserConnectivity] = useState(false);
    const [balance, setBalance] = useState<number | null>(null);

    // Calls Metamask to connect wallet on clicking Connect Wallet button
    const connectWallet = async () => {

        setCheckingUserConnectivity(true);

        try {
            // const { ethereum } = window
            const ethereum: any = 'ethereum' in window ? window.ethereum : undefined;
            if (!ethereum) {
                console.log('Metamask is not detected');
                return;
            }
            let chainId = await ethereum.request({ method: 'eth_chainId' })
            console.log('connected to chain: ', chainId)

            const sepoliaChainId = '0xaa36a7' // Specify chain id

            if (chainId !== sepoliaChainId) {
                alert('You are not connected to the sepolia testnet');
                setCorrectNetwork(false);
                return;
            } else {
                setCorrectNetwork(true);
            }

            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });

            console.log('Found account', accounts[0])


            // Update user connectivity status 
            setIsUserLoggedIn(true);

            // Set user account 
            setCurrentAccount(accounts[0]);

            retrieveBalance(ethereum, accounts);

            setCheckingUserConnectivity(false);

        } catch (error) {
            console.log(error);

            setCheckingUserConnectivity(false);
        }
    }

    async function retrieveBalance(ethereum: any, accounts: any) {

        // Create a Web3 instance with the provider
        const web3 = new Web3(ethereum);

        // Get the account balance
        const balanceWei = await web3.eth.getBalance(accounts[0]);

        // Convert the balance from Wei to Ether
        const balanceEther = web3.utils.fromWei(balanceWei, 'ether');

        console.log('Account balance:', balanceEther, 'ETH');

        // Set the balance in the state or do anything else with it
        setBalance(parseFloat(balanceEther));

        setCheckingUserConnectivity(false);
    }

    useEffect(() => {
        if (typeof window !== "undefined") {
            setLoaderIsVisible(false);
        }
    }, []);

    useEffect(() => {
        getAllProducts();
    }, []);

    // Run connect wallet function automically when app loads...
    useEffect(() => {
        connectWallet();
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
        products: products,
        isFetchingProducts: isFetchingProducts,
        isUserWalletConnected: isUserLoggedIn,
        checkingUserConnectivity: checkingUserConnectivity,
        balance: balance,
        userAccount: currentAccount
    }

    return <>
        {!loaderIsVisible &&
            <Layout cart={cart} isUserWalletConnected={isUserLoggedIn} checkingUserConnectivity={checkingUserConnectivity} userAccount={currentAccount}>
                <Component {...pageProps} />
            </Layout>}
        {loaderIsVisible && <div className="splashScreen">
            <div className="image">
                <Image src={images.logoBlack} alt='logo' />
            </div>
        </div>}
    </>
}
