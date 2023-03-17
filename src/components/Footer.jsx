import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

 
 
function Footer(){
    return(
          <div className='container-fluid bg-dark'>
            <div className='row py-5 text-white'>
                <div className='col-md-3 col-sm-12'>
                <i class="fa-sharp fa-solid fa-phone"></i>
                    <p>+267 74563647</p>
                    <p>+267 74556790</p>
                    <p>+267 45676778</p>
                </div>
              <div className='col-md-3 col-sm-12'>
              <i class="fa-solid fa-envelope"></i>
                  <p>guestVista@gmail.com</p>
                </div>
                <div className='col-md-3 col-sm-12'>
                <i class="fa-brands fa-twitter" style={{color: " #1DA1F2"}}></i>
                    <p>@guestVista123</p>
                </div>
                <div className='col-md-3 col-sm-12'>
                <i class="fa-brands fa-facebook" style={{color: "  #1877F2"}} ></i>
                    <p>GuestVista Website</p>
                </div>
            </div>
            </div>


    )
}
 
export default Footer;