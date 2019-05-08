import PropTypes from "prop-types";

const Notification = props => (
  <div
    style={{
      marginTop: "-88px",
      backgroundColor: "black",
      color: "white",
      padding: "16px"
    }}
  >
    {props.children}
  </div>
);

Notification.propTypes = {
  message: PropTypes.string,
  children: PropTypes.any
};

export default Notification;
