import React from "react";

export const Notification = ({ msg }) => {
  if (msg === null) {
    return null;
  }

  return <div className="error">{msg}</div>;
};
