import { FunctionComponent, ReactElement, ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Cart } from "@/models/Cart";

interface LayoutProps {
    children?: ReactNode;
    cart: Cart
}

const Layout: FunctionComponent<LayoutProps> = ({ children, cart }): ReactElement => {
    return (
        <>
            <Navbar cart={cart} />
            {children}
            <Footer />
        </>
    )
};

export default Layout;