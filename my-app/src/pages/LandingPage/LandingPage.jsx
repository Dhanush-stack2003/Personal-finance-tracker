import './LandingPage.css'
import insights from '../../Asserts/investigate.png'
import transaction_log from '../../Asserts/financial_report.png'
import report from '../../Asserts/analytics.png'
import protectdata from '../../Asserts/fixed.png'
import Signup from '../../Asserts/security.png'
import graph from '../../Asserts/market_share.png'
import user_1 from '../../Asserts/user_1.jpg'
import user_2 from '../../Asserts/user_2.jpg'
import user_3 from '../../Asserts/user_3.jpg'
import hero_img from '../../Asserts/hero2.jpg'
import { Link } from 'react-router-dom'
import { Swiper,SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/swiper-bundle.css";

function Home() {


  return (
    <div className="home_header">
      <div className="home">
        {/* hero section */}
        <section className="hero">
          <div className="hero_content">
            <h3>
              <strong>Take control of your </strong>
              <br />
              finance Tracks
            </h3>
            <p>
              Managing money has never been easier! Our Personal Finance Tracker
              lets you track income, expenses, and savings effortlessly.
              Categorize transactions, filter by date or payment method, and
              gain insights into your spending. Stay on top of your budget with
              our intuitive dashboard. Start making smarter financial decisions
              today!
            </p>
            <Link to="/sign-in">
              <button className="cta_button">Get Started for Free</button>
            </Link>
          </div>
          <div className="hero_img">
            <img src={hero_img} alt="" />
          </div>
        </section>

        {/* features */}
        <section className="features">
          <h2>key features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <img src={report} alt="" className="icons" />
              <h3>Track Income & Expenses</h3>
              <p>Easily log transactions with categories</p>
              <button>MORE</button>
            </div>
            <div className="feature-card">
              <img src={graph} alt="" className="icons" />
              <h3>Visual Insights</h3>
              <p>pie chart and graph for spending trends</p>
              <button>MORE</button>
            </div>
            <div className="feature-card">
              <img src={protectdata} alt="" className="icons" />
              <h3>Secure & Private</h3>
              <p>Encrypted protection for transactions</p>
              <button>MORE</button>
            </div>
          </div>
        </section>

        {/* how it works */}
        <section className="how-it-works">
          <h2>How it works</h2>
          <div className="steps">
            <div className="step">
              <h3>1.Sign up</h3>
              <p>Create a free account</p>
              <img src={Signup} alt="sign up" className="icons" />
            </div>
            <div className="step">
              <h3>2.Add transaction</h3>
              <p>log your income & expenses</p>
              <img src={insights} alt="insights" className="icons" />
            </div>
            <div className="step">
              <h3>3.Gain insights</h3>
              <p>View reports and make smart decision</p>
              <img src={transaction_log} alt="" className="icons" />
            </div>
          </div>
        </section>

        {/* testimonals */}
        <section className="testimonals">
          <h2>What Our User Says</h2>
          <div className="testimonal-cards">
        <Swiper 
        modules={[Navigation,Pagination,Autoplay]}
        slidesPerView={1}
        pagination={{clickable:true}}
        autoplay={{delay:5000,disableOnInteraction:false}}
        >
              <SwiperSlide>
                <div className="testimonal-card">
                  <img src={user_1} alt="" className="user_img" />
                  <div className="user_card">
                    <p>
                      "I've always struggled to track my expenses, but this
                      finance tracker made it so easy! The category filters and
                      date range selection help me analyze my spending patterns.
                      Now, I save more and spend smarter!"
                    </p>
                    <h3>- Alex F</h3>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="testimonal-card">
                <img src={user_3} alt="" className="user_img" />
                <div className="user_card">
                  <p>
                    "Adding transactions is quick, and the filter options help
                    me track where my money always goes. Highly recommend for
                    anyone looking to get better control of their finances!"
                  </p>
                  <h3> — Priya S</h3>
                </div>
              </div>
              </SwiperSlide>
              <SwiperSlide>
              <div className="testimonal-card">
                <img src={user_2} alt="" className="user_img" />
                <div className="user_card">
                  <p>
                    "I've tried multiple finance apps, but this one stands out.
                    The intuitive design and powerful filtering options make
                    managing my expenses effortless. A must-have for personal
                    finance management!"
                  </p>
                  <h3> — Rahul M</h3>
                </div>
              </div>
            </SwiperSlide>
        </Swiper>
            </div>
          </section>

        {/* call to action */}
        <section className="cta">
          <h3>Start tracking your expenses today</h3>
          <Link to="/sign-in">
            <button className="cta_button">Get Started for free</button>
          </Link>
        </section>
      </div>
    </div>
  );
}

export default Home