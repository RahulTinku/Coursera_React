import Menu from './MenuComponent';
import { DISHES } from '../shared/Dishes';
import { Component } from 'react';
import DishDetail from './DishDetailsComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({
      selectedDishId: dishId,
    });
  }
  render() {
    return (
      <div>
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        <DishDetail
          dish={
            this.state.dishes.filter(
              (item) => item.id === this.state.selectedDishId
            )[0]
          }
        />
        <Footer />
      </div>
    );
  }
}

export default Main;
