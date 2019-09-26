import {css} from 'styled-components';
import style from './style';

const getHeightBySize = props => {
	switch (props.size) {
		case "small":
			return "24px";
		case "large":
			return "40px";
		default:
			return "32px";
	}
};

const getBorderByState = props => {
	if (props.hasError) return style.borderError;
	return style.borderDefault;
};

const getHighlightBorderByState = props => {
	if (props.hasError) return style.borderError;
	return style.borderFocus;
};

export default css`
  .react-select__control {
    line-height: 1.5;
    min-width: ${props => `${props.minWidth}px`};
    min-height: 0;
    border: ${props => getBorderByState(props)};
    border-radius: 3px;
  }

  .react-select__control--is-disabled {
    background: ${style.colorInputBgDisabled};
  }

  .react-select__control:hover {
    border: ${props => getHighlightBorderByState(props)};
  }

  .react-select__control:focus {
    border: ${props => getHighlightBorderByState(props)};
  }

  .react-select__control--is-focused {
    border: ${props => getHighlightBorderByState(props)};
    box-shadow: none;
  }

  .react-select__value-container {
    padding: 0 9px;
  }

  .react-select__value-container:hover {
    border: none;
  }

  .react-select__value-container:focus {
    border: none;
  }

  .react-select__dropdown-indicator {
    padding: 0;
    margin-right: 8px;
  }

  .react-select__placeholder {
    color: ${style.colorPlaceholder};
    height: ${props => getHeightBySize(props)};
    line-height: ${props => getHeightBySize(props)};
  }

  .react-select__value-container {
    height: ${props => getHeightBySize(props)};
  }

  .react-select__multi-value {
    line-height: 1.5;
    background-color: #f4f5f8;
  }

  .react-select__multi-value__remove:hover {
    cursor: pointer;
    background-color: #f4f5f8;
    color: black;
  }

  .react-select__single-value {
    font-weight: 400;
    line-height: ${props => getHeightBySize(props)};
    color: ${props =>
	props.isDisabled ? style.colorInputTextDisabled : style.colorInputText};
  }

  .react-select__indicator-separator {
    display: none;
  }

  .react-select__option {
    padding-top: 0;
    padding-bottom: 0;
    line-height: 40px;
    cursor: pointer;
    transition: background-color 0.2s;
    font-weight: 400;
  }

  .react-select__option--is-focused {
    background: ${style.colorMenuItemHover};
  }

  .react-select__option--is-selected {
    background: ${style.colorMenuItemSelected};
    color: #575962;
    font-weight: 700;
  }

  .react-select__menu {
    border-radius: 3px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  }
`;
