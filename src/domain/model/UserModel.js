// src/domain/model/UserModel.js

export default class UserModel {
  constructor(dto) {
    this.nome = dto.nome;
    this.email = dto.email;
    this.cpf = dto.cpf;
    this.telefone = dto.telefone;
    this.senha = dto.senha;
  }

  isValid() {
    return this.nome && this.email && this.cpf && this.telefone && this.senha;
  }
}
