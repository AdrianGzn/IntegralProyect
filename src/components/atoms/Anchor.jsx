import styled from "styled-components";
import { Link } from "react-router-dom";

const PStyled = styled.p`
    color: gray;
    &:hover{
        text-decoration: underline #8fff25;
    }
`;

const DivStyled = styled.div`
    text-decoration: none;
    margin: 10px;
    width: 10%;
    display: flex;
    justify-content: center;
`;

function Anchor(props) {
    return <DivStyled>
        <Link to={props.to}>
            <PStyled>{props.text}</PStyled>
        </Link>
    </DivStyled>
}

export default Anchor;