import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      /** React Fragmnet:- to enclose react element, add react element directly in the DOM */
      <>
        <Navbar dark>
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <div className="container-fluid bg-light text-dark p-5 jumbotron">
          <div className="container bg-light p-5">
            <div className="row row-header">
              <div className="col-12 col-sm-6">
                <h1 className="display-4 fw-bold">Ristorante con Fusion</h1>
                <p>
                  We take inspiration from the World's best cuisines, and create
                  a unique fusion experience. Our lipsmacking creations will
                  tickle your culinary senses!
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Header;
