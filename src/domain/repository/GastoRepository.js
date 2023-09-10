import { collection, addDoc, getDocs, query, where, getFirestore } from "firebase/firestore";
import { app } from "../../common/FirebaseConfig"; // Substitua 'pathToYourFirebaseConfig' pelo caminho do arquivo onde sua instância do Firebase é inicializada.
import { deleteDoc, doc } from "firebase/firestore";

const db = getFirestore(app);
const gastosCollectionRef = collection(db, "gastos");

export async function findGastoByTitulo(userId, titulo) {
    try {
        const gastosQuery = query(
            gastosCollectionRef,
            where("userId", "==", userId),
            where("titulo", "==", titulo)
        );

        const querySnapshot = await getDocs(gastosQuery);

        if (!querySnapshot.empty) {
            // Se o documento for encontrado, retorne o primeiro documento (deve haver apenas um com o mesmo título)
            const gastoDoc = querySnapshot.docs[0];
            return gastoDoc;
        } else {
            // Se nenhum documento for encontrado, retorne null
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar gasto por título no Repository:", error);
        throw error;
    }
}


export async function getAllGastosByUserId(userId) {
    try {
      const querySnapshot = await getDocs(gastosCollectionRef);
      let gastos = [];
      querySnapshot.forEach(doc => {
          gastos.push(doc.data());
      });
      return gastos;
  } catch (error) {
      console.error("Erro ao buscar gastos no Repository:", error);
      throw error;
  }
}



export async function createGasto(data) {
    return await addDoc(gastosCollectionRef, data);
}



export async function deleteGastoRepository(userId, titulo) {
    try {
        if (!userId || !titulo) {
            console.error("ID do usuário ou título do gasto não fornecidos. Não é possível prosseguir com a exclusão.");
            return;
        }

        // Use o userId diretamente

        const querySnapshot = await getDocs(gastosCollectionRef);

        querySnapshot.forEach(async (doc) => {
            const data = doc.data();
            const userUid = data.userId;
            if (data.userId === userUid && data.titulo === titulo) {
                const gastoDocRef = doc.ref;
                await deleteDoc(gastoDocRef);
                console.log("Gasto deletado com sucesso.");
            }
        });

    } catch (error) {
        console.error("Erro ao deletar gasto no Repository:", error);
        throw error;
    }
}

