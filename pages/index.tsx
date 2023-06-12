import styles from "@/styles/Home.module.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Main from "./components/Main";

export default function Home() {
  return (
    <div className="flex flex-col text-center h-screen font-sans gap-10 p-6 bg-gray-800">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
