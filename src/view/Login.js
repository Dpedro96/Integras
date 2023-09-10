import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLoginAndAuthenticate, handleForgotPassword } from "../controller/AuthController";
import { Link } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [mensagem, setMensagem] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignInForm = async (e) => {
        e.preventDefault();

        try {
            // Autentica o usuário com Firebase Auth
            await handleLoginAndAuthenticate(email, senha);
            localStorage.setItem("user", JSON.stringify({email, senha}));
            navigate("/Home");
        } catch (error) {
            alert("Erro ao autenticar usuário: " + error.message);
        }
    }

    const handleForgotPasswordClick = (e) => {
      e.preventDefault();
      handleForgotPassword(email)
          .then(() => {
              setMensagem("Um e-mail com as instruções para redefinir sua senha foi enviado para " + email);
          })
          .catch((error) => {
              if (error.code === "auth/user-not-found") {
                  setMensagem("O e-mail fornecido não está associado a nenhuma conta.");
              } else {
                  setMensagem("Ocorreu um erro ao tentar enviar o e-mail de redefinição de senha: " + error.message);
              }
          });
  }
  


  return (
    <div className="containerr">
      <div className="contente_login">
        <div className="login">
          {forgotPassword ? (
            <form onSubmit={handleForgotPasswordClick}>
              <h2>Esqueceu sua senha?</h2>
              <p>
                <label htmlFor="email">E-mail:</label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <input type="submit" value="Enviar link para redefinição de senha" />
              </p>
              <p className="link_l">
                Lembrou da senha?{" "}
                <a href="#" onClick={() => setForgotPassword(false)}>
                  Faça login
                </a>
              </p>
            </form>
          ) : (
            <form onSubmit={handleSignInForm}>
              <h2>L O G I N</h2>
              <p>
                <label htmlFor="email_login">E-mail:</label>
                <input
                  id="email"
                  name="email"
                  required
                  value={email}
                  placeholder="Digite seu email..."
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <label htmlFor="senha_login">Senha:</label>
                <input
                  id="senha"
                  name="senha"
                  required
                  type="password"
                  value={senha}
                  placeholder="Digite sua senha..."
                  onChange={(e) => setSenha(e.target.value)}
                />
              </p>
              <p>
                <input type="checkbox" name="manterlogado" id="manterlogado" value="" />
                <label htmlFor="manterlogado">Manter-me logado</label>
              </p>
              <p>
                <input type="submit" value="Logar" />
              </p>
              <p className="link_l">
                Ainda não tem conta?{" "}
                <Link to="/Cadastro">
                  <span>Cadastre-se</span>
                </Link>
              </p>
              <p className="link_r">
                <a href="#" onClick={handleForgotPasswordClick}>
                  Esqueceu sua senha?
                </a>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
