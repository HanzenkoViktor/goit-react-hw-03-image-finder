import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Modal from 'components/Modal';
import { Img, Wrapper } from './ImageGalleryItem.styled';

class ImageGalleryItem extends Component {
  static propTypes = {
    item: PropTypes.shape({
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  };
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const {
      item: { webformatURL, tags, largeImageURL },
    } = this.props;
    const { showModal } = this.state;
    return (
      <>
        <Wrapper onClick={this.toggleModal}>
          <Img src={webformatURL} alt={tags} />
        </Wrapper>
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <img src={largeImageURL} alt="tag" />
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;
