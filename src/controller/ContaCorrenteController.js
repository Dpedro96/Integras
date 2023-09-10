import { getFirestore, collection, addDoc, where, query, getDocs, doc, updateDoc } from "firebase/firestore";
import { app } from '../common/FirebaseConfig'
import { getAuth } from "firebase/auth";
import { getContaCorrenteByEmail, updateContaCorrente } from "../domain/repository/ContaCorrenteRepository";
import fetchContaCorrente from '../domain/service/ContaCorrenteService' 
import ContaCorrenteDTO from "../domain/dto/ContaCorrenteDTO";


class ContaCorrenteController {
  constructor() {
    this.auth = getAuth(); 
  }
    
  async verificarContaCorrenteExistente() {
    console.log("Verificando se conta corrente já existe para o email:", this.auth.currentUser.email);
    if (!this.auth.currentUser) {
      return false;
    }

    const db = getFirestore(app);
    const contaCorrenteQuery = query(collection(db, "contaCorrente"), where("email", "==", this.auth.currentUser.email));
    const querySnapshot = await getDocs(contaCorrenteQuery);
    
    return !querySnapshot.empty;
  }

  async getCurrentUserEmail() {
    if (!this.auth.currentUser) {
      throw new Error("Usuário não autenticado.");
    }

    return this.auth.currentUser.email;
  }
  async getContaCorrenteByEmail() {
    try {
        const email = await this.getCurrentUserEmail();
        return await getContaCorrenteByEmail(email);
    } catch (error) {
        console.error("Erro ao buscar conta corrente pelo email: ", error);
        throw error;
    }
  }
  

  async addRendaExtra(value) {
    try {
      const email = this.controller.auth.currentUser.email;
      const contaCorrenteData = await getContaCorrenteByEmail(email);
      if (contaCorrenteData.length === 0) {
        throw new Error("Conta corrente não encontrada para o usuário atual.");
      }
  
      const updatedRendaTotal = contaCorrenteData[0].rendaTotal + value;
      await updateContaCorrente(contaCorrenteData[0].id, { rendaTotal: updatedRendaTotal });
      return true;
    } catch (error) {
      throw new Error("Erro ao adicionar renda extra: " + error.message);
    }
  }

  async updateContaCorrente(id, data) {
    try {
      const db = getFirestore(app);
      const contaCorrenteRef = doc(db, 'contaCorrente', id);
      await updateDoc(contaCorrenteRef, data);
    } catch (error) {
      throw new Error("Erro ao atualizar conta corrente: " + error.message);
    }
  }

   async getContacorrente(userId) {
    try {
        return await fetchContaCorrente(userId);
    } catch (error) {
        console.error("Erro ao buscar gastos: ", error);
        throw error;
    }
}

async salvarContaCorrente(nomeBanco, rendaMensal, data, email) {
  try {
      console.log("Dados capturados:", nomeBanco, rendaMensal, data, email);

      if (!this.auth.currentUser) {
          throw new Error("Faça login para salvar os dados!");
      }

      const db = getFirestore();
      const contaCorrenteCollectionRef = collection(db, "contaCorrente");
      const contaCorrenteExistente = await this.verificarContaCorrenteExistente();
      
      if (contaCorrenteExistente) {
          throw new Error("Você já possui uma conta corrente cadastrada!");
      }

      if (window.confirm("Tem certeza que deseja salvar esses dados?")) {
          const newContaCorrente = {
              nomeBanco,
              rendaMensal: Number(rendaMensal),
              data,
              rendaTotal: Number(rendaMensal),
              email
          };
          console.log("Tentando salvar o seguinte objeto no Firestore:", newContaCorrente);

          const docRef = await addDoc(contaCorrenteCollectionRef, newContaCorrente);
          return docRef.id;
      }
  } catch (error) {
      throw new Error("Erro ao salvar conta corrente: " + error.message);
  }
}

}

export default ContaCorrenteController;
