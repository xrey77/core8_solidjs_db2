// src/components/MyComponent.tsx
import {  type Component } from 'solid-js';
import '../pages/disableGoback.js';

const Contactus: Component = (props) => {


  return (
    <div class="container">
      <div class="card mb-3">
        <img src="/images/Adidas2016.jpg" class="card-img-top adidas" alt="..."/>
        <div class="card-body">
          <h3 class="card-title">Contact Us</h3>
          <p class="card-text">
            Our Headquarters is located in	Herzogenaurach, Bavaria, Germany, our website is <a href="https://www.adidas.de/">https://www.adidas.de/</a>
            </p>
          <h6>SPORTS CLOTHING, STYLES & INNOVATIONS OF ADIDAS SEIT 1949</h6>
          <p class="card-text txt-justify">
          However, the offer is not limited to sportswear. Immerse yourself in current trends of fashion and lifestyle, let yourself be inspired by personalities from the scene and find products that you can use to express your individuality. From sportswear to sneakers, each of our articles focuses on performance, durability and attention to detail. adidas works with the best in the industry to ensure that every product fits your sport, your personality and an active lifestyle. No matter which sport and which level – our sportswear and shoes support you at every step of the way to your best I.            
          </p>
        </div>
      </div>      
    </div>
  );
};

export default Contactus;