import React from 'react';

import { PageHeader } from 'antd';

import './style.css';

export function Header() {
  return (
    <PageHeader className="header" title="Notes">
      <div className="header__search">Search...</div>
    </PageHeader>
  );
}
