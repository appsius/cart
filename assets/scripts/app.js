class Product {
	// title = 'DEFAULT';
	// imageURL;
	// description;
	// price;

	constructor(title, image, desc, price) {
		this.title = title;
		this.imageURL = image;
		this.description = desc;
		this.price = price;
	}
}

class ShoppingCart {
	items = [];

	render() {
		const cartEl = document.createElement('section');
		cartEl.className = 'cart';
		cartEl.innerHTML = `	
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
		return cartEl;
	}
}

class ProductItem {
	constructor(product) {
		this.product = product;
	}

	addToCart() {
		console.log('Added to Cart...');
		console.log(this.product);
	}

	render() {
		const prodEl = document.createElement('li');
		prodEl.className = 'product-item';
		prodEl.innerHTML = `
					<div>
						<img src="${this.product.imageURL}" alt="${this.product.title}" />
						<div class="product-item__content">
							<h2>${this.product.title}</h2>
							<h3>\$${this.product.price}</h3>
							<p>${this.product.description}</p>
							<button>Add To Cart</button>
						</div>
					</div>
			`;
		const addCartButton = prodEl.querySelector('button');
		addCartButton.addEventListener('click', this.addToCart.bind(this));
		return prodEl;
	}
}

class ProductList {
	products = [
		new Product(
			'A Robot',
			'https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
			'A swift and ingenious machine that has the ability to learn.',
			44.99
		),
		new Product(
			'A Bunch of Cherries',
			'https://images.unsplash.com/photo-1580926608062-464f40bdcec2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
			'Delicious and nutritive fruit plate.',
			77.99
		),
	];

	constructor() {}

	render() {
		const prodList = document.createElement('ul');
		prodList.className = 'product-list';

		for (const prod of this.products) {
			const productItem = new ProductItem(prod);
			const prodEl = productItem.render();
			prodList.append(prodEl);
		}
		return prodList;
	}
}

class Shop {
	render() {
		const renderHook = document.getElementById('app');
		const cart = new ShoppingCart();
		const cartEl = cart.render();
		const productList = new ProductList();
		const prodListEl = productList.render();

		renderHook.append(cartEl);
		renderHook.append(prodListEl);
	}
}

const shop = new Shop();
shop.render();
