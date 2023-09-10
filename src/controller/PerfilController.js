import PerfilService from '../domain/service/PerfilService';


class PerfilController {
  async buscarPerfilPorEmail(email) {
    // Chamando o service aqui:
    const user = await PerfilService.buscarPerfilPorEmail(email);
    return user;
  }
  async updatePerfil(user) {
    return await PerfilService.updateUser(user);
  }


  async logout() {
    return await PerfilService.logout();
  }


  async deleteAccount() {
    try {
      await PerfilService.deleteAccount();
      // Redirecione o usuário ou realize outras ações após a exclusão da conta bem-sucedida
    } catch (error) {
      console.error('Erro ao excluir a conta:', error.message);
      // Lidar com o erro de alguma forma (por exemplo, mostrar uma mensagem de erro ao usuário)
    }
   
   
  }

  async uploadUserPicture(file, uid) {
    return await PerfilService.uploadUserPicture(file, uid);
  }
  
  async deleteUserPicture(uid) {
    return await PerfilService.deleteUserPicture(uid);
  }
  
  
}


export default PerfilController;