import styles from "../../styles/Product.module.scss";
import Image from "next/image";
import { useState, ChangeEvent, ReactElement, FunctionComponent, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { ExtraOptions, Product } from "@/models/ProductResponse";
import { useRouter } from "next/router";
import { Cart } from "@/models/Cart";

interface ProductProps {
    // cart: Cart | undefined
    updateCart: (product: Product) => void
}

const Product: FunctionComponent<ProductProps> = ({ updateCart }): ReactElement => {

    const router = useRouter();
    const { productId } = router.query;
    // console.log({ productId })

    const [product, setProduct] = useState<Product>();
    const [price, setPrice] = useState(product?.prices[0] ?? 0);
    const [size, setSize] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [extras, setExtras] = useState<ExtraOptions[]>([]);

    // const [selectedProduct, setSelectedProduct] = useState<SelectedProduct>();
    // useEffect(() => {
    //     if (product) {
    //         setSelectedProduct({
    //             ...product
    //         })
    //     }
    // }, [product]);
    // const dispatch = useDispatch();

    const changePrice = (number: number) => {
        setPrice(price + number);
    };

    const handleSize = (sizeIndex: number) => {
        if (!product) { return }
        const difference = product.prices[sizeIndex] - product.prices[size];
        setSize(sizeIndex);
        changePrice(difference);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, option: ExtraOptions) => {
        const checked = e.target.checked;

        if (checked) {
            changePrice(option.price);
            setExtras((prev) => [...prev, option]);
        } else {
            changePrice(-option.price);
            setExtras(extras.filter((extra) => extra._id !== option._id));
        }
    };

    const selectedProduct = {
        ...product,
        _id: product?._id as string,
        title: product?.title as string,
        desc: product?.desc as string,
        img: product?.img as string,
        prices: product?.prices as number[],
        extraOptions: product?.extraOptions as ExtraOptions[],
        createdAt: product?.createdAt as string,
        updatedAt: product?.updatedAt as string,
        __v: product?.__v as number,
        extras: extras,
        price: price,
        quantity: quantity,
    }

    // const handleClick = () => {
    //     dispatch(addProduct({ ...product, extras, price, quantity }));
    // };

    async function getProduct() {
        await axios.get(`${process.env.NEXTAUTH_URL}/api/products/${productId}`)
            .then((response) => {
                console.log(response);
                setProduct(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        if (router.isReady)
            getProduct();
    }, [router.isReady])

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.imgContainer}>
                    <Image src={product?.img as string} fill alt="" />
                </div>
            </div>
            <div className={styles.right}>
                <h1 className={styles.title}>{product?.title}</h1>
                <span className={styles.price}>${price}</span>
                <p className={styles.desc}>{product?.desc}</p>
                <h3 className={styles.choose}>Choose the size</h3>
                <div className={styles.sizes}>
                    <div className={styles.size} onClick={() => handleSize(0)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Small</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(1)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Medium</span>
                    </div>
                    <div className={styles.size} onClick={() => handleSize(2)}>
                        <Image src="/img/size.png" layout="fill" alt="" />
                        <span className={styles.number}>Large</span>
                    </div>
                </div>
                <h3 className={styles.choose}>Choose additional ingredients</h3>
                <div className={styles.ingredients}>
                    {product && product.extraOptions.map((option) => (
                        <div className={styles.option} key={option._id}>
                            <input
                                type="checkbox"
                                id={option.text}
                                name={option.text}
                                className={styles.checkbox}
                                onChange={(e) => handleChange(e, option)}
                            />
                            <label htmlFor="double">{option.text}</label>
                        </div>
                    ))}
                </div>
                <div className={styles.add}>
                    <input
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        type="number"
                        min={1}
                        defaultValue={1}
                        className={styles.quantity}
                    />
                    <button className={styles.button} onClick={() => {
                        if (product) {
                            updateCart(selectedProduct);
                        }
                    }}>
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Product;