import React from "react";
import { Card } from "semantic-ui-react/";

class ACDraggableCard extends React.Component {
  onDragStart = (ev, i) => {
    ev.dataTransfer.setData("index", i);
  };

  onDragOver = (ev) => {
    ev.preventDefault();
  };

  onDrop = (ev, a) => {
    let b = ev.dataTransfer.getData("index");
    this.props.action(parseInt(a, 10), parseInt(b, 10));
  };

  render() {
    const { i } = this.props;
    return (
      <Card
        draggable
        className="draggable"
        onDragStart={(e) => this.onDragStart(e, i)}
        onDragOver={(e) => this.onDragOver(e)}
        onDrop={(e) => {
          this.onDrop(e, i);
        }}
      >
        {this.props.children}
      </Card>
    );
  }
}

export default ACDraggableCard;
