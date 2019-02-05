import React, {Component} from 'react';
import PropTypes from 'prop-types';

class Swipe extends Component{
  state = {
    swipeXStart: null,
    swipeXMove: null,
    swipeYStart: null,
    swipeYMove: null,
  };

  handleSwipeStart = (e) => {
    this.setState({
      swipeXStart : e.touches[0].clientX,
      swipeYStart : e.touches[0].clientY,
    });
  };

  handleSwipeMove = (e) => {
    this.setState({
      swipeXMove : e.touches[0].clientX,
      swipeYMove : e.touches[0].clientY,
    });
  };

  handleSwipeEnd = () => {
    const startX = this.state.swipeXStart;
    const endX = this.state.swipeXMove;
    const diffX = startX - endX;
    const startY = this.state.swipeYStart;
    const endY = this.state.swipeYMove;
    const diffY = startY - endY;

    this.setState({
      swipeXStart : null,
      swipeXMove: null,
      swipeYStart : null,
      swipeYMove: null,
    });

    if(Math.abs(diffX) > Math.abs(diffY)) {
      if(diffX > 0) {
        this.onLeft();
      }

      if(diffX < 0) {
        this.onRight();
      }
    } else {
      if(diffY > 0) {
        this.onUp()
      }

      if(diffY < 0) {
        this.onDown();
      }
    }
  };

  onLeft() {
    this.props.onLeft && this.props.onLeft()
  }

  onRight() {
    this.props.onRight && this.props.onRight();
  }

  onUp() {
    this.props.onUp && this.props.onUp();
  }

  onDown() {
    this.props.onDown && this.props.onDown();
  }

  render() {
    return (
      <div
        onTouchStart={this.handleSwipeStart}
        onTouchMove={this.handleSwipeMove}
        onTouchEnd={this.handleSwipeEnd}
      >
        {this.props.children}
      </div>
    );
  }
}

Swipe.propTypes = {
  onLeft: PropTypes.func,
  onRight: PropTypes.func,
  onUp: PropTypes.func,
  onDown: PropTypes.func,
};

export default Swipe;