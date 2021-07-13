import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function btnAdicionar() {
  window.location.href = "/#/divida";
}

export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          {props.acao !== "Adicionar" ? (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
              onClick={() => btnAdicionar()}
            >
              <Tooltip title="Adicionar divida" arrow>
                <AddCircleOutlineIcon />
              </Tooltip>
            </IconButton>
          ) : (
            ""
          )}
          <Typography variant="h6" className={classes.title}>
            Controle de Dividas
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
