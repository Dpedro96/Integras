import {login, userExistsInFirestore} from "../domain/service/AuthService";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { LoginDTO } from "../domain/dto/LoginDTO";

export async function handleLoginAndAuthenticate(email, password) {
    const userDTO = new LoginDTO(email, password);

    try {
        await login(userDTO);
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            const userExists = await userExistsInFirestore(email);  // Esta função verifica apenas se o usuário existe, sem se preocupar com a senha

            if (userExists) {
                // Se o usuário existe no Firestore, mas não no Firebase Auth, crie uma autenticação para ele.
                await login(userDTO);
            } else {
                throw new Error("Usuário ou senha inválidos.");
            }
        } else {
            throw new Error("Erro ao autenticar usuário: " + error.message);
        }
    }
}

export const handleForgotPassword = async (email) => {
    const auth = getAuth();

    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        throw error;
    }
};

