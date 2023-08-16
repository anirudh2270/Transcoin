import { useLocation } from 'react-router-dom';
import Transitions from '../Components/Motion.jsx';
import React from 'react';

export default function Account_security() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const aramValue = queryParams.get('sdsd');
  console.log(
    '🚀 ~ file: Account_security.jsx:9 ~ Account_security ~ aramValue:',
    aramValue
  );
  return <Transitions>Account_security</Transitions>;
}
