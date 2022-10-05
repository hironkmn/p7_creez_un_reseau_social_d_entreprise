import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import './Burger.css';
import logo from '../../assets/icon-left-font.png'

export default props => {
  return (
    <Menu>
      <a className='menu-item' href='/'></a>
        <img src={logo} id='logo'/>
      </a>
      <a className="menu-item" href="/">
        Fil d'actualité
      </a>
      <a className="menu-item" href="/salads">
        Mes posts
      </a>
    </Menu>
  );
};