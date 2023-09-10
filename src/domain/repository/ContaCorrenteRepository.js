// contaCorrenteRepository.js
import { getFirestore, collection, query, where, getDocs, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { app } from "../../common/FirebaseConfig" ;

const db = getFirestore(app);
const contaCorrenteCollectionRef = collection(db, "contaCorrente");

export const getContaCorrenteByEmail = async (email) => {
  console.log("Buscando conta corrente para o email:", email);
  const qContaCorrente = query(collection(db, 'contaCorrente'), where("email", "==", email));
  const querySnapshotContaCorrente = await getDocs(qContaCorrente);
  console.log("Buscando conta corrente para o email:", email);

  if (querySnapshotContaCorrente.empty) {
    throw new Error("Nenhuma conta corrente encontrada para o email fornecido.");
  }
  const docSnapshot = querySnapshotContaCorrente.docs[0];
  return {
    id: docSnapshot.id,
    ...docSnapshot.data()
  };
}


export const updateContaCorrente = async (id, data) => {
  console.log("Atualizando conta corrente com ID:", id, " e os seguintes dados:", data);

  if (!id || !data) {
    console.log("Atualizando conta corrente com ID:", id, " e os seguintes dados:", data);

    throw new Error("ID e dados são obrigatórios para atualização.");
  }
  console.log("Atualizando conta corrente com ID:", id, " e os seguintes dados:", data);

  const contaCorrenteRef = doc(db, "contaCorrente", id);
  return await updateDoc(contaCorrenteRef, data);
}

export const getAllContasCorrentes = async (userId) => {
  const qContaCorrente = query(collection(db, 'contaCorrente'), where("userId", "==", userId));
  const querySnapshotContaCorrente = await getDocs(qContaCorrente);
  const contasCorrentes = [];

  querySnapshotContaCorrente.forEach((docSnapshot) => {
    contasCorrentes.push({
      id: docSnapshot.id,
      ...docSnapshot.data()
    });
  });

  return contasCorrentes;
}

export const deleteContaCorrente = async (userId) => {
  console.log(`Início da função deleteContaCorrente para userId: ${userId}`);
  
  const docRef = doc(db, 'contaCorrente', userId); 

  try {
      console.log(`Tentando deletar o documento com ID: ${userId}`);
      await deleteDoc(docRef);
      console.log(`Documento com ID: ${userId} deletado com sucesso!`);

      // Verificando se o documento ainda existe
      const snap = await getDoc(docRef);
      if (snap.exists()) {
          console.error(`Erro: Documento com ID: ${userId} ainda existe após a tentativa de deleção.`);
      } else {
          console.log(`Verificação concluída. Documento com ID: ${userId} foi deletado corretamente.`);
      }

  } catch (error) {
      console.error("Erro durante a tentativa de deleção:", error);
      throw error;
  }
}

export async function getContaCorrenteByUserId(userId) {
  const querySnapshot = await getDocs(
      query(contaCorrenteCollectionRef, where("userId", "==", userId))
  );
  
  let contaCorrente = [];
  querySnapshot.forEach(doc => {
    contaCorrente.push(doc.data());
  });
  return contaCorrente;
}
