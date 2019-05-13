import PropTypes from "prop-types";

const Notification = props => (
  <div
    style={{
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
