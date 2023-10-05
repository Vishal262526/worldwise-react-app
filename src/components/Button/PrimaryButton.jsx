import PropTypes from 'prop-types';

const PrimaryButton = ({title, onClick}) => {
  return (
    <button onClick={onClick} className="cta">
      {title}
    </button>
  )
}

PrimaryButton.propTypes = {
    title: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
     
};

export default PrimaryButton
