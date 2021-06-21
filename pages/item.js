import { Container, Row, Col } from 'react-bootstrap';
import SingleItem from '../components/SingleItem';
import Footer from '../components/Footer';

const Item = props => (
  <div>
  <Container>
    <Row className="justify-content-md-center">
      <Col>
        <SingleItem id={props.query.id} />
      </Col>
    </Row>
  </Container>
  <Footer/>
  </div>
);

export default Item;
