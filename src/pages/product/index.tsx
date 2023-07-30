import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState, ReactElement, FunctionComponent } from "react";
import useResponsive from "../../components/hooks/useResponsiveness";
import styles from "../../styles/Product.module.scss";
import { CakeIcon, CaretLeftIcon, CloseIcon, DrinkIcon, FastFoodIcon, HamburgerIcon, HomeIcon } from "@/components/SVGs/SVGicons";
import { Product } from "@/models/ProductResponse";

interface ProductProps {
    products: Product[] | undefined
}

const Product: FunctionComponent<ProductProps> = ({ products }): ReactElement => {

    console.log("All products: ", products);

    const onMobile = useResponsive();

    const [selectedCategory, setSelectedCategory] = useState("All foods");
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    const [filteredProduct, setFilteredProduct] = useState();

    const filterProductsByCategory = (nameOfProduct: string) => {
        console.log('Filtering products');

        let filter;

        if (nameOfProduct === 'All') {
            filter = products;
            setSelectedCategory('All foods');
        } else {
            filter = products?.filter((filteredProduct: Product) => filteredProduct.title == nameOfProduct);
            setSelectedCategory(nameOfProduct);
        }

        console.log("filter: ", filter);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Products | Cimfodd</title>
                <meta name="description" content="Best pizza shop in town" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className={styles.productsArea}>
                {!onMobile && (
                    <div className={styles.sideBar}>
                        <div className={styles.sideBar__section}>
                            <Link href="/">
                                <CaretLeftIcon /> Back to homepage
                            </Link>
                        </div>
                        <div className={styles.sideBar__section}>
                            <p className={styles.heading}>CATEGORIES </p>
                            <a onClick={() => filterProductsByCategory('All')}>
                                <FastFoodIcon /> All foods
                            </a>
                            <a onClick={() => filterProductsByCategory("Pizza")}>
                                <CakeIcon /> Pizza
                            </a>
                            <a>
                                <DrinkIcon /> Drinks
                            </a>
                        </div>
                        <div className={styles.sideBar__section}>
                            <p className={styles.heading}>OTHER</p>
                            <a>
                                <div className={styles.cart}>Cart</div>
                                <span>2</span>
                            </a>
                        </div>
                        <div className={styles.accountArea}>
                            <div className={styles.image}>
                                <Image src="/img/user.png" alt="" width={100} height={100} />
                            </div>
                            <h4>Theresa Webb</h4>
                            <p>Customer</p>
                        </div>
                    </div>
                )}

                {mobileMenuVisible && (
                    <div className={styles.mobileMenuContainer}>
                        <div className={styles.mobileMenuContainer__section}
                            onClick={() => setMobileMenuVisible(false)}>
                            <span>
                                <CloseIcon /> Close
                            </span>
                        </div>
                        <div className={styles.mobileMenuContainer__section}>
                            <p className={styles.heading}>CATEGORIES </p>
                            <a onClick={() => filterProductsByCategory('All')}>
                                <FastFoodIcon /> All foods
                            </a>
                            <a onClick={() => filterProductsByCategory("Pizza")}>
                                <CakeIcon /> Pizza
                            </a>
                            <a>
                                <DrinkIcon /> Drinks
                            </a>
                        </div>
                    </div>
                )}

                <div className={styles.mainArea}>
                    <div className={styles.topArea}>
                        <div
                            className={styles.categorySelector}
                            onClick={() => setMobileMenuVisible(true)}
                        >
                            <HamburgerIcon /> Select category
                        </div>
                        <Link href="/">
                            <HomeIcon /> Back to homepage
                        </Link>
                    </div>
                    <h2>{selectedCategory}</h2>
                    <div className={styles.products}>
                        {products &&
                            products.map((each, index) => (
                                <div key={index}>
                                    <Link href={`/product/${each._id}`} passHref>
                                        <div className={styles.eachProduct}>
                                            <div className={styles.image}>
                                                <Image src={each.img} alt="" fill />
                                            </div>
                                            <h3>{each.title}</h3>
                                            <p className={styles.desc}>{each.desc}</p>
                                            {/* <p className={styles.price}>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(each.prices[Math.floor(Math.random() * 3)])}</p> */}
                                            <p className={styles.price}>
                                                Starting price:{" "}
                                                {new Intl.NumberFormat("en-US", {
                                                    style: "currency",
                                                    currency: "NGN",
                                                }).format(each.prices[0])}
                                            </p>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        {products && products.length < 1 && (
                            <p>No products available</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;


export const getServerSideProps = async () => {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/products`);
    return {
        props: {
            products: res.data as Product[],
        },
    };
};
