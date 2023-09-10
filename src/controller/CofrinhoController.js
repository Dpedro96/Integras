import { CofrinhoService } from '../domain/service/CofrinhoService';
import { CofrinhoModel } from '../domain/model/CofrinhoModel';
import { getAuth } from 'firebase/auth';

export class CofrinhoController {
  constructor() {
    this.service = new CofrinhoService(this);
  }
  
  async calculateTimeToReachGoalByEmail(userEmail) {
    try {
        // Primeiro obtemos o cofrinho com base no email
        const cofrinho = await this.getCofrinhoByEmail(userEmail);

        if (!cofrinho) {
            throw new Error("Cofrinho not found for the given email");
        }

        const monthsRequired = await this.service.calculateTimeToReachGoal(cofrinho.id);
        console.log("Months required:", monthsRequired); // <-- Adicionado para verificação
        return monthsRequired;
    } catch (error) {
        console.error("Error calculating time to goal:", error.message);
        throw error;
    }
}



async addValueToCofrinho(req, res) {
  try {
    const cofrinhoId = req.params.cofrinhoId;
    const { value } = req.body;
    const updatedCofrinho = await this.service.addValueToCofrinho(cofrinhoId, value);
    res.status(200).json(updatedCofrinho);
  } catch (error) {
    res.status(500).json({ message: "Error adding value to cofrinho" });
  }
}

async retrieveValueFromCofrinho(req, res) {
  try {
    const cofrinhoId = req.params.cofrinhoId;
    const { value } = req.body;
    const updatedCofrinho = await this.service.retrieveValueFromCofrinho(cofrinhoId, value);
    res.status(200).json(updatedCofrinho);
  } catch (error) {
    if (error.message === "Não há saldo suficiente no cofrinho.") {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Error retrieving value from cofrinho" });
    }
  }
}

getCurrentUserEmail() {
  const auth = getAuth();
  return auth.currentUser ? auth.currentUser.email : null;
}

async createCofrinho(data) {
  try {
    const auth = getAuth();
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const userEmail = auth.currentUser ? auth.currentUser.email : null;
    
    if (!userId) {
      throw new Error("UserID não fornecido ou inválido.");
    }

    if (!userEmail) {
      throw new Error("Email do usuário não fornecido ou inválido.");
    }

    // Verificar se o usuário já tem um cofrinho
    const userCofrinho = await this.service.getCofrinhoByUser(userId);
    if (userCofrinho && userCofrinho.length > 0) {
      throw new Error("O usuário já possui um cofrinho.");
    }

    data.userId = userId; 
    data.userEmail = userEmail;

    const result = await this.service.createCofrinho(data);
    return { 
      status: 200, 
      data: new CofrinhoModel(
        result.id, 
        data.nomeCofrinho, 
        data.descricaoCofrinho, 
        data.valorMensalCofrinho, 
        data.metaCofrinho, 
        data.userId, 
        data.userEmail
      )
    };
  } catch (error) {
    console.log("Erro ao criar Cofrinho:", error.message);
    throw error;
  }
}


async getCofrinhoByUser(userId) {
  try {
    const cofrinhos = await this.service.getCofrinhoByUser(userId);
    if (cofrinhos) {
      return cofrinhos;
    } else {
      // Retornar um valor vazio ou uma lista vazia, dependendo do seu caso.
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar cofrinhos do usuário:", error);
    throw error;
  }
}


  async updateCofrinho(req, res) {
    try {
      const cofrinhoId = req.params.cofrinhoId;
      const updatedData = req.body;
      const updatedCofrinho = await this.service.updateCofrinhoData(cofrinhoId, updatedData);
      if (updatedCofrinho) {
        res.status(200).json(updatedCofrinho);
      } else {
        res.status(404).json({ message: "Cofrinho not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating cofrinho" });
    }
  }
  async getCofrinhoByEmail(email) {
    try {
      const cofrinho = await this.service.getCofrinhoByEmail(email);
      if (cofrinho) {
        return cofrinho;
      } else {
        throw new Error("Cofrinho not found");
      }
    } catch (error) {
      console.error("Error in getCofrinhoByEmail:", error);  // Adicione este log para ter mais detalhes
      throw new Error("Error fetching cofrinho");
  }
}

  async doesCofrinhoExistForUser(userId) {
    const cofrinhos = await this.service.getCofrinhosByUserId(userId);
    return cofrinhos.length > 0;
  }

  async deleteCofrinhoByUserIdAndName(userId, nomeCofrinho) {
    if (!userId || !nomeCofrinho) {
        throw new Error("UserId or nomeCofrinho is invalid or not provided.");
    }

    try {
        const cofrinhos = await this.service.getCofrinhoByUser(userId);
        const cofrinhoToDelete = cofrinhos.find(cofrinho => cofrinho.nomeCofrinho.toLowerCase() === nomeCofrinho);
        
        if (!cofrinhoToDelete) {
            throw new Error("Cofrinho not found");
        }

        await this.service.deleteCofrinhoById(cofrinhoToDelete.id);
        console.log("Cofrinho deleted successfully");
    } catch (error) {
        console.error("Error deleting cofrinho:", error.message);
        throw error;
    }
}
}
