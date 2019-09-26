/* eslint-disable jsx-a11y/heading-has-content */
import React from 'react'
import styled, {css} from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../../../../style/theme'

const CustomTypography = (props) => {
  const switchTag = (variant, rest) => {
    switch (variant) {
      case 'div':
        return <div {...rest} />
      case 'span':
        return <span {...rest} />
      case 'p':
        return <p {...rest} />
      case 'h1':
        return <h1 {...rest} />
      case 'h2':
        return <h2 {...rest} />
      case 'h3':
        return <h3 {...rest} />
      case 'h4':
        return <h4 {...rest} />
      case 'h5':
        return <h5 {...rest} />
      case 'h6':
        return <h6 {...rest} />
      default:
        return null
    }
  }
  const { variant, ...rest } = props
  return switchTag(variant, rest)
}

const Typography = styled(CustomTypography)`
  color: ${props => props.color};
  ${props => props.display &&
    css`display: ${props.display}`
  }
  ${props => props.size &&
    css`font-size: ${props.size}`
  }
  ${props => props.weight &&
    css`font-weight: ${props.weight}`
  }
  `

Typography.propTypes = {
  variant: PropTypes.oneOf([
    'div',
    'span',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'p'
  ]),
  color: PropTypes.string,
  size: PropTypes.string,
  weight: PropTypes.string,
  display: PropTypes.string,
}

Typography.defaultProps = {
  variant: 'div',
  color: theme.black,
}

export default Typography
