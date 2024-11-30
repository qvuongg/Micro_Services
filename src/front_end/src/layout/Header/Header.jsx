import React from 'react';
import { Input, Avatar } from 'antd';
import CryptoPrices from '../../components/Test/CryptoPrices';
import './header.css'

const Header = () => (
  <>
    <div className="header">
      <h1>Dashboard</h1>
      <div className="search-profile">
        <Input.Search placeholder="Search here..." style={{ width: 200 }} />
        <Avatar className='avatar' src="data:image/png;base64,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" />
      </div>
    </div>
    <div className="price-coin">
      <CryptoPrices />
    </div>
  </>
);

export default Header;
