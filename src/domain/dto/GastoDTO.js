class GastoDTO {
    constructor(titulo, valor_max, valor_min, valor_medio, data_deb, tipoGasto, userId) {
        this.titulo = titulo;
        this.valor_max = valor_max;
        this.valor_min = valor_min;
        this.data_deb = data_deb;
        this.tipoGasto = tipoGasto;
        this.userId = userId;
        this.valor_medio = valor_medio;
    }
}

export default GastoDTO;
