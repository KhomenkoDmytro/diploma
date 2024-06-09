import React from 'react';
import style from './StyledHeading.module.scss';

const StyledHeading = ({ text }) => {
  return (
    <h2 className={style.heading}>{text}</h2>
  );
};

export default StyledHeading;
