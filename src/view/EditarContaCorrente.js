import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import EditarContaCorrenteController from '../controller/EditarContaCorrenteController';
import '../resources/CSS/EditarCorrente.css';
import {observeAuthState} from '../common/FirebaseAuth'

function EditarContaCorrente() {
  const navigate = useNavigate();
  const controller = useMemo(() => new EditarContaCorrenteController(), []);
  
  const [ , setLoading] = useState(false);
  const [ , setError] = useState(null);
  const [contaCorrente, setContaCorrente] = useState({});
  const [nomeBanco, setNomeBanco] = useState("");
  const [rendaMensal, setRendaMensal] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    let unsubscribe = null;
  
    // Função separada para carregar a conta corrente
    const fetchCC = async (email) => {
      try {
        setLoading(true);
        const dataContaCorrente = await controller.buscarContaCorrentePorEmail(email);
        if (!dataContaCorrente) {
          throw new Error("No account found.");
        }
        setContaCorrente(dataContaCorrente);
        setNomeBanco(dataContaCorrente.nomeBanco);
        setRendaMensal(dataContaCorrente.rendaMensal);
        setData(dataContaCorrente.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err);
        alert("Você não possui conta corrente... Redirecionando");
        navigate("/contaCorrente");
      }
    };
  
    // Observando o estado de autenticação
    unsubscribe = observeAuthState((user) => {
      if (user && user.email) {
        fetchCC(user.email);
      } else {
        alert("Usuário não autenticado. Por favor, faça login novamente.");
        navigate("/login");
      }
    });
  
    return () => {
      if (unsubscribe) {
        unsubscribe(); // Limpa a inscrição quando o componente é desmontado
      }
    };
  }, [navigate, controller]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newRendaTotal = contaCorrente.rendaTotal + (parseFloat(rendaMensal) - contaCorrente.rendaMensal);

    try {
      await controller.atualizarContaCorrente(contaCorrente.id, nomeBanco, rendaMensal, newRendaTotal, data);
      alert("Dados atualizados com sucesso!");
      navigate("/home");
    } catch (err) {
      // setError(err.message);
    }
  };

  return (
    <div className='fundoECC'>
      <div className="info-container">
        <form onSubmit={handleSubmit}>
          <div className="info-box">
            <h1>Editar Renda</h1>
            <div className="form-group">
              <p>
                <label htmlFor="nomeBanco">Nome do banco:</label>
                <input
                  type="text"
                  id="nomeBanco"
                  className="nomeBanco"
                  value={nomeBanco}
                  onChange={(event) => setNomeBanco(event.target.value)}
                />
              </p>
              <p>
                <label htmlFor="rendaMensal">Renda mensal:</label>
                <input
                  type="text"
                  id="rendaMensal"
                  className="rendaMensal"
                  value={rendaMensal}
                  onChange={(event) => {
                    const newRendaMensal = parseFloat(event.target.value);
                    if (!newRendaMensal || isNaN(newRendaMensal)) {
                      setRendaMensal(0);
                    } else {
                      setRendaMensal(newRendaMensal);
                    }
                  }}
                />
              </p>
              <p>
                <label htmlFor="data">Data:</label>
                <input
                  type="date"
                  id="data"
                  className="data"
                  value={data}
                  onChange={(event) => setData(event.target.value)}
                />
              </p>
            </div>
            <div className='btnSubmit'>
            <button type="submit">Salvar</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarContaCorrente;