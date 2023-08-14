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
    connectWallet: () => Promise<void>
    web3Button: JSX.Element 
}

const Layout: FunctionComponent<LayoutProps> = ({ children, cart, isUserWalletConnected, checkingUserConnectivity, userAccount, connectWallet, web3Button }): ReactElement => {
    return (
        <>
            <Navbar
                cart={cart}
                isUserWalletConnected={isUserWalletConnected}
                checkingUserConnectivity={checkingUserConnectivity}
                userAccount={userAccount}
                web3Button={web3Button}
                connectWallet={connectWallet} />
            {children}
            <Footer />
        </>
    )
};

export default Layout;