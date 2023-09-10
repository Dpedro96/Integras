import { app } from '../../common/FirebaseConfig';
import { collection, where, getDocs, query, doc, setDoc } from 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app); 
class PerfilRepository {
   
  async getByEmail(email) {
    try {
      const usersCollection = collection(db, 'users');
      const q = query(usersCollection, where('email', '==', email));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        return null;
      }
     
      let userData;
      snapshot.forEach(doc => {
        userData = {
          id: doc.id,
          ...doc.data()
        };
      });

      return userData;
    } catch (error) {
      throw new Error('Erro ao buscar o usuário: ' + error.message);
    }
  }
  
  async update(user) {
    try {
       const userRef = doc(db, 'users', user.id);
       await setDoc(userRef, user, { merge: true });
    } catch (error) {
       throw new Error('Erro ao atualizar o usuário: ' + error.message);
    }
  }
}
 
export default new PerfilRepository();
