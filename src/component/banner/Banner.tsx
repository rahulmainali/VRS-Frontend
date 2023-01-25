import React from 'react'
import './Banner.css'
//test the ssh
let bikes = require('../../images/bikes.jpg');
let bike = require('../../images/bike.jpg');
let yellowBike = require('../../images/yellowBike.png');

function Banner() {

    return (
        <div>

            <div className="container-fluid ">
                <div className="row align-items-center"  >
                    <div className="bike-image"
                        style={{
                            backgroundImage: `url(${bikes})`,
                            maxWidth: '100%',
                            height: '100vh',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                            backgroundPosition: 'top',

                        }}     >

                    </div>
                    <div className='banner-text1'>
                        <h1>Find Your Drive</h1>
                        <h5>Explore the world's largest vehicle sharing marketplace</h5>
                    </div>

                </div>

            </div>

        </div>
    )
}

export default Banner
