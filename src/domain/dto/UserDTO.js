// src/domain/dto/UserDTO.js

export class UserDTO {
  constructor(nome, email, cpf, telefone, senha) {
    this.nome = nome;
    this.email = email;
    this.cpf = cpf;
    this.telefone = telefone;
    this.senha = senha;
  }
}
