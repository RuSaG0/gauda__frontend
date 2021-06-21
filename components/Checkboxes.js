// import {Container, Row, Col} from 'react-bootstrap';
import StyledCheckboxes from './styled/StyledCheckboxes.js';

class Checkboxes extends  React.Component{
  state = {
    isOpen: true
    }
    render(){
      return (
      <StyledCheckboxes>
            <div className="containerOuter">
                <div className="containerOuter__checkBoxContainer">
                  <input
                    className="inputCheckGoods hidden"
                    type="checkbox"
                    id="checkCheese"
                  />
                  <label className="labelCheckGoods" htmlFor="checkCheese">
                    <div className="square" />
                    <div className="entry-label">
                      Cheese
                    </div>
                  </label>
                  <input
                    className="inputCheckGoods hidden"
                    type="checkbox"
                    id="checkWine"
                  />
                  <label className="labelCheckGoods" htmlFor="checkWine">
                    <div className="square" />
                    <div className="entry-label">
                      Wine
                    </div>
                  </label>
                  <input
                    className="inputCheckGoods hidden"
                    type="checkbox"
                    id="checkButter"
                  />
                  <label className="labelCheckGoods" htmlFor="checkButter">
                    <div className="square" />
                    <div className="entry-label" id="goodButter">
                      Butter
                    </div>
                  </label>
                </div>
            </div>
          </StyledCheckboxes>
    );
  }
}
export default Checkboxes;
