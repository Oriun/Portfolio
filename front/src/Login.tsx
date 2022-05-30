import React from "react";
import "./Login.scss";

type ContentProps = {
  toggle: () => void;
};
const LoginContent: React.FC<ContentProps> = ({ toggle }) => (
  <div className="content">
    <div
      className="avatar"
      style={{ backgroundImage: "url('/img/dexter.webp')" }}
    />
    <h2>Arnaud</h2>
    <div className="input">Mot de passe</div>
    <span>
      Vous pouvez aussi créer une session <span onClick={toggle}>ici</span>
    </span>
  </div>
);
const SigninContent: React.FC<ContentProps> = ({ toggle }) => (
  <div className="content">
    <div
      className="avatar"
      style={{ backgroundImage: "url('/img/dexter.webp')" }}
    />
    <h2>Créer une session</h2>
    <div className="input">Mot de passe</div>
    <div className="input">Mot de passe</div>
    <span>
    Connectez-vous à votre session <span onClick={toggle}>ici</span>
    </span>
  </div>
);
type LoginProps = {
  log: (a: any) => void;
};

const Login: React.FC<LoginProps> = ({ log }) => {
  const [active, activate] = React.useState<boolean>(false);
  const [mode, setM] = React.useState<"login" | "signin">("login");

  React.useEffect(() => {
    if (!active) {
      // @ts-ignore
      window.app_start.then(activate);
    }
  }, []);
  if (!active) return <></>;

  function toggle() {
    setM((a) => (a === "login" ? "signin" : "login"));
  }
  return (
    <main
      className="login"
      style={{ backgroundImage: `url("/img/monterey-bg.jpg")` }}
    >
      <div />
      {mode === "login" ? (
        <LoginContent toggle={toggle} />
      ) : (
        <SigninContent toggle={toggle} />
      )}
      <div />
    </main>
  );
};

export default Login;
