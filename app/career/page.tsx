import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Job from "../components/job";

export default function Career() {
    return (
        <div className="flex flex-col min-h-screen">
            <div><Navbar/></div>
            <main className="flex-grow mt-40">
                <Job title={"undefined"} description={"undefined"} application={"undefined"}/>
            </main>
            <div><Footer/></div>
        </div>
    );
}