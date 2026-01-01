import { useState } from "react";
import Login from "./Login";
import Register from "./Register";

type Screen = "login" | "register";

export default function App() {
  const [screen, setScreen] = useState<Screen>("login");

  if (screen === "register") {
    return <Register onBackToLogin={() => setScreen("login")} />;
  }

  return (
    <Login
          onLoginSuccess={() => alert("Đăng nhập OK")}
          onGoRegister={() => setScreen("register")} onForgotPassword={function (): void {
              throw new Error("Function not implemented.");
          } }    />
  );
}
