import styled from "styled-components";
import PropTypes from 'prop-types'


function HiddenWord({ className, display }) {
  return <h1 className={className}>{display}</h1>;
}

const StyledHiddenWord = styled(HiddenWord)`
  color: #654062;
  font-size : 5rem;
  letter-spacing: 2rem;
  border: 2px solid #654062;
  border-radius: 10px;
`;

HiddenWord.defaultProps = {
  className: "",
  display: "No word",
}

HiddenWord.propTypes = {
  className: PropTypes.string.isRequired,
  display: PropTypes.string.isRequired,
}

export default StyledHiddenWord;
