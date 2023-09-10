import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from "firebase/firestore";
import { app } from '../common/FirebaseConfig';
import { getAuth } from "firebase/auth";

class EditarContaCorrenteController {
  constructor() {
    this.auth = getAuth();
    this.db = getFirestore(app);
  }

  async buscarContaCorrentePorEmail(email) {
    if (!email) {
      throw new Error("Email é obrigatório!");
    }

    const qContaCorrente = query(collection(this.db, 'contaCorrente'), where("email", "==", email));
    const querySnapshotContaCorrente = await getDocs(qContaCorrente);

    if (querySnapshotContaCorrente.empty) {
      throw new Error("Conta corrente não encontrada!");
    }

    const [dataContaCorrente] = querySnapshotContaCorrente.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return dataContaCorrente;
  }

  async atualizarContaCorrente(id, nomeBanco, rendaMensal, rendaTotal, data) {
    if (!this.auth.currentUser) {
      throw new Error("Faça login para atualizar os dados!");
    }

    const contaCorrenteRef = doc(this.db, "contaCorrente", id);
    await updateDoc(contaCorrenteRef, {
      nomeBanco,
      rendaMensal: Number(rendaMensal),
      rendaTotal: Number(rendaTotal),
      data,
      email: this.auth.currentUser.email
    });
  }
}

export default EditarContaCorrenteController;
