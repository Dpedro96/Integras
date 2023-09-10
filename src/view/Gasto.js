import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GastoDTO from '../domain/dto/GastoDTO';
import { handleGastoSubmit } from '../controller/GastoController';
import { getAuthInstance } from '../common/FirebaseAuth';

import "../resources/CSS/Gasto.css"

function Gasto() {
    const navigate = useNavigate();
    const auth = getAuthInstance();
    const currentUser = auth.currentUser;


    // Estados para cada campo do formulário
    const [titulo, setTitulo] = useState('');
    const [valor_max, setValorMax] = useState('');
    const [valor_min, setValorMin] = useState('');
    const [data_deb, setDataDeb] = useState('');
    const [tipoDeGasto, setTipoDeGasto] = useState('fixo');

    const [errors, setErrors] = useState({});

    function handleTipoDeGastoChange(event) {
        setTipoDeGasto(event.target.value);
    }

    const validate = () => {
        let errors = {};

        if (!titulo) errors.titulo = "Este campo é obrigatório";
        if (!valor_max) errors.valor_max = "Este campo é obrigatório e deve ser um número positivo";
        if (!valor_min) errors.valor_min = "Este campo é obrigatório e deve ser um número positivo";
        if (!data_deb) errors.data_deb = "Este campo é obrigatório";

        const valorMaxFloat = parseFloat(valor_max);
        const valorMinFloat = parseFloat(valor_min);

        if (valorMinFloat >= valorMaxFloat) {
            errors.valor_min = "O valor mínimo deve ser menor que o valor máximo";
        }

        if (valorMinFloat < 0 || valorMaxFloat < 0) {
            errors.valor_max = "Os valores não podem ser negativos";
            errors.valor_min = "Os valores não podem ser negativos";
        }

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };
   
    const onSubmit = async (event) => {
        event.preventDefault();
    
        if (!validate()) return;
    
        let valor_medio;
    
        // Verificando o valor da variável tipoGasto
        if (tipoDeGasto === 'variável') {
            valor_medio = (parseFloat(valor_max) + parseFloat(valor_min)) / 2;
        } else {
            valor_medio = parseFloat(valor_max);
        }
    
        const gastoData = new GastoDTO(
            titulo,
            valor_max,
            valor_min,
            valor_medio,
            data_deb,
            tipoDeGasto,
            currentUser.uid
        );
        
        try {
            if (!currentUser) {
                console.error("O usuário não está autenticado.");
                return;
            }

            await handleGastoSubmit(gastoData, currentUser);
            navigate('/home');
        } catch (error) {
            console.error("Erro ao salvar o gasto:", error.message);
        }
    };

    return (
        <div className="fundo_gasto">
            <form onSubmit={onSubmit}>
                <div className="formu">
                    <h1>G a s t o s</h1>
                    <p>
                        <label htmlFor="titulo">Titulo</label>
                        <input
                            className="Titulo"
                            id="titulo"
                            placeholder="Insira titulo do Gasto"
                            value={titulo}
                            onChange={e => setTitulo(e.target.value)}
                        />
                        {errors.titulo && <span className="error">{errors.titulo}</span>}
                    </p>
                    <p>
                        <label htmlFor="valor_max">Valor Maximo Pago</label>
                        <input
                            className="VMaximo"
                            id="valor_max"
                            placeholder="Insira o Valor Maximo"
                            value={valor_max}
                            onChange={e => setValorMax(e.target.value)}
                            type="number"
                            step="0.01"
                            inputMode="numeric"
                        />
                        {errors.valor_max && <span className="error">{errors.valor_max}</span>}
                    </p>
                    <p>
                        <label htmlFor="valor_min">Valor Minimo Pago</label>
                        <input
                            className="VMinimo"
                            id="valor_min"
                            placeholder="Insira o Valor Minimo"
                            value={valor_min}
                            onChange={e => setValorMin(e.target.value)}
                            type="number"
                            step="0.01"
                            inputMode="numeric"
                        />
                        {errors.valor_min && <span className="error">{errors.valor_min}</span>}
                    </p>
                    <p>
                        <label htmlFor="data_deb">Data a ser debitado</label>
                        <input
                            type="date"
                            className="DtDebito"
                            id="data_deb"
                            value={data_deb}
                            onChange={e => setDataDeb(e.target.value)}
                        />
                        {errors.data_deb && <span className="error">{errors.data_deb}</span>}
                    </p>
                    <fieldset className="tipoGasto">
                        <label htmlFor="tipoGasto">Tipo de Gasto: </label>
                        <select id="tipoGasto" name="tipoGasto" value={tipoDeGasto} onChange={handleTipoDeGastoChange}>
                            <option value="fixo">Fixo</option>
                            <option value="variável">Variável</option>
                        </select>
                    </fieldset>
                    <div className='btnSubmit'>
                        <input type="submit" value="Criar" />
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Gasto;
