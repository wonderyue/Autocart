import React, { Component } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Icon,
  Image,
  List,
  Menu,
  Responsive,
  Segment,
  Sidebar,
  Visibility
} from "semantic-ui-react";

const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

class ACHeader extends Component {
  state = {};
  render() {
    const { fixed } = true;
    return (
      <Responsive getWidth={getWidth} minWidth={Responsive.onlyTablet.minWidth}>
        <Visibility once={true}>
          <Segment
            inverted
            textAlign="center"
            style={{ margin: "0em 0em 2em 0em" }}
            vertical
          >
            <Menu inverted={true} pointing={true} secondary={true} size="large">
              <Container>
                <Menu.Item as="a" active>
                  Home
                </Menu.Item>
                <Menu.Item as="a">Cars</Menu.Item>
                <Menu.Item position="right">
                  <Button icon="shop" color="black" />
                  <Button
                    icon="user circle"
                    style={{ marginLeft: "0.5em" }}
                    color="black"
                  />
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>
        {/* {children} */}
      </Responsive>
    );
  }
}

export default ACHeader;
