import { Route, BrowserRouter, Navigate, Routes } from "react-router-dom";

import {Cadastro} from "./view/Cadastro";
import Login from "./view/Login";
import Cofrinho from "./view/Cofrinho";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import ContaCorrente from "./view/ContaCorrente";
import EditarContaCorrente from "./view/EditarContaCorrente";
import { onAuthStateChanged } from "firebase/auth";
import Rodape from "./view/cabecalho_rodape/Rodape";
import Cabecalho from "./view/cabecalho_rodape/Cabecalho";
import HomePage from "./view/HomePage";
import Home from "./view/Home";
import Gasto from "./view/Gasto";
import Relatorios from "./view/Relatorios";
import Perfil from "./view/Perfil"



const useAuth = () => {
  const auth = getAuth();
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthenticated(!!user);
    });
    
    return () => unsubscribe(); // Limpa a inscrição quando o componente é desmontado
  }, [auth]);

  return authenticated;
};

const ProtectedRoute = ({ children }) => {
  const authenticated = useAuth();
  if (authenticated === null) return null; // ou algum loading spinner
  return authenticated ? children : <Navigate to="/login" replace />;
}

const App = () => {
  return (
    <BrowserRouter>
     <div>
        <Cabecalho />
      </div>
      <Routes>
      <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/cofrinho" element={<ProtectedRoute><Cofrinho /></ProtectedRoute>} />
        <Route path="/contacorrente" element={<ProtectedRoute><ContaCorrente /></ProtectedRoute>} />
        <Route path="/editarcontacorrente" element={<ProtectedRoute><EditarContaCorrente /></ProtectedRoute>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path="/gastos" element={<ProtectedRoute><Gasto/></ProtectedRoute>}/>
        <Route path="/relatorios" element={<ProtectedRoute><Relatorios/></ProtectedRoute>}/>
        <Route path="/perfil" element={<ProtectedRoute><Perfil/></ProtectedRoute>}/>
      </Routes>
      <div>
        <Rodape />
      </div>
    </BrowserRouter>
  );
};

export default App;
