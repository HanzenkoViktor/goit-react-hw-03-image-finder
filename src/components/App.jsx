import { Component } from 'react';
import { Container } from './App.styled';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

class App extends Component {
  state = {
    search: '',
    items: [],
    isLoading: false,
    error: null,
    bigImage: '',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchName !== this.state.searchName ||
      prevState.page !== this.state.page
    ) {
      this.setState({ isLoading: true });

      axios({
        url: `https://pixabay.com/api/?`,
        params: {
          q: this.state.searchName,
          page: this.state.page,
          key: '34372801-bdf4656b48ac6c16d1f8b32cb',
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: 12,
        },
      })
        .then(response => {
          return response.data.hits;
        })
        .then(data => {
          if (data.length > 0) {
            this.setState(prevState => ({
              items: [...prevState.items, ...data],
            }));
            return;
          }
          toast('По Вашему запросу ничего не найдено', { autoClose: 3000 });
        })
        .catch(({ message }) => {
          message = toast('Что-то пошло не так, попробуйте еще раз');
          this.setState({
            error: message,
          });
        })
        .finally(() => {
          this.setState({ isLoading: false });
        });
    }
  }

  searchImage = searchName => {
    this.setState({ searchName: searchName, page: 1, items: [] });
  };

  handleClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { items, isLoading } = this.state;
    const { searchImage, handleClick } = this;

    return (
      <Container>
        <Searchbar onSubmit={searchImage} />

        {items.length > 0 && <ImageGallery items={items} />}

        {isLoading && <Loader />}

        {items.length > 0 && items.length % 12 <= 0 && !isLoading && (
          <Button onClick={handleClick} />
        )}

        <ToastContainer />
      </Container>
    );
  }
}

export default App;
