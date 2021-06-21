import styled from "styled-components";
import Footer from "../components/Footer";
import ScrollButton from '../components/ButtonUp';
const TermsStyled = styled.div`
.headingTwo{
  position:relative;
  text-align:center;
  text-transform: uppercase;
  margin: 1.5em 0em;
  line-height:2em;
}
.headingFour{
  text-transform:uppercase;
  padding:0rem 1em;
  margin:2rem 0;
  &__text{
    margin:1rem 0;
    padding:0rem 2rem;
    text-indent:30px;
    text-align:justify;
    font-size:20px;
    line-height:2rem;
  }
}
@media (min-width: ${props => props.theme.desktopWidth}) {
.headingTwo{
  letter-spacing: .5em;
  border: 4px double rgba(255,255,255,.25);
  border-width: 4px 0;
}
}
`;
const Terms = props => (
  <TermsStyled>
    <h2 className="headingTwo">Gouda Cheese Experience terms of use</h2>
    <p className="headingFour__text">Welcome to the "Gouda Cheese Experience" site, a web resource that helps you </p>
    
    <h4 className="headingFour">PURCHASING ITEMS</h4>
    <p className="headingFour__text">Registering and logging in. Buyers are obliged to purchase items in accordance with the below listed procedures as well as the terms and conditions of payment.
    Registration in online store system is a pre-condition for purchase of items. In order to register in the online store system, buyers are required to enter www.goudacheese-experience.com website and choose REGISTER providing e-mail address and chosen password.
    MY ACCOUNT bookmark offers full and unlimited access to buyer’s personal data.</p>

    <h4 className="headingFour">ORDERING</h4>
    <p className="headingFour__text">Buyers are enabled to order 24 hours a day.When ordering, buyers shall specify the product (ADD TO CART), ordered amount, billing address and delivery address if different.
    Purchase process is being finalised after PURCHASE has been confirmed, which stands for entering into legal contract between buyer and seller.Orders not paid for within 3 working days shall be cancelled without prior notice.</p>

    <h4 className="headingFour">ITEMS</h4>
    <p className="headingFour__text">Items prices provided on www.gouda.space</p>

    <h4 className="headingFour">PRIVACY.Personal data</h4>
    <p className="headingFour__text">Customers consent to processing of their personal data by Gouda Cheese Experience for the sole purpose of executing items/s sale contract.Customers certify that provided data are his/her own data.</p>

    <h4 className="headingFour">newsletters</h4>
    <p className="headingFour__text">We send newsletters, e-mails and other electronic notifications for advertising purposes and to announce news (hereinafter “newsletter”) only with your consent, which is recorded during registration, or where there is a legal basis to do so.</p>


    <Footer/>
    <ScrollButton/>
  </TermsStyled>
);

export default Terms;
