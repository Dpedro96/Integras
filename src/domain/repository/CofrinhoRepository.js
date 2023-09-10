import { getFirestore, collection, addDoc, getDocs, query, where, updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import { app } from "../../common/FirebaseConfig";

export class CofrinhoRepository {
  constructor() {
    this.db = getFirestore(app);
    this.collectionRef = collection(this.db, "cofrinho");
  }

  async addCofrinho(cofrinhoData) {
    return await addDoc(this.collectionRef, cofrinhoData);
  }

  async getCofrinhoByUserId(userId) {
    try {
      console.log("Buscando cofrinhos para o usuário com ID:", userId);
      const qCofrinho = query(collection(this.db, 'cofrinho'), where("userId", "==", userId));
      const querySnapshotCofrinho = await getDocs(qCofrinho);
  
      console.log("querySnapshotCofrinho:", querySnapshotCofrinho);
  
      if (!querySnapshotCofrinho.empty) {
        const cofrinhos = [];
        querySnapshotCofrinho.forEach((doc) => {
          cofrinhos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("Cofrinhos encontrados:", cofrinhos);
        return cofrinhos;
      } else {
        console.log("Nenhum cofrinho encontrado.");
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar cofrinhos do usuário:", error);
      throw error;
    }
  }
  
  
  

  async updateCofrinho(cofrinhoId, updatedData) {
    const cofrinhoDoc = doc(this.db, "cofrinho", cofrinhoId);
    return await updateDoc(cofrinhoDoc, updatedData);
  }


  async deleteCofrinho(userId) {
    try {
      console.log("Buscando cofrinhos para o usuário com ID:", userId);
      const qCofrinho = query(collection(this.db, 'cofrinho'), where("userId", "==", userId));
      const querySnapshotCofrinho = await getDocs(qCofrinho);
  
      console.log("querySnapshotCofrinho:", querySnapshotCofrinho);
  
      if (!querySnapshotCofrinho.empty) {
        const cofrinhos = [];
        querySnapshotCofrinho.forEach((doc) => {
          cofrinhos.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log("Cofrinhos encontrados:", cofrinhos);
  
        // Adicione aqui a exclusão dos cofrinhos
        for (const cofrinho of cofrinhos) {
          const cofrinhoDocRef = doc(this.db, 'cofrinho', cofrinho.id);
          await deleteDoc(cofrinhoDocRef);
          console.log(`Cofrinho com ID ${cofrinho.id} excluído com sucesso.`);
        }
  
        return cofrinhos;
      } else {
        console.log("Nenhum cofrinho encontrado.");
        return [];
      }
    } catch (error) {
      console.error("Erro ao buscar cofrinhos do usuário:", error);
      throw error;
    }
  }
  
  

  
  


  async findCofrinhoByName(name) {
    const q = query(this.collectionRef, where("nomeCofrinho", "==", name));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
  

  async getCofrinhoById(cofrinhoId) {
    const cofrinhoDoc = doc(this.db, "cofrinho", cofrinhoId);
    const cofrinhoSnapshot = await getDoc(cofrinhoDoc);
    if (cofrinhoSnapshot.exists()) {
      return { id: cofrinhoSnapshot.id, ...cofrinhoSnapshot.data() };
    } else {
      throw new Error("Cofrinho não encontrado");
    }
  }
  
  
  async getCofrinhoByEmail(email) {
    const qCofrinho = query(collection(this.db, 'cofrinho'), where("userEmail", "==", email));
    const querySnapshotCofrinho = await getDocs(qCofrinho);
    if (querySnapshotCofrinho.empty) {
      // Retorne null em vez de lançar um erro
      return null;
    }
    const docSnapshot = querySnapshotCofrinho.docs[0];
    return {
      id: docSnapshot.id,
      ...docSnapshot.data()
    };
}




  
}

export default CofrinhoRepository;
