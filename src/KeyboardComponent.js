import { Col, Row} from "react-bootstrap";
import styled from "styled-components";
import PropTypes from 'prop-types'

const StyledCol = styled(Col)`
background: ${(props) => (props.active ? "#ffd66b" : "#ff9d72")};
margin: 0.1rem;
border-radius: 10px;
`;

function KeyboardComponent({ className, alphabet, usedLetters,clickHandler }) {

  const alphabetArray = [...alphabet];
  return (
    <Row className={className} bordered>
      
        
          {alphabetArray.map((element, id) => (
            <StyledCol
              key={id}
              active={!usedLetters.has(element)}
              className="px-3 py-3"
              onClick={()=>{clickHandler(element)}}
            >
              {element}
            </StyledCol>
          ))}
  
    </Row>
  );
}

KeyboardComponent.defaultProps = {
  className: "",
  alphabet: new Set(),
  usedLetters: new Set(),
  clickHandler: ()=>{ console.log("no click handle !")},
}

KeyboardComponent.propTypes = {
  className: PropTypes.string.isRequired,
  alphabet: PropTypes.instanceOf(Set).isRequired,
  usedLetters: PropTypes.instanceOf(Set).isRequired,
  clickHandler: PropTypes.func.isRequired,
}



const StyledKeyboardComponent = styled(KeyboardComponent)`
  color: black;
  margin: 1rem;

`;




export default StyledKeyboardComponent;
