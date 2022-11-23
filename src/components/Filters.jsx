import Button from "./Button";
import styles from "./css-modules/filters.module.css";
export default function Filters() {
  return (
    <div className={styles.container}>
      <Button text={"All"} />
      <Button text={"Frederiksberg"} />
      <Button text={"Copenhagen K"} />
      <Button text={"Vanlose"} />
    </div>
  );
}
