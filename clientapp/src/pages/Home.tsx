// src/components/MyComponent.tsx
import type { Component } from 'solid-js';

const Home: Component = (props) => {
  return (
<div class="container-fluid">
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
        <h1 class="emboss-h">First slide label</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w2.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h">Second slide label</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w3.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h">Third slide label</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w4.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h">Fourth slide label</h1>
        <p></p>
      </div>
    </div>
    <div class="carousel-item">
      <img src="/images/w5.png" class="d-block w-100" alt="..."/>
      <div class="carousel-caption d-none d-md-block">
        <h1 class="emboss-h">Fifth slide label</h1>
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
</div>
    );
};

export default Home;