import React from 'react';
import { Link } from 'react-router-dom';

export const MaterialList = props => (
  <div>
    Material list
    <p>
      <Link to={`${props.basePath}/edit`}>edit</Link>
    </p>
    <p>
      <Link to={`${props.basePath}/create`}>create</Link>
    </p>
    <p>
      <Link to={`${props.basePath}/show`}>show</Link>
    </p>
  </div>
);
export const MaterialEdit = props => <div>Material edit</div>;
export const MaterialCreate = props => <div>Material create</div>;
export const MaterialShow = props => <div>Material show</div>;
