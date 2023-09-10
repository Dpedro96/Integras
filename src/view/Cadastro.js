import { Navigate } from 'react-router-dom';
import { useCadastroController } from '../controller/CadastroController';
import React from 'react';
import { Link } from 'react-router-dom';
import "../resources/CSS/Cadastro.css";


export const Cadastro = () => {
  const { userDTO, setUserDTO, cadastradoComSucesso, criarUsuario } = useCadastroController();


  return (
    <div className="containerr">
      <div className="contente_cadastro">      
        <div className="cadastro">
          <form onSubmit={criarUsuario}> 
            {cadastradoComSucesso && <Navigate to="/home" />}
            <h2>C A D A S T R O</h2> 
            <label htmlFor="nome_cad">Nome: </label>
            <input id="nome" name="nome" value={userDTO.nome} onChange={(e) => setUserDTO({ ...userDTO, nome: e.target.value })}/>
            <label htmlFor="email_cad">E-mail: </label>
            <input id="email" name="email" value={userDTO.email} onChange={(e) => setUserDTO({ ...userDTO, email: e.target.value })}/> 
            <label htmlFor="cpf_cad">CPF: </label>
            <input id="cpf" name="cpf" value={userDTO.cpf} onChange={(e) => setUserDTO({ ...userDTO, cpf: e.target.value })}/> 
            <label htmlFor="tel_cad">Telefone: </label>
            <input id="tel" name="tel" type="tel" value={userDTO.telefone} onChange={(e) => setUserDTO({ ...userDTO, telefone: e.target.value })}/> 
            <label htmlFor="senha_cad">Senha: </label>
            <input id="senha" name="senha" type="password" value={userDTO.senha} onChange={(e) => setUserDTO({ ...userDTO, senha: e.target.value })}/>
            <input type="submit" value="Cadastrar"/> 
            <p className="link_c">  
              Já tem conta?
              <Link to="/Login">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Cadastro;
