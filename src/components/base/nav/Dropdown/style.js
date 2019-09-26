import theme from "../../../../style/theme";

export default {
  placement: (placement, arrowable) => {
    const pixel = arrowable ? "14px" : "0";
    switch ((placement)) {
      case "topLeft":
        return { bottom: pixel, left: "0" };
      case "topCenter":
        return {
          bottom: pixel,
          left: `50%`,
          transform: `translate3d(-50%, 0, 0)`
        };
      case "topRight":
        return { bottom: pixel, right: "0" };
      case "bottomLeft":
        return { top: pixel, left: "0" };
      case "bottomCenter":
        return {
          top: pixel,
          left: `50%`,
          transform: `translate3d(-50%, 0, 0)`
        };
      case "bottomRight":
        return { top: pixel, right: "0" };
      default:
        return { top: pixel, left: "0" };
    }
  },
  arrow: placement => {
    switch (placement) {
      case "topLeft":
        return { bottom: "-12px", left: "0" };
      case "topCenter":
        return {
          bottom: "-12px",
          left: `50%`,
          transform: `translate3d(-50%, 0, 0)`
        };
      case "topRight":
        return { bottom: "-12px", right: "0" };
      case "bottomLeft":
        return { top: "-12px", left: "0" };
      case "bottomCenter":
        return {
          top: "-12px",
          left: `50%`,
          transform: `translate3d(-50%, 0, 0)`
        };
      case "bottomRight":
        return { top: "-12px", right: "0" };
      default:
        return { top: "-12px", left: "0" };
    }
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
        return theme.white;
    }
  }
};
