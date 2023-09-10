import { FaPiggyBank, FaDollarSign, FaMoneyBill } from "react-icons/fa";
import { BiBarChartAlt, BiX } from "react-icons/bi";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContaCorrenteService from "../domain/service/ContaCorrenteService";
import { CofrinhoService } from "../domain/service/CofrinhoService";
import { Container, Row, Col, Card, Button, Image } from "react-bootstrap";
import imgAlt from "../resources/img/michel-com-a-mão.png";
import "../resources/CSS/Home.css";

function Home() {
  const [showAddRendaExtra, setShowAddRendaExtra] = useState(false);
  const [showAddCofrinho, setShowAddCofrinho] = useState(false);
  const [showResgateCofrinho, setShowResgateCofrinho] = useState(false);
  const contaCorrenteService = new ContaCorrenteService();
  const cofrinhoService = new CofrinhoService();
  const [valorMensal, setValorMensal] = useState(0); // Estado para armazenar o valor mensal a ser adicionado
  const [selected, setSelected] = useState("Selecione Um Icone");
  const descriptions = {
    Gastos:
      "Na seção de Gastos, você poderá cadastrar todas as suas despesas mensais. Oferecemos duas maneiras de fazer isso: Gasto Fixo, onde você insere um valor máximo, e Gasto Variado, onde você informa tanto o valor máximo quanto o valor mínimo. O sistema calculará automaticamente uma média desses valores, fornecendo uma visão abrangente de seus gastos mensais.",
    Cofrinho:
      "A funcionalidade do Cofrinho é ideal para planejar gastos a longo prazo, como uma viagem de fim de ano ou a compra de um carro novo. Comece definindo sua meta financeira e o valor inicial que você já possui. À medida que os dias passam, você pode adicionar mais dinheiro ao seu Cofrinho para alcançar sua meta. E, se precisar de dinheiro no meio do caminho, também é possível fazer retiradas do Cofrinho.",
    Renda:
      "Na seção de Renda, você pode cadastrar seu salário bruto mensal. Além disso, oferecemos a flexibilidade de editar esse valor ou adicionar qualquer renda extra que você possa receber em um determinado mês. Seja um bônus, um presente ou qualquer outra forma de receita inesperada, você pode registrá-la aqui para manter seu orçamento atualizado",
    Relatórios:
      "Os Relatórios fornecem uma visão completa de suas finanças. Você poderá visualizar todos os seus registros financeiros, incluindo o progresso em relação à sua meta no cofrinho, sua renda bruta, todos os seus gastos e até mesmo gráficos para identificar facilmente seus maiores gastos do mês. Além disso, os Relatórios permitem que você exclua qualquer um dos seus registros financeiros, oferecendo total controle sobre seus dados financeiros pessoais.",
  };

  function handleAddCofrinhoClick() {
    setShowAddCofrinho(true);
  }

  function handleAddRendaExtraClick() {
    setShowAddRendaExtra(true);
  }

  async function handleResgateCofrinhoClick() {
    setShowResgateCofrinho(true);
  }

  const handleAddValorMensal = async () => {
    try {
      await cofrinhoService.addValorMensalToCofrinho(valorMensal);
      setShowAddCofrinho(false); // Fechar o formulário após o sucesso
    } catch (error) {
      console.error("Erro ao adicionar valor mensal ao cofrinho:", error);
    }
  };

  const handleResgatarValorMensal = async () => {
    const valorResgate = Number(document.getElementById("valorR").value);

    try {
      // Chama a função para subtrair o valor do cofrinho (esse método ainda precisa ser criado)
      await cofrinhoService.ResgatarValorMensalToCofrinho(valorResgate);

      // Fechar o formulário após o sucesso
      setShowResgateCofrinho(false);
    } catch (error) {
      console.error("Erro ao resgatar valor mensal do cofrinho:", error);
    }
  };

  const handleAddRendaExtra = async () => {
    const valor = document.getElementById("rendaExtra").value;
    try {
      await contaCorrenteService.addRendaExtra(valor); // Use a função real do serviço aqui
      setShowAddRendaExtra(false); // Fechar o formulário após o sucesso
    } catch (error) {
      console.error("Erro ao adicionar renda extra:", error);
    }
  };

  return (
    <section>
      <Container fluid>
        <Row>
          <Col className="corpo-sup">
            <Row>
              <Col lg="6">
                <h1>A maneira mais fácil de gerenciar finanças pessoais</h1>
                <p>
                  O gerenciador de gastos que você precisava a um click de
                  distância, adicione seus gastos, lucros e planos futuros que a
                  gente da um jeito para você
                </p>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
      <Container>
        <Row className="posicaoCard">
          <Col md="3">
            <Card id="gastoCard" style={{ width: "16rem" }}>
              <Card.Body>
                <span className="lgGastos">
                  <FaDollarSign />
                </span>
                <Card.Title className="tituloGasto">Gasto</Card.Title>
                <Card.Subtitle className="textoGasto mb-2 text-muted">
                  Para Gerenciar seus Gastos clique aqui!!
                </Card.Subtitle>
                <Link to="/gastos">
                  <button
                    type="button"
                    className="bt_comecar"
                    variant="primary"
                  >
                    Criar
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3">
            <Card id="gastoCard" style={{ width: "16rem" }}>
              <Card.Body>
                <span className="lgGastos">
                  <FaPiggyBank />
                </span>
                <Card.Title className="tituloGasto">Cofrinho</Card.Title>
                <Card.Subtitle className="textoGasto mb-2 text-muted">
                  Para Gerenciar seu Cofrinho clique aqui!!
                </Card.Subtitle>
                <Link to="/cofrinho">
                  <button type="button " className="bt_criar bt_comecar">
                    Criar
                  </button>
                </Link>
                <button
                  type="button "
                  className="bt_resgatar bt_comecar"
                  onClick={handleAddCofrinhoClick}
                >
                  Adicionar
                </button>
                <button
                  type="button "
                  className="bt_resgatar bt_comecar"
                  onClick={handleResgateCofrinhoClick}
                >
                  Resgatar
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3">
            <Card id="gastoCard" style={{ width: "16rem" }}>
              <Card.Body>
                <span className="lgGastos">
                  <FaMoneyBill />
                </span>
                <Card.Title className="tituloGasto">Renda Bruta</Card.Title>
                <Card.Subtitle className="textoGasto mb-2 text-muted">
                  Para Gerenciar sua Renda clique aqui!!
                </Card.Subtitle>
                <Link to="/contaCorrente">
                  <button type="button " className="bt_criar bt_comecar">
                    Criar
                  </button>
                </Link>
                <Link to="/EditarContaCorrente">
                  <button
                    type="button "
                    className="bt_comecar"
                    onClick={handleAddCofrinhoClick}
                  >
                    Adicionar
                  </button>
                </Link>
                <button
                  type="button "
                  className="bt_criar bt_comecar"
                  onClick={handleAddRendaExtraClick}
                >
                  Extra
                </button>
              </Card.Body>
            </Card>
          </Col>
          <Col md="3">
            <Card id="gastoCard" style={{ width: "16rem" }}>
              <Card.Body>
                <span className="lgGastos">
                  <BiBarChartAlt />
                </span>
                <Card.Title className="tituloGasto">Relatórios</Card.Title>
                <Card.Subtitle className="textoGasto mb-2 text-muted">
                  Para ver o relatorio completo aqui!!
                </Card.Subtitle>
                <Link to="/relatorios">
                  <button type="button " className="bt_comecar">
                    Ver
                  </button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {showAddCofrinho && (
        <div className="cofrinho-overlay">
          <div className="cofrinho-form">
            <h2>Adicionar valor ao Cofrinho</h2>
            <form>
              <label htmlFor="valor">Valor</label>
              <input
                type="number"
                name="valor"
                id="valor"
                value={valorMensal}
                onChange={(e) => setValorMensal(e.target.value)}
              />
              <button type="button" onClick={handleAddValorMensal}>
                Adicionar
              </button>
              <button
                className="btnX"
                onClick={() => setShowAddCofrinho(false)}
              >
                <BiX />
              </button>
            </form>
          </div>
        </div>
      )}
      {showResgateCofrinho && (
        <div className="cofrinho-overlay">
          <div className="cofrinho-form">
            <h2>Resgatar um valor do Cofrinho</h2>
            <form>
              <label htmlFor="valorR">Valor </label>
              <input type="number" id="valorR" name="valorR" />
              <button type="button" onClick={handleResgatarValorMensal}>
                Resgatar
              </button>
              <button
                className="btnX"
                onClick={() => setShowResgateCofrinho(false)}
              >
                <BiX />
              </button>
            </form>
          </div>
        </div>
      )}
      {showAddRendaExtra && (
        <div className="cofrinho-overlay">
          <div className="cofrinho-form">
            <h2>Adicionar Renda Extra</h2>
            <form>
              <label htmlFor="rendaExtra">Valor </label>
              <input type="text" name="valor" id="rendaExtra" />
              <button type="button" onClick={handleAddRendaExtra}>
                Adicionar
              </button>
              <button
                className="btnX"
                onClick={() => setShowAddRendaExtra(false)}
              >
                <BiX />
              </button>
            </form>
          </div>
        </div>
      )}
      <Container>
        <hr className="linha featurette-divider" />
        <Row className="justify-content-center align-items-center">
          <Col md="8">
            <div className="title">{selected}</div>
            <div className="description">{descriptions[selected]}</div>
          </Col>
          <Col md="12">
            <div className="icon-bar">
              <div className="top-strip">
                <div className={selected === "Gastos" ? "highlight" : ""}></div>
                <div
                  className={selected === "Cofrinho" ? "highlight" : ""}
                ></div>
                <div className={selected === "Renda" ? "highlight" : ""}></div>
                <div
                  className={selected === "Relatórios" ? "highlight" : ""}
                ></div>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-center align-items-center">
          <Col md="3">
            <div className="boxIcone">
              <Button
                variant="link"
                onClick={() => setSelected("Gastos")}
                className={selected === "Gastos" ? "selected" : ""}
              >
                <FaDollarSign className="icon" />
              </Button>
            </div>
          </Col>
          <Col md="3">
            <div className="boxIcone">
              <Button
                variant="link"
                onClick={() => setSelected("Cofrinho")}
                className={selected === "Cofrinho" ? "selected" : ""}
              >
                <FaPiggyBank className="icon" />
              </Button>
            </div>
          </Col>
          <Col md="3">
            <div className="boxIcone">
              <Button
                variant="link"
                onClick={() => setSelected("Renda")}
                className={selected === "Renda" ? "selected" : ""}
              >
                <FaMoneyBill className="icon" />
              </Button>
            </div>
          </Col>
          <Col md="3">
            <div className="boxIcone">
              <Button
                variant="link"
                onClick={() => setSelected("Relatórios")}
                className={selected === "Relatórios" ? "selected" : ""}
              >
                <BiBarChartAlt className="icon" />
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
      <Container>
        <hr className="linha featurette-divider" />
        <Row>
          <Col md="6">
            <Image className="imagem-texto" src={imgAlt} fluid />
          </Col>
          <Col md="6" className="descriptiontexto-container">
            <p className="descriptiontexto">
              Na jornada de construir um futuro financeiramente sólido,
              oferecemos uma plataforma que vai além do simples gerenciamento de
              gastos e renda. Aqui, cultivamos a confiança, a disciplina e a
              liberdade financeira. Permita-nos guiá-lo enquanto você cria um
              amanhã mais seguro e próspero, um centavo de cada vez !
            </p>
          </Col>
        </Row>
        <hr className="linha featurette-divider" />
      </Container>
    </section>
  );
}

export default Home;
