import theme from "../../../../style/theme";

export default {
  border: "1px solid",
  padding: "1.15rem 1.95rem",
  color: color => {
    switch (color) {
      case "primary":
        return theme.primary;
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
        return theme.white;
    }
  }
};
