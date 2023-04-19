import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import smile from "./pictures/smile.jpeg";
import reserve from "./pictures/reserve.jpeg";
import direct from "./pictures/direct.jpeg";
import zenzo from "./pictures/zenzo.jpeg";
import thato from "./pictures/thato.jpeg";
import tshephang from "./pictures/tshephang.jpeg";
import { useNavigate } from "react-router-dom";



function Content (){
    
  const navigate = useNavigate()

  function seeGuestHouses(){
    navigate("/view-guesthouses");
  }

    return(
       
        <div>

<button className="go-to-guesthouses" onClick={seeGuestHouses} style={{position: "fixed", bottom: "0", right: "0"}}>see all guest houses</button>
      <section className="my-5" id="about">
        <div className="container">
        <div class="row">
              <div class="col-sm-12 col-md-12">
                 <h3 class="text-center mt-4 text-secondary">Features</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 mb-5">
              <div className="card mt-4">
                <img className="card-img-top" src={smile} alt="" />
                <div className="card-body">
                  <h4 className="card-title text-secondary">
                    Automate Guest Experience
                  </h4>
                  <p className="card-text text-secondary">
                    Booking confirmations, check-ins and checkouts make your
                    guest experience fast and digital.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="card mt-4">
                <img className="card-img-top" src={reserve} alt="" />
                <div className="card-body">
                  <h4 className="card-title text-secondary">More Reservations</h4>
                  <p className="card-text text-secondary">
                    Advertise your guesthouse with our website and manage its
                    bookings and reservations easily.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-5">
              <div className="card mt-4">
                <img className="card-img-top" src={direct} alt="" />
                <div className="card-body">
                  <h4 className="card-title text-secondary">
                    Increase Direct Bookings
                  </h4>
                  <p className="card-text text-secondary">
                    Acquire more direct bookings and increase occupancy and
                    automatically upsell your guest house.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="bg-light mt-5" id="owners">    
     <div class="container">
      <div class="row text-center">
        <div class="col-sm-12 col-md-12 mb-4">
            <h3 class="text-center mt-4 text-secondary">GuestHouse Owners' Opinions</h3>
         </div>
        <div class="col-md-4">
          <div class="testimonial mb-5">
           <div class="avatar mx-auto">
            <img src={zenzo} alt = "" class="rounded-circle z-depth-1 img-fluid"/>
          </div>
          <h4 class="font-weight-bold dark-grey-text mt-4">Zenzo Maeza</h4>
          <h6 class="font-weight-bold blue-text my-3">Owner Of PeaconWood Boutique Guest House </h6>
          <p class="font-weight-normal dark-grey-text">"Your website has really helped me streamline my guest house bookings. 
          I love the automated check-in and check-out features, and my guests appreciate the fast and digital experience."
           .</p>
        </div>
      </div>
 
      <div class="col-md-4">
        <div class="testimonial mb-5">
          <div class="avatar mx-auto">
            <img src={thato} alt="" class="rounded-circle z-depth-1 img-fluid"/>
          </div>
          <h4 class="font-weight-bold dark-grey-text mt-4"> Thato Sebape</h4>
          <h6 class="font-weight-bold blue-text my-3">Owner of Green Lagon Guest House</h6>
          <p class="font-weight-normal dark-grey-text">"I'm so glad I found your booking website! It's made managing my guest house so much easier, 
          and I've been able to increase my reservations and occupancy rates as a result."</p>
        </div>
 
      </div>
      <div class="col-md-4">
        <div class="testimonial mb-5">
          <div class="avatar mx-auto">
            <img src={tshephang} alt="" class="rounded-circle z-depth-1 img-fluid"/>
          </div>
          <h4 class="font-weight-bold dark-grey-text mt-4">Tshephang Sengakane</h4>
          <h6 class="font-weight-bold blue-text my-3">Owner of The Capital Guest House</h6>
          <p class="font-weight-normal dark-grey-text">I can't imagine running my guest house without your website now. It's so user-friendly and has
           all the features I need to manage my bookings and reservations with ease.".</p>
        </div>
        </div>
      </div>
    </div> 
   </section> 
    </div>
    );

}
export default Content;