import React, {Component} from 'react';
import Paper from 'material-ui/Paper';
import {Grid, Col, Row} from 'react-flexbox-grid';
import Header from './Header';

export default (NestedComponent, props={}) => class LayoutComponent extends Component {
  render() {
    const extendedProps = {...this.props, ...props};

    return (
      <div>
        <Header  />
        <div className='main-content'>
          <Paper className='main-content__page' elevation={4}>
            <Grid fluid>
              <Row middle='xs'>
                <Col xs>
                  <NestedComponent {...extendedProps} />
                </Col>
              </Row>
            </Grid>
          </Paper>
        </div>
      </div>
    );
  }
}
