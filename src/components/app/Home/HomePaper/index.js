import React from "react";
import PropTypes from "prop-types";
import Paper from "../../../base/data-display/Paper";
import FormItem from "../../../base/data-entry/FormItem";

const HomePaper = ({ formItemLayout, mockString }) => (
  <Paper paperTitle={mockString.title}>
    <form>
      {mockString.formItems.map(item => (
        <FormItem label={item.label} key={item.label} {...formItemLayout}>
          {item.content}
        </FormItem>
        ))}
    </form>
  </Paper>
  );

const GridLayout = {
  span: PropTypes.number,
  offset: PropTypes.number
};

HomePaper.propTypes = {
  formItemLayout: PropTypes.shape({
    labelCol: PropTypes.shape(GridLayout),
    wrapperCol: PropTypes.shape(GridLayout)
  }).isRequired,
  mockString: PropTypes.shape({
    title: PropTypes.string,
    formItems: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        content: PropTypes.string
      })
    )
  }).isRequired
};

export default HomePaper;
