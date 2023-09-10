import PerfilRepository from "../repository/PerfilRepository";
import { getAuth, deleteUser } from "firebase/auth";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { auth } from "../../common/FirebaseAuth";
import { app } from "../../common/FirebaseConfig";
import { getStorage } from "firebase/storage";
const authInstance = getAuth();
const storage = getStorage(app);

class PerfilService {
  async buscarPerfilPorEmail(email) {
    if (!email) {
      throw new Error("Email é obrigatório");
    }
    const user = await PerfilRepository.getByEmail(email);
    if (!user) {
      throw new Error("Usuário não encontrado");
    }

    return user;
  }
  async updateUser(user) {
    if (!user || !user.email) {
      throw new Error("Dados do usuário são obrigatórios");
    }

    return await PerfilRepository.update(user);
  }

  
  async deleteAccount() {
    console.log("Iniciando processo de exclusão...");
    try {
        const user = authInstance.currentUser;

        if (!user) {
            throw new Error("Nenhum usuário autenticado encontrado.");
        }

        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir sua conta permanentemente?"
        );

        if (confirmDelete) {
            await deleteUser(user);
            console.log("Conta excluída com sucesso.");
        } else {
            console.log("Processo de exclusão cancelado pelo usuário.");
        }

    } catch (error) {
        console.error("Erro ao excluir a conta:", error);
        throw error;
    }
}

  
  

  

  async logout() {
    try {
      await auth.signOut();
    } catch (error) {
      throw new Error("Erro ao deslogar: " + error.message);
    }
  }

  async uploadProfilePicture(file, uid) {
    const storageRef = ref(storage, `profile-pictures/${uid}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  }

  async deleteProfilePicture(uid) {
    const storageRef = ref(storage, `profile-pictures/${uid}`);
    await deleteObject(storageRef);
  }

  async uploadUserPicture(file, uid) {
    try {
      // Aqui está o erro. Você deveria estar chamando como um método da classe usando "this"
      const downloadURL = await this.uploadProfilePicture(file, uid);
      const userToUpdate = { id: uid, profilePicture: downloadURL };
      await PerfilRepository.update(userToUpdate);
      return downloadURL;
    } catch (error) {
      throw new Error("Erro ao fazer upload da foto: " + error.message);
    }
  }

  async deleteUserPicture(uid) {
    try {
      // A mesma correção aqui
      await this.deleteProfilePicture(uid);
      const userToUpdate = { id: uid, profilePicture: null };
      await PerfilRepository.update(userToUpdate);
    } catch (error) {
      throw new Error("Erro ao excluir a foto: " + error.message);
    }
  }
}

export default new PerfilService();
