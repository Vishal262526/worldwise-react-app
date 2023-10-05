import PropTypes from "prop-types";
import styles from './InputField.module.css'

const InputField = ({ type, label, value, onValueChange }) => {
  return (
    <div className={styles.input}>
      <label htmlFor={label}>label</label>
      <input
        onChange={(e) => onValueChange(e.target.value)}
        value={value}
        type={type}
        id={label}
      />
    </div>
  );
};

InputField.propTypes = {
  type: PropTypes.node.isRequired,
  label: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  onValueChange: PropTypes.func.isRequired,
};

export default InputField;
