import { createSignal, type Component, For, onMount, Show } from 'solid-js';
import axios from 'axios';

const api = axios.create({
    baseURL: "https://localhost:7101",
    headers: {'Accept': 'application/json',
            'Content-Type': 'application/json'}
})

const List: Component = (props) => {
  let [page, setPage] = createSignal(1);
  let [totpage, setTotpage] = createSignal(0);
  const [message, setMessage] = createSignal('');
  const [prods, setProds] = createSignal([]);
  const [isfound, setIsfound] = createSignal(false);

  const toDecimal = (xval: any): any => {
    const formatter = new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2, // Ensures at least two decimal places
      maximumFractionDigits: 2, // Limits to two decimal places
    });
    return formatter.format(xval);
  };


  const fetchProducts = (pg: any) => {
    setIsfound(false);
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

  return (
    <div class="container">
    <h3 class="mt-3 mb-2">Product List</h3>
    <Show when={!isfound()}>
      <div class="text-left text-danger">{message()}</div>
    </Show>
    <table class="table table-striped mt-4">
    <thead class="table-primary">
        <tr>
        <th scope="col">#</th>
        <th scope="col">Descriptions</th>
        <th scope="col">Stocks</th>
        <th scope="col">Unit</th>
        <th scope="col">Price</th>
        </tr>
    </thead>
    <tbody>
        <For each={prods()}>        
          {(product, index) => (
            <tr>
            <td>{product.id}</td>
            <td>{product.descriptions}</td>
            <td>{product.qty}</td>
            <td>{product.unit}</td>
            <td><strong class="text-danger">&#8369;</strong>{toDecimal(product.sellPrice)}</td>
            </tr>
          )}
        </For>
    </tbody>
    </table>

    
     <nav aria-label="Page navigation example">
        <ul class="pagination">
          <li class="page-item"><a onclick={lastPage} class="page-link" href="#">Last</a></li>
          <li class="page-item"><a onclick={prevPage} class="page-link" href="#">Previous</a></li>
          <li id="next" class="page-item"><a onclick={nextPage} class="page-link" href="#">Next</a></li>
          <li class="page-item"><a onclick={firstPage} class="page-link" href="#">First</a></li>
          <li class="page-item page-link text-danger">Page&nbsp;{page()} of&nbsp;{totpage()}</li>
        </ul>
      </nav>
  </div>    
  );
};

export default List;