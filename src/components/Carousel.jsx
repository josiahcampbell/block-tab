import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { moreToScroll: true };

    this.scrollToStart = this.scrollToStart.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
  }

  scrollToStart() {
    this.carousel.scrollBy({ left: -this.carousel.clientWidth, behavior: 'smooth' });
    this.setState({ moreToScroll: true });
  }

  scrollToEnd() {
    this.carousel.scrollBy({ left: this.carousel.clientWidth, behavior: 'smooth' });
    this.setState({ moreToScroll: false });
  }

  render() {
    return (
      <div className="carousel__wrapper">
        <div className="carousel" ref={ (carousel) => { this.carousel = carousel; } }>
          { this.props.tabs.map((tab) =>
            <span
              key={ tab.id }
              onClick={ this.props.onTabClick(tab.id) }
              className={ classNames('carousel__tab', { 'carousel__tab--selected': tab.id === this.props.selectedTabId }) }>
              { tab.title }
            </span>
          ) }
        </div>
        <button
          className={ classNames('carousel__button', 'btn--left', { 'btn--more': !this.state.moreToScroll }) }
          onClick={ this.scrollToStart }>
          { '<-' }
        </button>
        <button
          className={ classNames('carousel__button', 'btn--right', { 'btn--more': this.state.moreToScroll }) }
          onClick={ this.scrollToEnd }>{ '->' }
        </button>
      </div>
    );
  }
}

export default Carousel;

Carousel.propTypes = {
  selectedTabId: PropTypes.string,
  onTabClick: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    media: PropTypes.string
  })).isRequired
};