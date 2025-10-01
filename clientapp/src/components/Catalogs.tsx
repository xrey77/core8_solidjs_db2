import { createSignal, type Component, For, onMount, Show } from 'solid-js';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7101",
    headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const Catalogs: Component = (props) => {
  let [page, setPage] = createSignal(1);
  let [totpage, setTotpage] = createSignal(0);
  const [message, setMessage] = createSignal('');
  const [prods, setProds] = createSignal([]);
  const [isfound, setIsfound] = createSignal(false);

  const fetchProducts = (pg: any) => {
    setMessage("Please wait...");
    api.get(`/api/listproducts/${pg}`)
      .then((res: any) => {        
          setProds(res.data.products);
          setTotpage(res.data.totpage);
          setPage(res.data.page);
          setIsfound(true);
      }, (error: any) => {
          setMessage(error.response.data.message);
      });
      window.setTimeout(() => {
        setMessage('');
    }, 3000);              
  }

  onMount(() => {
    fetchProducts(page());
  })


  const firstPage = (event: any) => {
    event.preventDefault();
    setPage(1);
    fetchProducts(page());
    return;
  }

  const nextPage = (event: any) => {        
    event.preventDefault();
    if (page() === totpage()) {
        return;
    } 
    let pg = page() + 1;
    setPage(pg);
    fetchProducts(page());
 }

 const prevPage = (event: any) => {
    event.preventDefault();
    let pg = page() - 1;
    setPage(pg);
    fetchProducts(page());
    return;
}

const lastPage = (event: any) => {
    event.preventDefault();
    setPage(totpage());
    fetchProducts(page());
    return;
}

const toDecimal = (xval: any): any => {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Ensures at least two decimal places
    maximumFractionDigits: 2, // Limits to two decimal places
  });
  return formatter.format(xval);
};

  return (
    <div class="container-fluid mt-3">
    <h3>Products Catalog</h3>
    <Show when={!isfound()}>
      <div class="text-left text-danger">{message()}</div>
    </Show>
    <div class="card-group mt-4">
    <For each={prods()}>        
        {(product, index) => (
          <div class="card mx-2">
            <img src={product.productPicture} class="card-img-top" alt="..."/>
            <div class="card-body">
                <h5 class="card-title">Descriptions</h5>
                <p class="card-text">{product.descriptions}</p>
            </div>
            <div class="card-footer">
                <p class="card-text text-danger"><span class="text-dark">PRICE :</span>&nbsp;<strong>&#8369;{toDecimal(product.sellPrice)}</strong></p>
            </div>  
          </div>
        )}
    </For>
    </div>    
    <Show when={totpage() > 1}>
     <nav aria-label="Page navigation example">
        <ul class="pagination mt-4">
          <li class="page-item"><a onclick={lastPage} class="page-link" href="#">Last</a></li>
          <li class="page-item"><a onclick={prevPage} class="page-link" href="#">Previous</a></li>
          <li id="next" class="page-item"><a onclick={nextPage} class="page-link" href="#">Next</a></li>
          <li class="page-item"><a onclick={firstPage} class="page-link" href="#">First</a></li>
          <li class="page-item page-link text-danger">Page&nbsp;{page()} of&nbsp;{totpage()}</li>
        </ul>
      </nav>
    </Show>
  </div>    
  );
};

export default Catalogs;