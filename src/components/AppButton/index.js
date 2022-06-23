import classNames from "classnames";
import PropTypes from "prop-types";
import "./style.scss";

export const AppButton = ({ onClick, style, children }) => {
  const currentClass = classNames({ [style]: style });

  return (
    <div onClick={onClick} className={`app-btn ${currentClass}`}>
      {children}
    </div>
  );
};

AppButton.propTypes = {
  style: PropTypes.oneOf(["primary", "secondary", "tertiary", "outline"]),
};

AppButton.defaultProps = {
  style: "primary",
};
