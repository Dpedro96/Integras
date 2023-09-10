// UserRepository.js
import { app } from "../../common/FirebaseConfig";
import { collection, getFirestore, getDocs, addDoc, query, where } from "firebase/firestore";

const db = getFirestore(app);
const userCollectionRef = collection(db, "users");

export const UserRepository = {
  async getUserByEmail(email) {
    const userWithEmail = await getDocs(query(userCollectionRef, where("email", "==", email)));
    return userWithEmail.docs[0];
  },

  async getUserByCPF(cpf) {
    const userWithCPF = await getDocs(query(userCollectionRef, where("cpf", "==", cpf)));
    return userWithCPF.docs[0];
  },

  async addUser(userDTO) {
    await addDoc(userCollectionRef, userDTO);
  }
}
export default UserRepository;
