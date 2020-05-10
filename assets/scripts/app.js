class Product {
	title = 'DEFAULT';
	imageURL;
	description;
	price;

	constructor(title, image, desc, price) {
		this.title = title;
		this.imageURL = image;
		this.description = desc;
		this.price = price;
	}
}

const productList = {
	products: [
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
	],
	render() {
		const renderHook = document.getElementById('app');
		const prodList = document.createElement('ul');
		prodList.className = 'product-list';

		for (const prod of this.products) {
			const prodEl = document.createElement('li');
			prodEl.className = 'product-item';
			prodEl.innerHTML = `
                <div>
                    <img src="${prod.imageURL}" alt="${prod.title}" />
                    <div class="product-item__content">
                        <h2>${prod.title}</h2>
                        <h3>\$${prod.price}</h3>
                        <p>${prod.description}</p>
                        <button>Add To Cart</button>
                    </div>
                </div>
            `;
			prodList.append(prodEl);
		}
		renderHook.append(prodList);
	},
};

productList.render();
