import React from 'react';
import { Alert } from 'antd';

const ErrorIndicator = ({ description }) => {
  const className = {
    marginTop: '36px',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '470px',
  };
  return <Alert message="Error" description={description} type="error" style={className} showIcon />;
};
export default ErrorIndicator;
