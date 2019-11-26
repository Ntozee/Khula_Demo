import React from 'react'
import Product from '../product/product'
import PropTypes from 'prop-types'

export default class Products extends React.Component {

    render() {
        return this.props.products.map((product) => (
                <Product 
                    key={product.id} 
                    product={product}
                    onClick={() => this.props.onAddToCart(product)}
                />
        ));
    }

}

Products.propTypes = {
    products: PropTypes.array.isRequired
}