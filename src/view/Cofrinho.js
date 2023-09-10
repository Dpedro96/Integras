import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { CofrinhoController } from '../controller/CofrinhoController';
import "../resources/CSS/Cofrinho.css";

function Cofrinho() {
  const navigate = useNavigate();
  const controller = new CofrinhoController();

  const [nomeCofrinho, setNomeCofrinho] = useState("");
  const [descricaoCofrinho, setDescricaoCofrinho] = useState("");
  const [valorMensalCofrinho, setValorMensalCofrinho] = useState(0);
  const [metaCofrinho, setMetaCofrinho] = useState(0);

  const handleChangeNomeCofrinho = (event) => {
    setNomeCofrinho(event.target.value);
  };

  const handleChangeDescricaoCofrinho = (event) => {
    setDescricaoCofrinho(event.target.value);
  };

  const handleChangeValorMensalCofrinho = (event) => {
    setValorMensalCofrinho(event.target.value);
  };

  const handleChangeMetaCofrinho = (event) => {
    setMetaCofrinho(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
        const data = {
            nomeCofrinho,
            descricaoCofrinho,
            valorMensalCofrinho,
            metaCofrinho
        };
  
        const response = await controller.createCofrinho(data);
  
        if (response && response.data) {
            window.alert("Cofrinho criado com sucesso!");
            navigate("/home");
        }
    } catch (error) {
        console.log("Erro original:", error.message); // Log do erro original
        
        const errorMessage = error.message || "Erro desconhecido";
        console.log("Mensagem de erro a ser exibida:", errorMessage);
        
        window.alert(errorMessage);
    }
};


  

  return (
    <div className="fundo_cofrinho">
      <div className="corpo_cofrinho">
        <form onSubmit={handleSubmit}>
          <h2>C o f r i n h o</h2>
          <p>
            <label htmlFor="nomeCofrinho">Nome do Cofrinho </label>
            <input
              type="text"
              id="nomeCofrinho"
              value={nomeCofrinho}
              onChange={handleChangeNomeCofrinho}
              placeholder="Insira o nome do cofrinho"
              required
            />
          </p>
          <p>
            <label htmlFor="descricaoCofrinho">Descrição do Cofrinho </label>
            <input
              type="text"
              id="descricaoCofrinho"
              value={descricaoCofrinho}
              onChange={handleChangeDescricaoCofrinho}
              placeholder="Insira uma breve descrição"
              required
            />
          </p>
          <p>
            <label htmlFor="valorMensalCofrinho">Valor inicial a ser depositado: </label>
            <input
              type="number"
              id="valorMensalCofrinho"
              value={valorMensalCofrinho}
              onChange={handleChangeValorMensalCofrinho}
              placeholder="Insira o valor inicial que deseja colocar no cofrinho..."
              required
            />
          </p>
          <p>
            <label htmlFor="metaCofrinho">Meta que deseja alcançar: </label>
            <input
              type="number"
              id="metaCofrinho"
              value={metaCofrinho}
              onChange={handleChangeMetaCofrinho}
              placeholder="Insira o valor que deseja alcançar com a economia..."
              required
            />
          </p>
          <div className="btnSubmit">
          <input type="submit" value="Criar Cofrinho"/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Cofrinho;
