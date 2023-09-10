class GastoModel {
    constructor(titulo, valor_max, valor_min, data_deb, tipoGasto, userId, email) {
        this.titulo = titulo;
        this.valor_max = valor_max;
        this.valor_min = valor_min;
        this.data_deb = data_deb;
        this.tipoGasto = tipoGasto;
        this.userId = userId;
        this.email = email;
    }
}
export default GastoModel;
