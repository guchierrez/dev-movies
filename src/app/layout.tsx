import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import { Navbar } from "./components/general/Navbar";
import { ToastContainer } from "react-toastify";

export const metadata: Metadata = {
  title: "devmovies",
  description:
    "Descubra o cinema como nunca antes! Poste a sua avaliação agora!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://s.widget-club.com/samples/qhOysJ0blDPleYmNQx5jac0EYt93/eb2d5poXNoUdqMOlXpII/8864D8F3-D90B-4A52-8CE7-511CCC9E1B33.jpg?q=70"
        />
      </head>
      <body className="bg-base-200 scrollbar-thin scrollbar-thumb-primary scrollbar-track-inherit">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <Navbar>{children}</Navbar>
      </body>
    </html>
  );
}
