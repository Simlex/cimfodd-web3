import { FunctionComponent, ReactElement, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Cart } from "@/models/Cart";

interface LayoutProps {
    children?: ReactNode;
    cart: Cart;
    isUserWalletConnected: boolean
    checkingUserConnectivity: boolean
    userAccount: number | undefined
}

const Layout: FunctionComponent<LayoutProps> = ({ children, cart, isUserWalletConnected, checkingUserConnectivity, userAccount }): ReactElement => {
    return (
        <>
            <Navbar cart={cart} isUserWalletConnected={isUserWalletConnected} checkingUserConnectivity={checkingUserConnectivity} userAccount={userAccount} />
            {children}
            <Footer />
        </>
    )
};

export default Layout;