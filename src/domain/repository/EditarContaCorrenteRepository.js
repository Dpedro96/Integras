import { getFirestore, collection, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';
import { app } from "../../common/FirebaseConfig" ;

const db = getFirestore(app);

export const getContaCorrenteByEmail = async (email) => {
  const qContaCorrente = query(collection(db, 'contaCorrente'), where("email", "==", email));
  const querySnapshotContaCorrente = await getDocs(qContaCorrente);
  return querySnapshotContaCorrente.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
}

export const updateContaCorrente = async (id, data) => {
  const contaCorrenteRef = doc(db, "contaCorrente", id);
  return await updateDoc(contaCorrenteRef, data);
}
