import styled from "styled-components";
import PropTypes from 'prop-types'

function Pendu({ className, pourcentage }) {

  return <img className={className} alt="image_du_pendu" src={`/75px-Hangman-${pourcentage}.png`}/>;
}

const StyledPendu = styled(Pendu)`
  width : 20vw;
`;

Pendu.defaultProps = {
  className: "",
  pourcentage: 0,
}

Pendu.propTypes = {
  className: PropTypes.string.isRequired,
  pourcentage: PropTypes.number.isRequired,
}

export default StyledPendu;
