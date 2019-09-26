import theme from "../../../../style/theme";

export default {
  border: "1px solid",
  sm: {
    padding: "0.65rem 1.3rem",
    fontSize: "1.17rem",
    borderRadius: "0.325rem"
  },
  md: {
    padding: "0.975rem 1.6rem",
    fontSize: "1.3rem",
    borderRadius: "0.325rem"
  },
  lg: {
    padding: "1.3rem 3.25rem",
    fontSize: "1.56rem",
    borderRadius: "0.325rem"
  },
  color: color => {
    switch (color) {
      case "primary":
        return theme.primary;
      case "secondary":
        return theme.white;
      case "success":
        return theme.success;
      case "info":
        return theme.info;
      case "warning":
        return theme.warning;
      case "danger":
        return theme.danger;
      case "brand":
        return theme.brand;
      default:
        return theme.brand;
    }
  }
};
