import PropTypes from "prop-types";
import styles from "./style.scss";

const Panel = ({ children, ...rest }) => (
  <div className={styles.panel} {...rest}>
    {children}
  </div>
);

export default Panel;

Panel.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  rest: PropTypes.object
};
