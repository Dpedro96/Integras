// HomeController.js
import { useState } from "react";
import HomeView from "../views/HomeView"; // Importe a visualização correspondente

function HomeController() {
  const [showAddRendaExtra, setShowAddRendaExtra] = useState(false);
  const [showAddCofrinho, setShowAddCofrinho] = useState(false);
  const [showResgateCofrinho, setShowResgateCofrinho] = useState(false);
  const [selected, setSelected] = useState("Descrição");

  const descriptions = {
    // ... Descrições aqui
  };

  async function handleResgateCofrinhoSubmit(event) {
    // ... Lógica de resgate do cofrinho aqui
  }

  async function handleAddCofrinhoSubmit(event) {
    // ... Lógica de adição de valor ao cofrinho aqui
  }

  async function handleRendaExtraSubmit(event) {
    // ... Lógica de adição de renda extra aqui
  }

  function handleAddCofrinhoClick() {
    setShowAddCofrinho(true);
  }

  function handleAddRendaExtraClick() {
    setShowAddRendaExtra(true);
  }

  async function handleResgateCofrinhoClick() {
    setShowResgateCofrinho(true);
  }

  return (
    <HomeView
      showAddRendaExtra={showAddRendaExtra}
      setShowAddRendaExtra={setShowAddRendaExtra}
      showAddCofrinho={showAddCofrinho}
      setShowAddCofrinho={setShowAddCofrinho}
      showResgateCofrinho={showResgateCofrinho}
      setShowResgateCofrinho={setShowResgateCofrinho}
      selected={selected}
      setSelected={setSelected}
      descriptions={descriptions}
      handleResgateCofrinhoSubmit={handleResgateCofrinhoSubmit}
      handleAddCofrinhoSubmit={handleAddCofrinhoSubmit}
      handleRendaExtraSubmit={handleRendaExtraSubmit}
      handleAddCofrinhoClick={handleAddCofrinhoClick}
      handleAddRendaExtraClick={handleAddRendaExtraClick}
      handleResgateCofrinhoClick={handleResgateCofrinhoClick}
    />
  );
}

export default HomeController;
