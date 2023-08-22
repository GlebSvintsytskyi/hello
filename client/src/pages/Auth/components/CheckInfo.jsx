import React, { useState, useEffect } from 'react';
import { Result, Button } from 'antd';
import { verifyUser } from '../../../utills/api/user.js';


import './CheckInfo.scss';

const renderTextInfo = ( hash, verified ) => {
    if (hash) {
      if (verified) {
        return {
            status: 'success',
            message: 'Account successfully verified.'
        };
      } else {
        return {
            status: 'error',
            message: 'Error at verify account.'
        };
      }
    } else {
      return {
        status: 'info',
        message: 'An account verification link has been sent to your E-mail.'
      };
    }
  };

const CheckEmailInfo = ({ history, navigate }) => {
  
    const [verified, setVerified] = useState(false);
    const hash = history.location.search.split('hash=')[1];
    const info = renderTextInfo(hash, verified);

    useEffect(() => {
        if (hash) {
            verifyUser(hash).then( ( data ) => {
                if (data.status === 'success') {
                    setVerified(true);
                }
            } )
        }
    }, [hash])
    return (
        <Result
            className='result'
            status={info.status}
            title={info.message}
            extra={info.status === 'success' && <Button type='primary' onClick={() => navigate('/login')}>Log in</Button>}
        />
    )
        
};
export default CheckEmailInfo;