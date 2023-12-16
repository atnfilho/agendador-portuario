import Body from "./Body";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout({ children }: any) {
    return (
        <>
            <Header />
            <Body>
                {children}
            </Body>
            <Footer />
        </>
    )
}