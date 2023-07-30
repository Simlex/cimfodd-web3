import Image from "next/image";
import styles from "../styles/Navbar.module.scss";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useEffect, ReactElement, FunctionComponent } from "react";
import { useState } from "react";
import { FastFoodIcon, UserIcon } from "./SVGs/SVGicons";
import { Cart } from "@/models/Cart";
import images from "../../public/images";

interface NavbarProps {
    cart: Cart | undefined
}

const Navbar: FunctionComponent<NavbarProps> = ({ cart }): ReactElement => {

    const [accountDropdownVisibility, setAccountDropdownVisibility] = useState(false);

    console.log({cart});

    const [admin, setAdmin] = useState(false);

    //   function getTokenFromCookie(token) {
    //     let name = token + "=";
    //     let decodedCookie = decodeURIComponent(typeof document !== 'undefined' && document.cookie);
    //     let ca = decodedCookie.split(";");
    //     for (let i = 0; i < ca.length; i++) {
    //       let c = ca[i];
    //       while (c.charAt(0) == " ") {
    //         c = c.substring(1);
    //       }
    //       if (c.indexOf(name) == 0) {
    //         return c.substring(name.length, c.length);
    //       }
    //     }
    //     return "";
    //   }

    //   let token = getTokenFromCookie("token");

    //   useEffect(() => {
    //     // If token is available
    //     if (token != "") {
    //       setAdmin(true);
    //     }
    //   }, [token]);

    return (
        <div className={styles.container}>
            <Link href="/" passHref>
                <div className={styles.item}>
                    <div className={styles.callButton}>
                        <Image src={images.logo} alt="" fill />
                        {/* <FastFoodIcon width="24" height="24" color="#84B74E" /> */}
                    </div>
                    {/* <div className={styles.texts}>
                        <div className={styles.text}>Cimfodd</div>
                    </div> */}
                </div>
            </Link>
            <div className={styles.item}>
                <ul className={styles.list}>
                    <Link href="/" passHref>
                        <li className={styles.listItem}>Homepage</li>
                    </Link>
                    <Link href="/product" passHref>
                        <li className={styles.listItem}>Products</li>
                    </Link>
                    <li className={styles.listItem}>Customer care</li>
                </ul>
            </div>
            <div className={styles.right}>
                {!admin && (
                    <div
                        onClick={() =>
                            setAccountDropdownVisibility(!accountDropdownVisibility)
                        }
                    >
                        <UserIcon fontSize={30} color="#fff" />
                    </div>
                )}
                {accountDropdownVisibility && (
                    <div
                        className={styles.accountDropdown}
                        onClick={() => setAccountDropdownVisibility(false)}
                    >
                        <Link href="/account/login" target="_blank" passHref>
                            <p>Login</p>
                        </Link>
                        <Link href="/account/register" target="_blank" passHref>
                            <p>Register</p>
                        </Link>
                    </div>
                )}
            </div>
            <Link href="/cart" passHref>
                <div className={styles.cartItem}>
                    <div className={styles.cart}>
                        <Image src="/img/cart.png" alt="" width={24} height={24} />
                        <div className={styles.counter}>{cart?.products.length ?? 0}</div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Navbar;