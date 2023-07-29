import { LoginModal } from "../components/general/LoginModal";

export default function Login() {
  return (
    <main className="min-h-screen overflow-hidden relative">
      <img
        src="https://i.ibb.co/XXSkqGC/Rectangle-13.png"
        alt="background-img"
        className="object-cover w-full h-screen"
      />
      <LoginModal />
    </main>
  );
}
