// src/components/MyComponent.tsx
import type { Component } from 'solid-js';

const Home: Component = (props) => {
  return (
<div class="container-fluid mb-3">
<div id="carouselExampleCaptions" class="carousel slide">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
  </div>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="/images/w1.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h mb-5">Adidas Taekwondo Mei Ballet Sneakers</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w2.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h mb-5">Top adidas Models Shoes</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w3.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h mb-5">2024 Best adidas Shoes</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w4.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h mb-5">Adidas Pro Model 2G Basketball Review</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w5.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h mb-5">Top 10 Best adidas Shoes</h1>
        <p></p>
      </div>
    </div>


  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div class="card mt-2">

  <div class="card-header text-center mt-2"><h5>Early years: the "Gebrüder Dassler Schuhfabrik"</h5></div>
  <div class="card-body">
  The company was started by <strong>Adolf Dassler</strong> in his mother's house. He was joined by his elder brother Rudolf in 1924 under the name Gebrüder Dassler Schuhfabrik ("Dassler Brothers Shoe Factory"). Dassler assisted in the development of spiked running shoes (spikes) for multiple athletic events. To enhance the quality of spiked athletic footwear, he transitioned from a previous model of heavy metal spikes to utilising canvas and rubber. Dassler persuaded U.S. sprinter Jesse Owens to use his handmade spikes at the 1936 Summer Olympics. In 1949, following a breakdown in the relationship between the brothers, Adolf created Adidas and Rudolf established Puma, which became Adidas's business rival.<br/><br/>
  The three stripes are Adidas's identity mark, having been used on the company's clothing and shoe designs as a marketing aid. The branding, which Adidas bought in 1952 from Finnish sports company Karhu Sports for the equivalent of €1,600 and two bottles of whiskey, became so successful that Dassler described Adidas as "The three stripes company".<br/><br/>
  In 1948, the first football match after World War II, several members of the West Germany national football team wore Puma boots, including the scorer of West Germany's first post-war goal, Herbert Burdenski. Four years later, at the 1952 Summer Olympics, 1500 metres runner Josy Barthel of Luxembourg won Puma's first Olympic gold in Helsinki, Finland.
  </div>
</div>



</div>
    );
};

export default Home;