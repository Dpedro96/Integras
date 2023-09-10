// contaCorrenteDTO.js
export class EditarContaCorrenteDTO {
  constructor(nomeBanco, rendaMensal, rendaTotal, data) {
    this.nomeBanco = nomeBanco;
    this.rendaMensal = rendaMensal;
    this.rendaTotal = rendaTotal;
    this.data = data;
  }
}
