import React, { useState, useEffect } from 'react';
function Error({ message, visibleTime }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    let time = setTimeout(() => {
      setVisible(false);
    }, visibleTime);
    return () => {
      clearTimeout(time);
    };
  });
  return <p className="error">{visible ? message : ''}</p>;
}
export default Error;
