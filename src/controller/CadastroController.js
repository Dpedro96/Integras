import { useState } from 'react';
import { UserService } from '../domain/service/UserService';
import { UserDTO } from '../domain/dto/UserDTO';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export const useCadastroController = () => {
  const [userDTO, setUserDTO] = useState(new UserDTO("", "", "", "", ""));
  const [cadastradoComSucesso, setCadastradoComSucesso] = useState(false);

  const criarUsuario = async (e) => {
    e.preventDefault();

    // Exclua o campo de senha do objeto user
    const { senha, ...userData } = userDTO;
    
    // Primeiro, vamos tentar criar o usuário no Firebase Auth
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userDTO.email, userDTO.senha);
      // O usuário foi criado com sucesso no Firebase Auth. Agora, você pode continuar com sua lógica.
  
      const result = await UserService.criarUsuario(userData); // Envie userData sem a senha
      
      if (result.success) {
        alert(result.message);
        setCadastradoComSucesso(true);
      } else {
        // Opcional: Se a criação no seu banco de dados falhar, você pode excluir o usuário do Firebase Auth
        // const user = userCredential.user;
        // await deleteUser(user);
        
        alert(result.message);
      }
  
    } catch (error) {
      // Se houve um erro ao criar o usuário no Firebase Auth, você pode tratá-lo aqui.
      alert("Erro ao criar usuário no Firebase: " + error.message);
    }
  }
  return {
    userDTO,
    setUserDTO,
    cadastradoComSucesso,
    criarUsuario,
  };
}
