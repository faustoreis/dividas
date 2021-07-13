import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Barra from "../barra";
import IconButton from "@material-ui/core/IconButton";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import MonetizationOnOutlinedIcon from "@material-ui/icons/MonetizationOnOutlined";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: "360px",
  },
  head: {
    backgroundColor: "#A9A9A9",
    fontWeight: "bold",
  },
  root: {
    width: "90%",
    margin: "15px",
    textAlign: "left",
    padding: "15px",
  },
}));

const ListaDividas = () => {
  const classes = useStyles();
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    fetch(
      "https://provadev.xlab.digital/api/v1/divida/?uuid=3e60d394-76e4-4d0f-a2ea-b26f4c5e2311"
    )
      .then((response) => response.json())
      .then((data) => setRows(data.result));
  }, []);

  function btnEditar(id) {
    window.location.href = "/#/divida?id=" + id;
  }

  return (
    <>
      <Barra />
      <Paper className={classes.root}>
        <Typography
          variant="h4"
          style={{ textAlign: "left", marginBottom: "1em" }}
        >
          <MonetizationOnOutlinedIcon fontSize="large" /> Lista de Dividas
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="caption table">
            <TableHead>
              <TableRow>
                <TableCell className={classes.head}>ID</TableCell>
                <TableCell className={classes.head}>Motivo</TableCell>
                <TableCell className={classes.head} align="right">
                  Valor
                </TableCell>
                <TableCell className={classes.head}>Data</TableCell>
                <TableCell className={classes.head}>Opção</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.idUsuario}>
                  <TableCell component="th" scope="row">
                    {row.idUsuario}
                  </TableCell>
                  <TableCell>{row.motivo}</TableCell>
                  <TableCell align="right">
                    {new Intl.NumberFormat("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    }).format(row.valor)}
                  </TableCell>
                  <TableCell>
                    {new Intl.DateTimeFormat().format(new Date(row.criado))}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Editar"
                      onClick={() => btnEditar(row._id)}
                    >
                      <Tooltip title="Editar divida" arrow>
                        <EditOutlinedIcon />
                      </Tooltip>
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
};

export default ListaDividas;
