// Função para carregar produtos com ordenação
async function carregarProdutos() {
  try {
      const sortOptions = document.getElementById('sort-options').value;
      const [sortField, sortDirection] = sortOptions.split('-');
      const sortByPrice = sortField == 'preco';
      const filter = document.getElementById('search-bar').value;
      const searchButton = document.getElementById('search-button');

      searchButton.addEventListener('click', () => {
        filter = document.getElementById('search-bar').value;
    });
    
      const response = await fetch(`http://localhost:8080/produto?sortField=${sortField}&sortDirection=${sortDirection}&sortByPrice=${sortByPrice}&filter=${filter}`);
      const products = await response.json();

      const productList = document.getElementById('product-list');
      productList.innerHTML = ''; // Limpar os produtos existentes

      // Renderizar os produtos
      products.forEach(product => {
          const productCard = document.createElement('div');
          productCard.classList.add('col');

          productCard.innerHTML = `
              <div class="card h-100 bg-dark text-white shadow">
                  <img src="${product.imagemURL}" class="card-img-top" alt="Imagem do produto">
                  <div class="card-body">
                    <h5 class="card-title">${product.nome}</h5>
                    <p class="card-text">${product.descricao}</p>
                    <p class="card-text">Preço: R$ ${product.preco}</p>
                  </div>
              </div>
          `;

          productList.appendChild(productCard);
      });
  } catch (error) {
      console.error('Erro ao carregar os produtos:', error);
  }
}

document.getElementById('sort-options').addEventListener('change', carregarProdutos);

window.onload = carregarProdutos;


