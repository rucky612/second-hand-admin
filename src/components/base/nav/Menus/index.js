/* eslint-disable react/require-default-props */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Menu } from "antd"

const CustomMenus = styled(Menu)`
  &&&& {
    padding: 3px 0;
    border-right: 0;
  }
`

const Menus = (props) => {
    const {...other} = props
    return (
      <CustomMenus
        {...other}
      />
    )
}

Menus.propTypes = {
  defaultSelectedKeys: PropTypes.arrayOf(PropTypes.string),
  forceSubMenuRender: PropTypes.bool,
  inlineCollapsed: PropTypes.func,
  inlineIndent: PropTypes.number,
  mode: PropTypes.oneOf(['vertical', 'horizontal', 'inline']),
  multiple: PropTypes.bool,
  selectable: PropTypes.bool,
  selectedKeys: PropTypes.arrayOf(PropTypes.string),
  onClick: PropTypes.func,
  onItemHover: PropTypes.func,
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
  onOpenChange: PropTypes.func,
}

Menus.defaultProps = {
  forceSubMenuRender: false,
  inlineIndent: 24,
  mode: 'vertical',
  multiple: false,
  selectable: true,
  onOpenChange: () => {}
}

export default Menus