import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({

  section:{
    marginTop:25,
    marginBottom:1,
  },
  navbar: {
    backgroundColor: "#000000",
    "& a": {
      color: "#fff",
      marginLeft: 10,
    },
  },
  main: {
    minHeight: "80vh",
  },
  footer: {
    textAlign: "center",
  },
  canvas: {
    height: 500,
  },
  title:{
    marginLeft: 50,
  },
  mark:{
    marginLeft: 50,
  },
  fullWidth:{
    width: "100%",
  }
});

export default useStyles;
