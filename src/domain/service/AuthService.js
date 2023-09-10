import { loginUser, sendResetPasswordEmail, registerUser } from "../../common/FirebaseAuth";
import { app } from "../../common/FirebaseConfig";
import { getFirestore } from "firebase/firestore";
import { collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(app);

export async function userExistsInFirestore(email) {
  const usersRef = collection(db, 'users');
  const q = query(usersRef, where('email', '==', email));
  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

export function login(userDTO) {
    console.log(`Tentando logar usuário com email: ${userDTO.email}...`);
    return loginUser(userDTO.email, userDTO.password);
}

export function forgotPassword(email) {
    console.log(`Solicitando redefinição de senha para o email: ${email}...`);
    return sendResetPasswordEmail(email);
}

export async function authenticateIfUserMatches(userDTO) {
    try {
        console.log(`Tentando autenticar usuário com email: ${userDTO.email}...`);
        await login(userDTO);
        console.log(`Usuário autenticado com sucesso com o email: ${userDTO.email}`);
    } catch (error) {
        console.error(`Erro ao tentar logar com o email: ${userDTO.email}. Verificando se ele existe no Firestore...`);
        if (await userExistsInFirestore(userDTO.email)) {
            console.log(`Usuário com email: ${userDTO.email} encontrado no Firestore, mas não autenticado. Tentando registrá-lo...`);
            await registerUser(userDTO.email, userDTO.password);
            console.log(`Usuário registrado e autenticado com sucesso com o email: ${userDTO.email}`);
        } else {
            console.error(`Erro ao autenticar usuário com o email: ${userDTO.email}`, error);
            throw new Error("Erro ao autenticar usuário. Verifique suas credenciais ou tente novamente.");
        }
    }
}
