import React from "react";
import { connect } from "formik";

const headerHeight = 80;

class ErrorFocus extends React.Component {
  componentDidUpdate(prevProps) {
    const { isSubmitting, isValidating, errors } = prevProps.formik;
    const keys = Object.keys(errors);
    if (keys.length > 0 && isSubmitting && !isValidating) {
      const selector = `[id="${keys[0]}"]`;
      const errorElement = document.querySelector(selector);

      if (errorElement && errorElement.scrollIntoView) {
        errorElement.scrollIntoView(true);
        window.scrollBy(0, -headerHeight);
      }
    }
  }

  render() {
    return null;
  }
}

export default connect(ErrorFocus);
