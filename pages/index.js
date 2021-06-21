import ThreeColumnSection from '../components/ThreeColumnSection';
import Footer from '../components/Footer';
import Promo from '../components/Promo';
import ScrollButton from '../components/ButtonUp';
// import ButtonUp from '../components/ButtonUp;'

const content_sheep = "We provide our customers with products crafted with love to farming traditions, but keep our prices low. Find out how is that possible!"
const content_cheese = "We are professionals. See for yourself by reading the section about us."

const href_sheep = "/catalog"
const href_cheese = "/about"
const Index = () => (
  <div>
    {/* <ButtonUp/> */}
    <Promo
      img="static/img/cheese.png"
      title="Say cheese, say gouda!"
      content={content_cheese}
      href= {href_cheese}
      action="About us"
      sizing="cover"
    />
    <ThreeColumnSection />
    <Promo 
      img="static/img/sheep.png" 
      title="HANDCRAFTED QUALITY AT SCALE" 
      content={content_sheep}
      href={href_sheep}
      action="CheeseFarm" />
    <ScrollButton/>
    <Footer />
  </div>
);

export default Index;
