import Navbar from "../components/navbar";
import Footer from "../components/footer"
import Main from "../components/main"


export default function Page() {
    return (
     <div className="flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-grow mt-40">
            <Main />
        </main>
        <Footer />
     </div>
    );
}
