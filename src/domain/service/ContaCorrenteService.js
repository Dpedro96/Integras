import ContaCorrenteController from "../../controller/ContaCorrenteController";
import ContaCorrenteDTO from "../dto/ContaCorrenteDTO";
import { getAllContasCorrentes, getContaCorrenteByEmail, updateContaCorrente } from "../repository/ContaCorrenteRepository";

export class ContaCorrenteService {
  constructor() {
    this.controller = new ContaCorrenteController();
  }

  validarCampos(nomeBanco, rendaMensal, data) {
    if (!nomeBanco || !rendaMensal || !data) {
      console.log("Validando campos com os seguintes valores:", nomeBanco, rendaMensal, data);

      throw new Error("Todos os campos são obrigatórios!");
    }

    if (Number(rendaMensal) <= 0) {
      throw new Error("A renda mensal deve ser um valor positivo.");
    }

    const currentDate = new Date();
    const selectedDate = new Date(data);
    if (selectedDate > currentDate) {
      throw new Error("A data selecionada não pode estar no futuro.");
    }
  }

  async updateRendaMensal(newRendaMensal) {
    if (newRendaMensal <= 0) {
      throw new Error("A renda mensal deve ser um valor positivo.");
    }

    const email = this.controller.getCurrentUserEmail();
    const contaCorrenteData = await getContaCorrenteByEmail(email);

    await updateContaCorrente(contaCorrenteData.id, { rendaMensal: newRendaMensal });
  }

  async addRendaExtra(value) {
    try {
      const email = await this.controller.getCurrentUserEmail();
      const contaCorrenteData = await getContaCorrenteByEmail(email);
  
     
      const updatedRendaTotal = contaCorrenteData.rendaTotal + Number(value);
  
      await updateContaCorrente(contaCorrenteData.id, { rendaTotal: updatedRendaTotal });
  
      return true;
    } catch (error) {
      throw new Error("Erro ao adicionar renda extra: " + error.message);
    }
  }
   async  fetchContaCorrente(user) {
    if (!user.email) {
        throw new Error("Informações do usuário estão incompletas ou não fornecidas.");
    }
    return await getAllContasCorrentes(user.uid);
}


  async salvarContaCorrente(nomeBanco, rendaMensal, data) {
    this.validarCampos(nomeBanco, rendaMensal, data);
    console.log("Service: Preparando para salvar conta corrente com os seguintes dados:", nomeBanco, rendaMensal, data);


    const contaCorrenteExistente = await this.controller.verificarContaCorrenteExistente();
    if (contaCorrenteExistente) {
      throw new Error("Você já possui uma conta corrente cadastrada!");
    }

    const contaCorrenteDTO = new ContaCorrenteDTO(nomeBanco, rendaMensal, data, rendaMensal, this.controller.getCurrentUserEmail());
    
    const result = await this.controller.salvarContaCorrente(contaCorrenteDTO);

    return result;
  }
}

export default ContaCorrenteService;
