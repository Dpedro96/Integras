import "../resources/CSS/HomePage.css";
import i1 from "../resources/img/img1.jpg";
import i3 from "../resources/img/img3.jpg";
import i4 from "../resources/img/img4.jpg";
import i5 from "../resources/img/img5.jpg";
import imgRelatorios from "../resources/img/WhatsApp_Image_2023-08-20_at_16.42.37-removebg-preview.png";
import imgCofrinho from "../resources/img/WhatsApp_Image_2023-08-20_at_16.51.58__2_-removebg-preview-removebg-preview.png";
import imgRenda from "../resources/img/WhatsApp_Image_2023-08-20_at_17.08.13-removebg-preview.png";
import imgGastos from "../resources/img/WhatsApp_Image_2023-08-20_at_21.18.55-removebg-preview.png";
import { Carousel, Card, Button, Image } from "react-bootstrap";

function HomePage() {
  return (
    <section className="background">
      <Carousel >
        <Carousel.Item className="carrosel">
          <img src={i1} alt="First slide" className="img" />
          <Carousel.Caption>
            <div className="carousel-text">
              <h2>Controle Total</h2>
              <p>
                Com o PoupAqui você consegue controlar seus gastos de maneira
                muita mais eficeiente e organizada
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item >
        <Carousel.Item className="carrosel">
          <img src={i3} alt="First slide" className="img" />
          <Carousel.Caption>
            <div className="carousel-text">
              <h2>Maior Praticidade</h2>
              <p>Controle suas contas de um jeito muito mais no confortavel</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carrosel">
          <img src={i4} alt="First slide" className="img" />
          <Carousel.Caption>
            <div className="carousel-text">
              <h2>Sem Sofrimento</h2>
              <p>
                Junte-se a nós e faça o seus controle financeiro de forma facil
                e pratica
              </p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="carrosel">
          <img src={i5} alt="First slide" className="img" />
          <Carousel.Caption>
            <div className="carousel-text">
              <h2>Gestão Conciente</h2>
              <p>Faça seus planejamentos futuros de uma forma inovadora</p>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <div className=" container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-3">
            <Card className="cardes mb-4" bg="success">
              <Card.Img className="imge" variant="top" src={imgGastos} />
              <Card.Body>
                <Card.Title>Gastos</Card.Title>
                <Card.Text>
                  Gerencie seus gastos de forma simples e fácil.
                </Card.Text>
                <Button variant="primary" href="#gastos-section">
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="mb-4" bg="success">
              <Card.Img className="imge img1" src={imgRenda} />
              <Card.Body>
                <Card.Title>Renda</Card.Title>
                <Card.Text>
                  Gerencie seus gastos de forma simples e fácila
                </Card.Text>
                <Button variant="primary" href="#renda-section">
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="mb-4" bg="success">
              <Card.Img className="imge img1" variant="top" src={imgCofrinho} />
              <Card.Body>
                <Card.Title>Cofrinho</Card.Title>
                <Card.Text>
                  Gerencie seus gastos de forma simples e fácila
                </Card.Text>
                <Button variant="primary" href="#cofrinho-section">
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="mb-4" bg="success">
              <Card.Img className="imge" variant="top" src={imgRelatorios} />
              <Card.Body>
                <Card.Title>Relatorio</Card.Title>
                <Card.Text>
                  Gerencie seus gastos de forma simples e fácila
                </Card.Text>
                <Button variant="primary" href="#relatorios-section">
                  Go somewhere
                </Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <hr className="featurette-divider" />
        <div className="row featurette" id="gastos-section">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">Gastos </h2>
            <p className="lead">
              Registre seus gastos mensais com facilidade. Adicione todas as
              despesas, desde contas fixas até pequenas compras diárias.
              Mantenha o controle total sobre onde seu dinheiro está sendo
              gasto. Visualize seus padrões de gastos ao longo do tempo para
              identificar áreas onde você pode economizar e tomar medidas para
              uma gestão financeira mais eficaz.
            </p>
          </div>
          <div className="col-md-5">
            <Image className="imgGastos" src={imgGastos} fluid />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette" id="renda-section">
          <div className="col-md-7 order-md-2">
            <h2 className="featurette-heading fw-normal lh-1">Renda</h2>
            <p className="lead renda">
              Organize suas informações financeiras com a seção de Renda.
              Cadastre suas contas bancárias e salários de forma segura. Essa
              funcionalidade ajuda você a ter uma visão clara de sua renda
              disponível e a gerenciar melhor suas finanças.
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <Image className="imgRenda" src={imgRenda} fluid />
          </div>
        </div>
        <hr className="featurette-divider" />
        <div className="row featurette" id="cofrinho-section">
          <div className="col-md-7">
            <h2 className="featurette-heading fw-normal lh-1">Cofrinho</h2>
            <p className="lead">
              Defina metas financeiras alcançáveis com a funcionalidade do
              Cofrinho. Saiba exatamente quanto você deseja economizar e
              acompanhe seu progresso à medida que você se aproxima de suas
              metas. É uma ótima maneira de alcançar objetivos financeiros
              importantes.
            </p>
          </div>
          <div className="col-md-5">
            <Image className="imgCofre" src={imgCofrinho} fluid />
          </div>
        </div>
        <hr class="featurette-divider" />
        <div className="row featurette " id="relatorios-section">
          <div class="col-md-7 order-md-2">
            <h2 class="featurette-heading fw-normal lh-1">Relatórios</h2>
            <p class="lead">
              Tenha acesso a informações detalhadas sobre suas finanças com a
              funcionalidade de Relatórios. Visualize todos os seus gastos,
              renda e o progresso em direção às suas metas de economia. Os
              relatórios ajudam a tomar decisões financeiras informadas.
            </p>
          </div>
          <div class="col-md-5 order-md-1">
            <Image className="imgRelato" src={imgRelatorios} fluid />
          </div>
        </div>
        <hr class="featurette-divider barra" />
      </div>
    </section>
  );
}
export default HomePage;
