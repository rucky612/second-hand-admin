import theme from "../../../../style/theme";

export default {
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
