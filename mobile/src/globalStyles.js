import { StyleSheet } from "react-native";
import { DarkGray } from "../assets/colors";


const gs = StyleSheet.create({
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  justifyCenter: {
    justifyContent: "center",
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between'
  },
  regularText: {
    fontFamily: "InterRegular",
    fontSize: 20,
    marginTop: 10,
    color: DarkGray
  },
  alignStart: {
    alignItems: 'flex-start'
  },
  alignCenter: {
    alignItems: 'center'
  },
  alignEnd: {
    alignItems: 'flex-end'
  }
})

export default gs;