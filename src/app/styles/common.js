import { BAND_COLORS } from "./bandColors"

const commonStyles = {
  "& .nice-table": {
    borderCollapse: "collapse",
    "& th": {
      boxSizing: "content-box",
      borderBottom: "1px solid #666",
      margin: 0,
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
    },
    "& td": {
      boxSizing: "content-box",
      margin: 0,
      paddingLeft: "0.5em",
      paddingRight: "0.5em",
    },
    "& tr.totals": {
      borderTop: "1px solid #666",
    },
  },
}

Object.entries(BAND_COLORS).forEach((entry) => {
  commonStyles[`& .band-colors .band-${entry[0]} .band-color`] = {
    color: entry[1],
    filter: "brightness(0.85)",
  }
  commonStyles[`& .band-colors .band-${entry[0]} .band-bgcolor`] = {
    backgroundColor: entry[1],
  }
})

export default commonStyles
