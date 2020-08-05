import React, { Component } from "react";
import { Button } from "semantic-ui-react";

export default class ScrollToTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      is_visible: false,
    };
  }

  componentDidMount() {
    document.addEventListener("scroll", this.toggleVisibility);
  }

  componentWillUnmount() {
    document.removeEventListener("scroll", this.toggleVisibility);
  }

  toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      this.setState({
        is_visible: true,
      });
    } else {
      this.setState({
        is_visible: false,
      });
    }
  };

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  render() {
    const { is_visible } = this.state;
    return (
      <div className="scroll-to-top">
        {is_visible && <Button icon="arrow up" onClick={this.scrollToTop} />}
      </div>
    );
  }
}
