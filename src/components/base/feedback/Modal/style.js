export default {
  headerPadding :"0 2.86rem",
  padding: "2.86rem",
  titleFontSize: "1.69rem",
  closeHeight: "67px",
  headerHeight: "6.63rem",
  footerHeight: 67,
  size: (str) => {
    switch (str) {
      case "small":
        return "500px"
      case "default":
        return "800px"
      case "large":
        return "1100px"
      default:
        return "500px"
    }
  }
}