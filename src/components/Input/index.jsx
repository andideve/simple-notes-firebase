import { Form } from "react-bootstrap";
import styles from "./index.module.css";

function Input({ id, placeholder, value, onChange, key, ...otherProps }) {
  return (
    <Form.Group controlId={id} className={styles.form_group} key={key}>
      <Form.Label
        className={`${styles.form_label} ${
          !value.length && styles.as_placeholder
        }`}
        onClick={(e) => e.target.nextSibling.focus()}
      >
        {placeholder}
      </Form.Label>
      <Form.Control
        className={styles.form_control}
        value={value}
        onChange={onChange}
        {...otherProps}
      />
    </Form.Group>
  );
}

Input.defaultProps = {
  value: ""
};

export default Input;
