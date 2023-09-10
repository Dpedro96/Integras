// ContaCorrenteHandler.js
import ContaCorrenteDTO from "./ContaCorrenteDTO";
import ContaCorrenteRepository from "./ContaCorrenteRepository";

class ContaCorrenteHandler {
  constructor() {
    this.repository = new ContaCorrenteRepository();
  }

  async verificarContaCorrenteExistente(email) {
    console.log("Verificando existência de conta corrente para:", email);
    const existe = await this.repository.verificarContaCorrenteExistente(email);
    console.log("Resultado da verificação de conta corrente existente:", existe);
    return existe;
  }
  
  async salvarContaCorrente(nomeBanco, rendaMensal, data, email) {
    console.log("Iniciando processo de salvar conta corrente no handler...");
    const contaCorrenteDTO = new ContaCorrenteDTO(nomeBanco, rendaMensal, data, rendaMensal, email);
    const resultado = await this.repository.salvarContaCorrente(contaCorrenteDTO);
    console.log("Resultado da tentativa de salvar conta corrente:", resultado);
    return resultado;
  }
}

export default ContaCorrenteHandler;
