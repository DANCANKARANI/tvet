import Contact from "../components/contact"
import Footer from "../components/footer"
import Navbar from "../components/navbar"
export default function ContatactUs(){
    return(
        <div className="flex flex-col min-h-screen">
        <Navbar name={""}/>
        <main className="flex-grow mt-40">
            <Contact/>
        </main>
        <Footer />
     </div>
    )
}