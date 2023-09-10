import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ContaCorrenteController from "../controller/ContaCorrenteController";
import "../resources/CSS/ContaCorrente.css";

function ContaCorrente() {
  const navigate = useNavigate();

  const controllerCallback = useCallback(() => {
    return new ContaCorrenteController();
  }, []);
  const controller = controllerCallback();

  const [nomeBanco, setNomeBanco] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  const [data, setData] = useState("");
  const [erro, setErro] = useState("");

  const handleSalvar = async (e) => {
    e.preventDefault();
    try {
      console.log(
        "Salvando conta corrente com os seguintes dados:",
        nomeBanco,
        rendaMensal,
        data
      );
      const contaCorrente = await controller.salvarContaCorrente(
        nomeBanco,
        rendaMensal,
        data,
        controller.auth.currentUser.email
      );
      if (contaCorrente) {
        window.alert("Dados salvos com sucesso!");
        navigate("/home");
      } else {
      }
    } catch (error) {
      window.alert("Erro ao salvar conta corrente: " + error.message); // Esta é a linha adicionada.
      setErro(error.message);
    }
  };

  return (
    <div className="fundo_CC">
      <div className="form">
        <h1>Renda Bruta</h1>
        <p>
          <label htmlFor="iNBanco">Nome Banco</label>
          <input
            className="NBanco"
            id="iNBanco"
            placeholder="Digite o nome do seu Banco"
            value={nomeBanco}
            onChange={(e) => setNomeBanco(e.target.value)} // Adicionado
          />
        </p>
        <p>
          <label htmlFor="iRMensal">Renda Mensal</label>
          <input
            className="NBanco"
            id="iRMensal"
            placeholder="Digite sua renda mensal fixa"
            type="number"
            min="0"
            step="0.01"
            required
            value={rendaMensal} // Adicionado
            onChange={(e) => setRendaMensal(e.target.value)} // Adicionado
          />
        </p>
        <p>
          <label htmlFor="iData">Data</label>
          <input
            type="date"
            className="Data"
            id="iData"
            value={data} // Adicionado
            onChange={(e) => setData(e.target.value)} // Adicionado
          />
        </p>
        <div className="btnSubmit">
          <input
            type="submit"
            className="btCC"
            value="Salvar"
            onClick={handleSalvar}
          />
        </div>
      </div>
      {erro && <p className="erro">{erro}</p>}
    </div>
  );
}

export default ContaCorrente;
