import { createSignal,  Component, For, Show } from 'solid-js';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7101",
    headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const Search: Component = (props) => {
  const [search, setSearch] = createSignal('');
  let [page, setPage] = createSignal(1);
  let [totpage, setTotpage] = createSignal(0);
  const [prods, setProds] = createSignal([]);
  const [isFound, setIsfound] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const toDecimal = (xval: any): any => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Ensures at least two decimal places
      maximumFractionDigits: 2, // Limits to two decimal places
    });
    return formatter.format(xval);
  };
    
  const searchProducts = (pg: any, key: any) => {
    setMessage("please wait...searching...");
    api.get(`/api/searchproducts/${pg}/${key}`)
      .then((res) => {
          setProds(res.data.products);
          if (res.data.totpage > 1) {
            setTotpage(res.data.totpage);
          } else {
            setTotpage(0);
          }
          setPage(res.data.page);
          setIsfound(true);
          if (totpage() === 0) {
            setMessage("keyword not found....");
          }
      }, (error: any) => {
        if (error.response) {
          setMessage(error.response.data.message);
        } else {
          setMessage(error.message);
        }
        setIsfound(false);
          setTotpage(0);
          window.setTimeout(() => {
            setMessage('');
          }, 3000);
          return;
      });    
  } 

  const submitSearchForm = (event: any) => {
    event.preventDefault();
    searchProducts(page(), search());
  }

  const firstPage = (event: any) => {
    event.preventDefault();
    setPage(1);
    searchProducts(page(), search());
    return;
  }

  const nextPage = (event: any) => {        
    event.preventDefault();
    if (page() === totpage()) {
        return;
    } 
    let pg = page() + 1;
    setPage(pg);
    searchProducts(page(), search());
  }

  const prevPage = (event: any) => {
    event.preventDefault();
    let pg = page() - 1;
    setPage(pg);
    searchProducts(page(), search());
    return;
  }

  const lastPage = (event: any) => {
    event.preventDefault();
    setPage(totpage());
    searchProducts(page(), search());
    return;
  }

  return (
    <div class="container-fluid mb-9">
      <h3 class="mt-3">Search Product</h3>
      <div class="text-left text-danger mb-2">{message()}</div>

      <form class="row g-3" autocomplete="off">
          <div class="col-auto">
            <input type="text" value={search()} onInput={e => setSearch(e.currentTarget.value)} required class="form-control-sm" v-model="vardata.search" name="search" placeholder="enter description key"/>
          </div>
          <div class="col-auto">
            <button type="button" onclick={submitSearchForm} class="btn btn-primary btn-sm mb-3">search</button>
          </div>

      </form>

      <div class="card-group mb-4">

      <For each={prods()}>        
      {(product, index) => (

          <div class="card mx-1">
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
        <ul class="pagination">
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

export default Search;