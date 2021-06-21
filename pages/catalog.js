import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import LeftColumn from '../components/LeftColumnCatalog';
import Items from '../components/Items';
import Footer from '../components/Footer';
import ButtonUp from '../components/ButtonUp'
import Search from '../components/Search';

const StyledHeading = styled.div`
  padding: 20px;
  background-color: #124433;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.27'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  margin-bottom: 20px;

  .inner {
    width: 280px;
    margin: 0 auto;
    text-align: center;
    background-color: white;
    padding: 15px;
    h1 {
      font-size: 28px;
    }

    p {
      font-size: 15px;
    }
  }

  @media (min-width: ${({ theme }) => theme.tabletWidth}) {
    height: 30vh;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 40px;

    .inner {
      width: 570px;

      h1 {
        font-size: 34px;
      }

      p {
        text-align: left;
      }
    }
  }

  @media (min-width: ${({ theme }) => theme.desktopWidth}) {
    height: 40vh;
    padding: 45px;
    margin-bottom: 60px;

    .inner {
      width: 950px;

      h1 {
        font-size: 38px;
      }
    }
  }
`;

const Catalog = () => (
  <main>
    {/* Buy Section */}
    <StyledHeading>
      <div className="inner">
        <h1>Cheese Farm</h1>
      </div>
    </StyledHeading>
    <Items />
    <Footer />
    <ButtonUp/>
  </main>
);

export default Catalog;
