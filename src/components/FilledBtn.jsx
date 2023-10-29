import React from 'react';

export default function FilledBtn(props) {

  /*
    Required:
    - label
    - onClick
    Optioin:
    - id
  */
    const properties = {onClick:props.onClick,id:props.id,}

  return (
    <button className="FilledBtn" {...properties}>
      <span className="FilledBtn-Text">{props.label}</span>
      <div className="FilledBtn-Hover"></div>
    </button>
  );
}
