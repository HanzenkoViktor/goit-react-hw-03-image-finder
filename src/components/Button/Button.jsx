import PropTypes from 'prop-types';
import { BtnLoad } from './Button.styled';

const Button = ({ onClick }) => {
  return <BtnLoad onClick={() => onClick()}>Load More</BtnLoad>;
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
