import { CofrinhoRepository } from '../repository/CofrinhoRepository';
import { getDocs, getFirestore, collection, where, query } from 'firebase/firestore';
import { CofrinhoController } from '../../controller/CofrinhoController';

export class CofrinhoService {
  constructor() {
    this.repository = new CofrinhoRepository();
  }
  async addValueToCofrinho(cofrinhoId, value) {
    const cofrinhoData = await this.repository.getCofrinhoById(cofrinhoId);
    cofrinhoData.valorMensalCofrinho += value;
    return await this.repository.updateCofrinho(cofrinhoId, cofrinhoData);
  }

  async retrieveValueFromCofrinho(cofrinhoId, value) {
    const cofrinhoData = await this.repository.getCofrinhoById(cofrinhoId);
    if (cofrinhoData.valorMensalCofrinho < value) {
      throw new Error("Não há saldo suficiente no cofrinho.");
    }
    cofrinhoData.valorMensalCofrinho -= value;
    return await this.repository.updateCofrinho(cofrinhoId, cofrinhoData);
  }


  async createCofrinho(cofrinhoData) {
    return await this.repository.addCofrinho(cofrinhoData);
  }

  async getCofrinhoByUser(userId) {
    return await this.repository.deleteCofrinho(userId);
  }
  

  async updateCofrinhoData(cofrinhoId, updatedData) {
    return await this.repository.updateCofrinho(cofrinhoId, updatedData);
  }

  async deleteCofrinhoById(cofrinhoId) {
    return await this.repository.deleteCofrinho(cofrinhoId);
  }

  async checkCofrinhoExistsByName(name) {
    return await this.repository.findCofrinhoByName(name);
  }
  async calculateTimeToReachGoal(cofrinhoId) {
    const cofrinhoData = await this.repository.getCofrinhoById(cofrinhoId); // Suponhamos que esse método retorna os dados do cofrinho pelo ID
    const { valorMensalCofrinho, metaCofrinho } = cofrinhoData;
    const monthsRequired = Math.ceil(metaCofrinho / valorMensalCofrinho);
    return monthsRequired;
  }


  async addValorMensalToCofrinho(value) {
    const controller = new CofrinhoController();
    try {
      const email = await controller.getCurrentUserEmail();
      const cofrinhoData = await this.repository.getCofrinhoByEmail(email);
      // Garantindo que ambos os valores sejam números
      const currentValue = Number(cofrinhoData.valorMensalCofrinho);
      const addedValue = Number(value);

      if (isNaN(currentValue) || isNaN(addedValue)) {
        throw new Error("Valor atual ou valor adicionado não são números válidos");
      }
      const updateValorMensalCofrinho = currentValue + addedValue;
      await this.repository.updateCofrinho(cofrinhoData.id, { valorMensalCofrinho: updateValorMensalCofrinho });
      return true;
    } catch (error) {
      throw new Error("Erro ao adicionar no cofrinho: " + error.message);
    }
  }
  async ResgatarValorMensalToCofrinho(value) {
    const controller = new CofrinhoController();
    try {
      const email = await controller.getCurrentUserEmail();
      const cofrinhoData = await this.repository.getCofrinhoByEmail(email);

      // Garantindo que ambos os valores sejam números
      const currentValue = Number(cofrinhoData.valorMensalCofrinho);
      const subtractValue = Number(value);

      if (isNaN(currentValue) || isNaN(subtractValue)) {
        throw new Error("Valor atual ou valor a ser subtraído não são números válidos");
      }

      // Verificando se o valor a ser subtraído não é maior que o valor atual no cofrinho
      if (subtractValue > currentValue) {
        throw new Error("Não é possível resgatar um valor maior que o saldo atual do cofrinho");
      }

      const updateValorMensalCofrinho = currentValue - subtractValue;
      await this.repository.updateCofrinho(cofrinhoData.id, { valorMensalCofrinho: updateValorMensalCofrinho });
      return true;
    } catch (error) {
      throw new Error("Erro ao resgatar do cofrinho: " + error.message);
    }
}
async getCofrinhoByEmail(email) {
  return await this.repository.getCofrinhoByEmail(email);
}



  // Dentro do seu serviço Cofrinho (por exemplo, CofrinhoService.js)

  async getCofrinhosByUserId(userId) {
    // Obtenha a conexão ao banco de dados
    const db = getFirestore();

    // Obtenha a coleção onde os cofrinhos são armazenados (por exemplo, 'cofrinhos')
    const cofrinhoCollection = collection(db, "cofrinhos");

    // Crie uma consulta para obter todos os cofrinhos associados a esse userId
    const cofrinhoQuery = query(cofrinhoCollection, where("userId", "==", userId));

    // Execute a consulta e obtenha os resultados
    const querySnapshot = await getDocs(cofrinhoQuery);

    // Converta os resultados em um array de cofrinhos
    const cofrinhos = querySnapshot.docs.map(doc => doc.data());

    return cofrinhos;
  }



  async validateCofrinhoData(cofrinhoData) {
    const doesExist = await this.checkCofrinhoExistsByName(cofrinhoData.nomeCofrinho);
    if (doesExist) {
      throw new Error("Um cofrinho com esse nome já existe.");
    }

    if (cofrinhoData.valorMensalCofrinho > cofrinhoData.metaCofrinho) {
      throw new Error("O valor inicial não pode ser maior que a meta.");
    }
  }
}
