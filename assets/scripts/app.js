class Product {
	constructor(title, image, desc, price) {
		this.title = title;
		this.imageURL = image;
		this.description = desc;
		this.price = price;
	}
}

class ElementAttribute {
	constructor(attrName, attrValue) {
		this.name = attrName;
		this.value = attrValue;
	}
}

class Component {
	constructor(renderHookId) {
		this.hookID = renderHookId;
	}

	createRootElement(tag, cssClasses, attributes) {
		const rootElement = document.createElement(tag);
		if (cssClasses) {
			rootElement.className = cssClasses;
		}
		if (attributes && attributes.length > 0) {
			for (let attr of attributes) {
				rootElement.setAttribute(attr.name, attr.value);
			}
		}
		document.getElementById(this.hookID).append(rootElement);
		return rootElement;
	}
}

class ShoppingCart extends Component {
	items = [];

	set cartItems(value) {
		this.items = value;
		this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
			2
		)}</h2>`;
	}

	get totalAmount() {
		const sum = this.items.reduce(
			(prevValue, curItem) => prevValue + curItem.price,
			0
		);
		return sum;
	}

	constructor(renderHookId) {
		super(renderHookId);
	}

	addProduct(product) {
		const updatedItems = [...this.items];
		updatedItems.push(product);
		this.cartItems = updatedItems;
	}

	render() {
		const cartEl = this.createRootElement('section', 'cart');
		cartEl.innerHTML = `	
			<h2>Total: \$${0}</h2>
			<button>Order Now!</button>
		`;
		this.totalOutput = cartEl.querySelector('h2');
	}
}

class ProductItem extends Component {
	constructor(product, renderHookId) {
		super(renderHookId);
		this.product = product;
	}

	addToCart() {
		App.addProductToCart(this.product);
	}

	render() {
		const prodEl = this.createRootElement('li', 'product-item');
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
	}
}

class ProductList extends Component {
	products = [
		new Product(
			'A Robot',
			'https://images.unsplash.com/photo-1494390248081-4e521a5940db?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
			'A swift and ingenious machine that has the ability to learn.',
			44.99
		),
		new Product(
			'A Bunch of Cherries',
			'https://images.unsplash.com/photo-1547394765-185e1e68f34e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60',
			'Delicious and nutritive fruit plate.',
			77.99
		),
	];

	constructor(renderHookId) {
		super(renderHookId);
	}

	render() {
		const prodList = this.createRootElement('ul', 'product-list', [
			new ElementAttribute('id', 'prod-list'),
		]);

		for (const prod of this.products) {
			const productItem = new ProductItem(prod, 'prod-list');
			productItem.render();
		}
	}
}

class Shop {
	render() {
		this.cart = new ShoppingCart('app');
		this.cart.render();
		const productList = new ProductList('app');
		productList.render();
	}
}

class App {
	static cart;

	static init() {
		const shop = new Shop();
		shop.render();
		this.cart = shop.cart;
	}

	static addProductToCart(product) {
		this.cart.addProduct(product);
	}
}

App.init();
