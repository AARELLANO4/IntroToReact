
import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Grid, Row, Col } from 'react-bootstrap';
import { Link, Switch, Redirect, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import NotFound from'./NotFound';
import Sale from'./Sale';
import Sales from'./Sales';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recentlyViewed: [],
      searchId: ""
    }

    this.viewedSale = this.viewedSale.bind(this);
    this.updateSearchId = this.updateSearchId.bind(this);
  };

  viewedSale(id){
    this.setState((state,props)=>{
      if (state.recentlyViewed.indexOf(id) === -1) {
        state.recentlyViewed.push(id);
      }
      return {
        recentlyViewed: state.recentlyViewed
      };
    });
  };

  updateSearchId(e) {
    this.setState({searchID: e.target.value})
  };
  
  render() {
    return(
      <div>
      <Navbar inverse collapseOnSelect staticTop>
          <Navbar.Header>
              <LinkContainer to="/">
                <Navbar.Brand>
                  WEB422 -Sales
                </Navbar.Brand>
              </LinkContainer>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                <LinkContainer to="/Sales">
                  <NavItem>All Sales</NavItem>
                </LinkContainer>
                <NavDropdown title="Previously Viewed" id="basic-nav-dropdown">
                  {this.state.recentlyViewed.length > 0 ? 
                    this.state.recentlyViewed.map((id, index)=>( 
                      <LinkContainer to={`/Sale/${id}`} key={index}>
                        <MenuItem >Sale: {id}</MenuItem>
                      </LinkContainer> )) : 
                      <MenuItem>...</MenuItem>}
                </NavDropdown>
              </Nav>
              <Navbar.Form pullRight>
                <FormGroup>
                  <FormControl type="text" onChange={this.state.updateSearchId} placeholder="Sale ID" />
                </FormGroup>{' '}
                <Link className="btn btn-default" to={"/Sale/" + this.state.searchId}>Search</Link>
              </Navbar.Form>
            </Navbar.Collapse>
        </Navbar>

        <Grid>
          <Row>
            <Col md={12}>
              <Switch>

                <Route exact path='/' render={() => (
                  <Redirect push to={"/Sales"} />
                )}/>

                <Route exact path='/Sales' render={(props) => (
                  <Sales/>
                )}/>

                <Route exact path='/Sale/:id' render={(props) => (
                  <Sale id={props.match.params.id} viewedSale={this.viewedSale} />
                )}/>

                <Route render={()=>(
                  <NotFound/>
                )}/>
              </Switch>
            </Col>
          </Row>
        </Grid>
      </div>

    )}

}
export default App;
