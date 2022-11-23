import styles from "./css-modules/button.module.css";

function Button({ text, ...buttonProps }) {
  return (
    <button className={styles.btn} {...buttonProps}>
      {text}
    </button>
  );
}

export default Button;
