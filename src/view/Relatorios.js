import { useEffect, useState } from 'react';
import { deleteGastoController, getAllGastos } from '../controller/GastoController'; // Lembre-se de corrigir esse caminho
import "../resources/CSS/Relatorio.css";
import { Chart } from 'react-google-charts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { getAuthInstance } from '../common/FirebaseAuth';
import { CofrinhoController } from '../controller/CofrinhoController';
import { getAllContasCorrentes, deleteContaCorrente } from '../domain/repository/ContaCorrenteRepository';
import ContaCorrenteController from '../controller/ContaCorrenteController';




function Relatorios() {
    const contaCorrenteController = new ContaCorrenteController();
    const cofrinhoController = new CofrinhoController();
    const [gastos, setGastos] = useState([]);
    const [cofrinho, setCofrinho] = useState({});
    const [contasCorrentes, setContasCorrentes] = useState([]); // Adicione o estado para contas correntes
    const gastos_totais = gastos.reduce((total, gasto) => total + gasto.valor_medio, 0);
    const auth = getAuthInstance();
    const user = auth.currentUser;
    const userId = user ? user.uid : null;
    const [, setMessage] = useState(null);
    const [updateState, setUpdateState] = useState(false);
    const rendaTotal = contasCorrentes.reduce((acc, conta) => acc + conta.rendaTotal, 0);






    useEffect(() => {
        // Para gastos (já existente)
        getAllGastos(user)
            .then(data => setGastos(data))
            .catch(err => console.error(err));

        // Para cofrinhos
        const userEmail = cofrinhoController.getCurrentUserEmail();
        if (userEmail) {
            cofrinhoController.getCofrinhoByEmail(userEmail)
                .then(data => setCofrinho(data))
                .catch(err => console.error(err));

            const userEmail1 = contaCorrenteController.getCurrentUserEmail();
            if (userEmail1) {
                contaCorrenteController.getContaCorrenteByEmail()
                    .then(data => setContasCorrentes([data])) // encapsula em um array para ser iterado depois
                    .catch(err => console.error(err));
            }
        }

    }, [updateState]);


    const handleDeleteCofrinho = async (userId, nomeCofrinho) => {
        if (window.confirm("Tem certeza de que deseja deletar este cofrinho?")) {
            try {
                console.log("Iniciando exclusão do cofrinho...");
                const controller = new CofrinhoController();
                nomeCofrinho = nomeCofrinho.toLowerCase();

                // Comente a chamada abaixo para teste
                await controller.deleteCofrinhoByUserIdAndName(userId, nomeCofrinho);
                const updatedCofrinhos = await controller.getCofrinhoByUser(userId);

                // Atualize a lista de cofrinhos
                setCofrinho(updatedCofrinhos);

            } catch (error) {
                console.error("Erro ao deletar o cofrinho:", error);
                console.error("Stack do erro:", error.stack);
                window.alert("Ocorreu um erro ao tentar deletar o cofrinho.");
                throw new Error("Erro desconhecido ao deletar.");
            }

            setMessage("Deletado com sucesso!");
            setUpdateState(!updateState);
        }
    };


    const handleDeleteContaCorrente = async (userId) => {
        console.log(`handleDeleteContaCorrente iniciado para userId: ${userId}`);
    
        if (window.confirm("Tem certeza de que deseja deletar esta conta corrente?")) {
            try {
                console.log("Tentando excluir a conta corrente com ID:", userId);
                await deleteContaCorrente(userId);
                
                console.log("Buscando todas as contas correntes atualizadas...");
                const updatedContasCorrentes = await getAllContasCorrentes(userId);
                console.log("Contas correntes retornadas após a exclusão:", updatedContasCorrentes);
                
                setContasCorrentes(updatedContasCorrentes);
                console.log("Lista de contas correntes atualizada.");
                window.alert("Conta corrente deletada com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar a conta corrente:", error);
                window.alert("Erro ao deletar a conta corrente. Por favor, tente novamente.");
            }
        } else {
            console.log("Usuário optou por não deletar a conta corrente.");
        }
    }
    
    


    const handleDelete = async (userId, titulo) => {
        if (!userId || !titulo) {
            console.error("O userId ou o título do gasto não estão definidos. Não é possível prosseguir com a exclusão.");
            return;
        }

        if (window.confirm("Tem certeza de que deseja deletar este gasto?")) {
            try {
                console.log("Iniciando exclusão...");
                console.log("Título do gasto a ser excluído:", titulo);
                await deleteGastoController(userId, titulo);
                const updatedGastos = await getAllGastos({ uid: userId }); // Passamos o objeto de usuário com a propriedade "uid"
                setGastos(updatedGastos);
                console.log("Lista de gastos atualizada.");
                window.alert("Gasto deletado com sucesso!");
            } catch (error) {
                console.error("Erro ao deletar o gasto:", error);
                window.alert("Erro ao deletar o gasto. Por favor, tente novamente.");
            }
        }
    };

    return (
        <div className='fundoRlt'>
            <div className="realtorio-container">
                <div className="cofrinho-info">
                    <h2>Meu Cofrinho</h2>
                    {
                        cofrinho.nomeCofrinho && cofrinho.descricaoCofrinho && cofrinho.valorMensalCofrinho && cofrinho.metaCofrinho
                            ? (
                                <div className="cofrinho-details">
                                    <div>
                                        <strong>Nome:</strong> {cofrinho.nomeCofrinho}
                                    </div>
                                    <div>
                                        <strong>Descrição:</strong> {cofrinho.descricaoCofrinho}
                                    </div>
                                    <div>
                                        <strong>Valor Total:</strong> {cofrinho.valorMensalCofrinho}
                                    </div>
                                    <div>
                                        <strong>Meta:</strong> {cofrinho.metaCofrinho}
                                    </div>
                                    {/* Barra de Progresso */}
                                    <div>
                                        <strong>Progresso:</strong>
                                        <progress
                                            value={cofrinho.valorMensalCofrinho}
                                            max={cofrinho.metaCofrinho}
                                            style={{ width: "100%" }}
                                        ></progress>
                                        <div>
                                            {((cofrinho.valorMensalCofrinho / cofrinho.metaCofrinho) * 100).toFixed(2)}%
                                        </div>
                                    </div>
                                    {/* Fim da Barra de Progresso */}
                                    <button className="delete-button" onClick={() => handleDeleteCofrinho(cofrinho.userId, cofrinho.nomeCofrinho)}>
                                        <FontAwesomeIcon icon={faTrash}/>
                                    </button>
                                </div>
                            )
                            : null
                    }
                </div>
                <div className="conta-corrente-info">
                    <h2>Informações Renda Bruta</h2>
                    {contasCorrentes.map((contaCorrente, index) => (
                        <div key={index}>
                            <p>Nome Banco: {contaCorrente.nomeBanco}</p>
                            <p>Renda Mensal: {contaCorrente.rendaMensal}</p>
                            <p>Renda Total: {contaCorrente.rendaTotal}</p>
                            <p>Data: {contaCorrente.data}</p>
                            <button
                                className="delete-button"
                                onClick={() => handleDeleteContaCorrente(contaCorrente.id)}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </button>
                        </div>
                    ))}
                </div>

                <div className="gastos-info gastos-tabela-wrapper">
                    <h2>Informações de Gastos</h2>

                    <table className="gastos-tabela">
                        <thead>
                            <tr className='ABB'>
                                <th>Título</th>
                                <th>Tipo de Gasto</th>
                                <th>Valor</th>
                                <th>Data a ser debitado</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {gastos.map((gasto, index) => (
                                gasto.titulo && gasto.tipoGasto && gasto.data_deb && gasto.valor_medio ? (
                                    <tr key={index}>
                                        <td>{gasto.titulo}</td>
                                        <td>{gasto.tipoGasto}</td>
                                        <td>{gasto.valor_medio}</td>
                                        <td>{gasto.data_deb}</td>
                                        <td>
                                            <button className="delete-button" onClick={() => handleDelete(userId, gasto.titulo)}>
                                                <FontAwesomeIcon icon={faTrash} />
                                            </button>
                                        </td>
                                    </tr>
                                ) : null
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <PieChart gastos={gastos} rendaTotal={rendaTotal} />
                        <BarChart gastos_totais={gastos_totais} rendaTotal={rendaTotal} />
                    </div>
                    <div>
                    <p>Gastos Totais: R${gastos_totais.toFixed(2)}</p>

                    </div>
                </div>
            </div>
        </div>
    );

}

function PieChart({ gastos, rendaTotal }) {
    const data = [['Título', 'Valor']];

    const total = gastos.reduce((acc, gasto) => acc + gasto.valor_medio, rendaTotal);

    gastos.forEach(gasto => {
        const percentage = ((gasto.valor_medio / total) * 100).toFixed(2);
        data.push([`${gasto.titulo} (${percentage}%)`, gasto.valor_medio]);
    });

    const rendaPercentage = ((rendaTotal / total) * 100).toFixed(2);
    // Adicionar rendaTotal com porcentagem no título
    data.push([`Renda Total (${rendaPercentage}%)`, rendaTotal]);

    // Criando array de cores: todos os gastos em vermelho e a rendaTotal em verde
    const colors = gastos.map(() => 'red').concat(['green']);

    const options = {
        title: 'Gráfico referente a todos os gastos e renda do usuário',
        pieSliceText: 'none', // para não mostrar o texto nas fatias do gráfico
        colors: colors,
        legend: {
            position: 'right', // ajustar conforme necessário
            textStyle: {
                fontSize: 12 // ajustar conforme necessário
            }
        }
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width="100%"
            height="400px"
            legendToggle
        />
    );
}


function BarChart({ gastos_totais, rendaTotal }) {
    const data = [
        ['Categoria', 'Valor', { role: 'style' }],
        ['Gastos', gastos_totais, 'red'],
        ['Renda Total', rendaTotal, 'green']
    ];

    const options = {
        title: 'Relação entre a Renda Total e os Gastos totais do usuário',
        legend: { position: 'none' },
        hAxis: { title: 'Categoria' },
        vAxis: { title: 'Valor' },
        colors: ['red', 'green']
    };

    return (
        <Chart
            chartType="BarChart"
            data={data}
            options={options}
            width="100%"
            height="400px"
            legendToggle
        />
    );
}

export default Relatorios;
