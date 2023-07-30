import { FunctionComponent, ReactElement } from 'react';
import Image from "next/image";
import styles from "../../styles/PizzaCard.module.scss";
import Link from "next/link";
import ImageLoader from "../custom/ImageLoader";
import { Product } from '@/models/ProductResponse';

interface PizzaCardProps {
    product: Product
}

const PizzaCard: FunctionComponent<PizzaCardProps> = ({ product }): ReactElement => {
    return (
        <div className={styles.productCard}>
            <Link href={`/product/${product._id}`} passHref>
                <div className={styles.productCard__image}>
                    {product ? (
                        <Image src={product.img} alt="" fill />
                    ) : (
                        <ImageLoader />
                    )}
                </div>
            </Link>
            <Link href={`/product/${product._id}`} passHref>
                <p className={styles.productTitle}>{product.title}</p>
            </Link>
            <p className={styles.productDesc}>{product.desc}</p>
            <div className={styles.cta}>
                <span>
                    {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "NGN",
                    }).format(product.prices[0])}
                </span>
                <Link href={`/product/${product._id}`} passHref>
                    <button>Buy now</button>
                </Link>
            </div>
        </div>
    );
}

export default PizzaCard;