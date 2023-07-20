import React from 'react';

import {MdLocationPin} from 'react-icons/md'
import {BiRupee} from 'react-icons/bi'

const CardFooter = ({ location, price, category, seat }: any) => {
  return (
    <div className="card-footer text-right items-center flex justify-between App-icons !important">

      <div className="card-footer-item flex items-center">
        <MdLocationPin className = 'App-icons' />
        <span>{location}</span>
      </div>
 
      <div className="card-footer-item flex items-center">
        <BiRupee />
        <span>{price + '/day'}</span>
      </div>     
    </div>
  );
};

export default CardFooter;

