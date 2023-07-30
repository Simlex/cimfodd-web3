import { FunctionComponent, ReactElement } from 'react';
import Link from "next/link";
import styles from "../../styles/PizzaList.module.scss";
import PizzaCard from "./PizzaCard";
import { CaretLeftIcon, CaretRightIcon } from '../SVGs/SVGicons';
import { Product } from '@/models/ProductResponse';
import SearchSpinner from '../Loader/SearchSpinner';

interface PizzaListProps {
    pizzaList: Product[] | undefined
}

const PizzaList: FunctionComponent<PizzaListProps> = ({ pizzaList }): ReactElement => {
    const newProductsArray = pizzaList?.slice(0, 5);

    return (
        <div className={`${styles.productsListContainer} ${styles.section}`}>
            <h2 className={styles.sectionhead}>Featured products</h2>
            <p className={styles.sectionSub}>
                Indulge in our top-rated dishes, made with the freshest ingredients and
                prepared to perfection. From savory starters to sweet treats,
                there&apos;s something for everyone to savor.
            </p>
            <div className={styles.productList}>
                {/* {newProductsArray?.map((eachProduct) => (
                    <PizzaCard key={eachProduct._id} product={eachProduct} />
                ))} */}
                {
                    pizzaList ? pizzaList.slice(0, 5).map((each) => (
                        <PizzaCard key={each._id} product={each} />
                    )) : <div className={styles.loader}>
                        <SearchSpinner />
                    </div>
                }
            </div>
            <div className={styles.mobileProductListContainer}>
                <span className={styles.navigation}>
                    <span>
                        <CaretLeftIcon />
                    </span>
                    <span>
                        <CaretRightIcon />
                    </span>
                </span>
                <div className={styles.mobileProductList}>
                    {newProductsArray?.map((eachProduct) => (
                        <PizzaCard key={eachProduct._id} product={eachProduct} />
                    ))}
                </div>
            </div>

            {pizzaList && <Link href="/product" passHref>
                <button className={styles.moreBtn}>
                    See more <CaretRightIcon />{" "}
                </button>
            </Link>}
        </div>
    );
}

export default PizzaList;