import { findGastoByTitulo, createGasto, getAllGastosByUserId } from '../repository/GastoRepository';
import { deleteGastoRepository} from '../repository/GastoRepository';


export async function saveGasto(gastoDTO, user) {
    if (!user.email || !user.uid) {
        throw new Error("Informações do usuário estão incompletas ou não fornecidas.");
    }

    // Verifica se já existe um gasto com o mesmo título
    const existingGasto = await findGastoByTitulo(user.uid, gastoDTO.titulo);

    
    if (existingGasto) {
        throw new Error("Você já possui um gasto com o mesmo título.");
    }

    const data = {
        ...gastoDTO,
        email: user.email,
        userId: user.uid, // Adicione o ID do usuário ao gasto
    };
    
    return await createGasto(data);
}

export async function fetchAllGastos(user) {
    if (!user || !user.uid) {
        throw new Error("Informações do usuário estão incompletas ou não fornecidas.");
    }
    return await getAllGastosByUserId(user.uid);
}


export async function deleteGastoService(userId, titulo) {
    try {
      await deleteGastoRepository(userId, titulo);
      console.log("Gasto deletado no Service.");
    } catch (error) {
      console.error("Erro ao deletar gasto no Service: ", error);
      throw error;
    }
  }



