import styled from 'styled-components';

const Breadcrumb = styled.div`
  padding: 10px 25px;
  border: 2px solid ${props => (props.active ? props.theme.mainColor : 'black')};
  background-color: ${props =>
    props.active ? props.theme.mainColor : 'white'};
  color: ${props => (props.active ? 'white' : 'black')};
  transform: skewX(-15deg);

  strong {
    display: block;
    transform: skewX(15deg);
  }
`;

export default ({ title, active }) => (
  <Breadcrumb active={active}>
    <strong>{title}</strong>
  </Breadcrumb>
);
