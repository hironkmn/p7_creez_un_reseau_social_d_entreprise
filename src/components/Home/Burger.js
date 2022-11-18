import React from 'react';
import { push as Menu } from 'react-burger-menu';
import './Burger.css';

function Burger(props){
  return (
    <Menu {...props}>
      <a className="menu-item">
        Fil d'actualité
      </a>
      <a className="menu-item">
        Mes posts
      </a>
    </Menu>
  );
};
export default Burger;