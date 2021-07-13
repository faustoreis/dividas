import React from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Barra from "../barra";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import Mensagem from "../mensagem";

const style = {
  root: {
    width: "90%",
    margin: "15px",
    textAlign: "left",
    padding: "15px",
  },
  button: {
    margin: "15px",
  },
};

class FormCadastro extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    let parametro = props.location.search ? props.location.search : "";
    this.state = {
      rowsCli: [],
      _id: parametro.substr(parametro.indexOf("=") + 1),
      data: {
        idUsuario: "",
        motivo: "",
        valor: "",
      },
      abriMsg: false,
      txtMsg: "",
    };
    this.lerClientes();
    if (parametro) this.lerDivida();
  }

  lerClientes() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((json) => this.setRowsCli(json));
  }

  setRowsCli(json) {
    this.setState({ rowsCli: json });
  }

  lerDivida() {
    fetch(
      "https://provadev.xlab.digital/api/v1/divida/" +
        this.state._id +
        "?uuid=3e60d394-76e4-4d0f-a2ea-b26f4c5e2311"
    )
      .then((response) => response.json())
      .then((data) => {
        let dados = {
          idUsuario: data.result.idUsuario,
          motivo: data.result.motivo,
          valor: data.result.valor.toFixed(2).toString().replace(".", ","),
        };
        this.setDivida(dados);
      });
  }

  setDivida(json) {
    this.setState({ data: json });
  }

  btnSalvar() {
    let URL;
    let options;
    let dados = {
      idUsuario: this.state.data.idUsuario,
      motivo: this.state.data.motivo,
      valor: parseFloat(this.state.data.valor.replace(",", ".")).toFixed(2),
    };
    var body = JSON.stringify(dados);
    if (this.props.acao === "Editar") {
      options = {
        method: "PUT",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      };
      URL =
        "https://provadev.xlab.digital/api/v1/divida/" +
        this.state._id +
        "?uuid=3e60d394-76e4-4d0f-a2ea-b26f4c5e2311";
    } else {
      options = {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
      };
      URL =
        "https://provadev.xlab.digital/api/v1/divida/?uuid=3e60d394-76e4-4d0f-a2ea-b26f4c5e2311";
    }

    return fetch(URL, options)
      .then((T) => {
        console.log(T);
        if (T.status === 200) {
          // window.location.href = "/";
        } else {
          this.setState({
            abriMsg: true,
            txtMsg: "A dívida não pode ser registrada, falta algum parâmetro.",
          });
        }
      })
      .then((json) => console.log("msg", json));
  }

  btnExcluir() {
    const options = {
      method: "DELETE",
    };
    let URL =
      "https://provadev.xlab.digital/api/v1/divida/" +
      this.state._id +
      "?uuid=3e60d394-76e4-4d0f-a2ea-b26f4c5e2311";

    return fetch(URL, options).then((T) => {
      window.location.href = "/";
    });
  }

  btnCancelar() {
    window.location.href = "/";
  }

  setar(valor, campo) {
    var dados = this.state.data;
    dados[campo] = valor.target.value;
    this.setState({ data: dados });
  }

  updateDlg() {
    this.setState({ abriMsg: false });
  }

  render() {
    return (
      <>
        {this.state.abriMsg ? (
          <Mensagem
            abriMsg={this.state.abriMsg}
            txtMsg={this.state.txtMsg}
            updateDlg={() => {
              this.updateDlg();
            }}
          />
        ) : (
          ""
        )}
        <Typography
          variant="h4"
          style={{ textAlign: "left", marginBottom: "1em" }}
        >
          Cadastro de Dividas
        </Typography>
        <div ref={this.myRef}>
          <FormControl variant="outlined">
            <InputLabel id="outlined-label-cliente">Cliente</InputLabel>
            <Select
              labelId="outlined-label-cliente"
              style={{ marginBottom: "15px", width: "300px" }}
              value={this.state.data.idUsuario}
              onChange={(ev) => this.setar(ev, "idUsuario")}
              label="Cliente"
            >
              {this.state.rowsCli.map((rowCli) => {
                return <MenuItem value={rowCli.id}>{rowCli.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </div>
        <div ref={this.myRef}>
          <TextField
            value={this.state.data.motivo}
            onChange={(ev) => this.setar(ev, "motivo")}
            style={{ marginBottom: "15px", width: "300px" }}
            label="Motivo"
            variant="outlined"
          />
        </div>
        <div ref={this.myRef}>
          <TextField
            onChange={(ev) => this.setar(ev, "valor")}
            style={{
              marginBottom: "15px",
              width: "250px",
            }}
            label="Valor"
            variant="outlined"
            value={this.state.data.valor}
          />
        </div>
        <Button
          variant="contained"
          style={style.button}
          onClick={() => this.btnCancelar()}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          style={style.button}
          onClick={() => this.btnSalvar()}
        >
          Salvar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={style.button}
          onClick={() => this.btnExcluir()}
          disabled={this.props.acao === "Adicionar"}
        >
          Excluir
        </Button>
      </>
    );
  }
}

const Formulario = (props) => {
  const [acao] = React.useState(props.location.search ? "Editar" : "Adicionar");

  return (
    <>
      <Barra acao={acao} />
      <Paper style={style.root}>
        <FormCadastro {...props} acao={acao} />
      </Paper>
    </>
  );
};

export default Formulario;
