import { saveGasto } from '../domain/service/GastoService';
import { fetchAllGastos } from '../domain/service/GastoService';
import { deleteGastoService as deleteGastoService } from '../domain/service/GastoService';
import { findGastoByTitulo } from '../domain/repository/GastoRepository';

export async function handleGastoSubmit(data, user) {
    try {
        await saveGasto(data, user);
        alert("Dados gravados com sucesso!");
    } catch (error) {
        alert("Erro ao gravar os dados: " + error.message);
    }
}

export async function getAllGastos(user) {
    console.log("Dentro do Controller - getAllGastos com userId:", user.uid);
    try {
        const gastos = await fetchAllGastos(user);
        console.log("Gastos recebidos no Controller:", gastos);
        return gastos;
    } catch (error) {
        console.error("Erro ao buscar gastos no Controller:", error);
        throw error;
    }
}

export async function deleteGastoController(userId, titulo) {
    try {
        console.log("deleteGastoController - userId:", userId, "titulo:", titulo);
        await deleteGastoService(userId, titulo);
        console.log("Gasto deletado no Controller.");
    } catch (error) {
        console.error("Erro ao deletar gasto no Controller: ", error);
        throw error;
    }
}


