import React from "react";
import { Input, Label } from "reactstrap";
import PropTypes from "prop-types";

import "./style.scss";

export const AppInputIcon = ({
  isPrefix,
  icon,
  placeholder,
  label,
  name,
  onChange,
}) => {
  return (
    <div className="input-icon">
      {Boolean(label) && <Label>{label}</Label>}
      <div className="position-relative">
        <div className={`input-icon__${isPrefix ? "prefix" : "suffix"}`}>
          {icon}
        </div>
        <Input placeholder={placeholder} name={name} onChange={onChange} />
      </div>
    </div>
  );
};

AppInputIcon.propTypes = {
  isPrefix: PropTypes.bool,
  icon: PropTypes.node,
  placeholder: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

AppInputIcon.defaultProps = {
  isPrefix: false,

  placeholder: "Filter ",
  label: "",
  name: "q",
  onChange: () => {},
};
