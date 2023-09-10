import EditarContaCorrenteController from "../../controller/EditarContaCorrenteController";
import EditarContaCorrenteDTO from "../dto/EditarContaCorrenteDTO";

class EditarContaCorrenteService {
  constructor() {
    this.controller = new EditarContaCorrenteController();
  }

  validarCampos(nomeBanco, rendaMensal, rendaTotal, data) {
    if (!nomeBanco || !rendaMensal || !rendaTotal || !data) {
      throw new Error("Todos os campos são obrigatórios!");
    }

    if (Number(rendaMensal) <= 0 || Number(rendaTotal) <= 0) {
      throw new Error("A renda mensal e total devem ser valores positivos.");
    }

    const currentDate = new Date();
    const selectedDate = new Date(data);
    if (selectedDate > currentDate) {
      throw new Error("A data selecionada não pode estar no futuro.");
    }
  }

  async editarContaCorrente(id, nomeBanco, rendaMensal, rendaTotal, data) {
    this.validarCampos(nomeBanco, rendaMensal, rendaTotal, data);
    
    // Criar um DTO para passar para o controller
    const contaCorrenteDTO = new EditarContaCorrenteDTO(nomeBanco, rendaMensal, rendaTotal, data, this.controller.auth.currentUser.email);
    await this.controller.atualizarContaCorrente(id, contaCorrenteDTO);
  }
}

export default EditarContaCorrenteService;
