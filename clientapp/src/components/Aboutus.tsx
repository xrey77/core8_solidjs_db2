import { onMount, type Component } from 'solid-js';
import '../pages/disableGoback.js';

const Aboutus: Component = (props) => {

  onMount(() => {
    window.history.pushState(null, "", document.URL);
    window.onpopstate = function() {
        window.history.pushState(null, "", document.URL)
    }; 
});


  return (
<div class="container aboutus mb-4">
 <div class="card mb-3 mt-5">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="/images/adidas.jpg" class="img-fluid rounded-start" alt="..."/>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title text-primary">About Us</h5>
        <p class="card-text txt-justify">
          <strong>Adidas</strong> is a global sportswear and footwear corporation, headquartered in Germany, known for its signature three-stripe logo and athletic and lifestyle products. Founded in 1949 by Adolf "Adi" Dassler, after a split from his brother Rudolf, the company has become a leading sportswear manufacturer worldwide. Adidas designs and produces athletic footwear, apparel, accessories, and equipment and sells them globally through various channels, including its own retail stores, franchises, and e-commerce.  
          </p>
          <h5 class="card-title text-danger">Founder</h5>
          <p class="card-text txt-justify">
          <strong>Adolf "Adi" Dassler</strong>, who started making sports shoes in his mother's laundry room. Officially registered as "Adolf Dassler (adidas) Sportschuhfabrik" in 1949. The name Adidas comes from a combination of his nickname, "Adi," and the first three letters of his last name, "Dassler". 

          </p>

        <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>
 </div>    
 <h6 class="txt-justify">Sport keeps us fit – physically and mentally. Sport brings us together. Sport has the power to change lives. He writes inspiring stories, gives the impetus to technological innovations and sets us in motion.
Activewear and sportswear with the most modern technologies drives you to new peak performances and personalities. Our sports shops are the first stop for runners, basketball players, footballers and all those who are simply active. We support you with products that are tailored to your sport and get the most out of you. You'll always find the latest adidas collections in our online shop. Here Style meets innovation. We all accompany on their way to the best version of themselves. In our adidas sports shops there is sports equipment for every performance level – whether professional athlete, fitness fan or beginner. And in our online shop you have access to the latest collections around the clock.</h6>

</div>
  );
};

export default Aboutus;