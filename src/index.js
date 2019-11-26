import React from 'react'
import ReactDOM from 'react-dom'
import Products from './components/products/products'
import './assets/styles/main.css'
import logo from './assets/logo.png'

class ProductCatalogue extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            products: [],
            numOfResults: 0,
            cartCounter: 0,
            cart: [],
            showCheckoutModal: false,
            cartTotal: 0
        };
    }
    render() {
        return (
            <div className="product-catalogue">
                <div className="header">
                    <h1 className="logo"><img className="img-logo" src={logo} alt="logo" /></h1>
                    <div className="cart-holder" onClick={() => this.showCheckoutModal()}>
                        <p className="cart-info">My Cart
                        {
                                this.state.cartCounter > 0 &&
                                <span className="cart-counter">{this.state.cartCounter}</span>
                            }
                        </p>
                        <p className="checkout-btn">CHECKOUT
                        <span className="lnr lnr-cart"></span>
                        </p>
                    </div>
                </div>
                <div className="main-section">
                    <p className="results-count">{this.state.numOfResults} Items returned </p>
                    <div className="row">
                        <Products
                            products={this.state.products}
                            counter={this.state.cartCounter}
                            onAddToCart={(item) => this.handleAddToCart(item)}
                        />
                    </div>
                </div>
                {
                    this.state.showCheckoutModal &&
                    <div className="checkout-modal">
                        <h3 className="basket-summary-title">
                            Cart Summary
                            <span className="lnr lnr-cross" onClick={() => this.close()}></span>
                        </h3>
                        <p className="basket-summary-subtitle">Your Items</p>
                        {
                            this.state.cartCounter === 0 &&
                            <p className="basket-summary-error">There are no items in your cart.</p>
                        }
                        <table className="basket">
                            {
                                this.state.cart.map((product) => (
                                    product.cartQuantity > 0 &&
                                    <tr className="basket-item" key={product.id}>
                                        <td>{product.name} </td>
                                        <td><span className="basket-line-item">R{product.price}.00</span></td>
                                        <td> X</td>
                                        <td><span className="basket-line-item">{product.cartQuantity}</span></td>
                                        <td> =</td>
                                        <td><span className="basket-line-item">R{product.cartQuantity * product.price}.00</span></td>
                                        <td><span onClick={() => this.removeItem(product)} className="lnr lnr-circle-minus"></span></td>
                                    </tr>
                                ))
                            }
                        </table>
                        {
                            <div className="basket-total">
                                Total: R{this.state.cart.length > 0 ?
                                    this.state.cart.map((item) => {
                                        return parseFloat(item.price) * item.cartQuantity
                                    }).reduce((total, amount) => {
                                        return total + amount
                                    }) : 0
                                }
                            </div>
                        }

                    </div>

                }
            </div>
        )
    }
    componentDidMount() {
        fetch("https://khula.co.za/API/V2/Admin/?type=admin_get_produce_inventory")
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    products: data.data,
                    numOfResults: data.data.length,
                })
                console.log(this.state.products)
            })
    };
    handleAddToCart(product) {
        const cartCounter = this.state.cartCounter + 1
        let cart = this.state.cart
        let cartItem = cart.find((item) => item.id === product.id)
        if (cartItem) {
            cartItem.cartQuantity = cartItem.cartQuantity ? cartItem.cartQuantity + 1 : 1
        } else {
            product.cartQuantity = 1
            cart.push(product)
        }
        this.setState({ cartCounter: cartCounter, cart })
    }
    createTable = () => {
        let table = []
        let tot = this.state.cartTotal

        for (let j = 0; j < this.state.cart.length; j++) {
            table.push(<tr>{this.state.cart[j].name + " R" + this.state.cart[j].price}</tr>)
            tot = this.state.cart[j].price + tot
        }
        table.push(<tr>{tot}</tr>)
        return table
    }

    showCheckoutModal() {
        const showCheckoutModal = true
        this.setState({ showCheckoutModal: showCheckoutModal })
    }
    close() {
        const showCheckoutModal = false
        this.setState({ showCheckoutModal: showCheckoutModal })
    }
    removeItem(product) {
        const cartCounter = this.state.cartCounter - 1
        let cart = this.state.cart
        let cartItem = cart.find((item) => item.id === product.id)
        if (cartItem) {
            cartItem.cartQuantity = cartItem.cartQuantity ? cartItem.cartQuantity - 1 : 0
        } else {
            product.cartQuantity = 0;
            cart.push(product)
        }
        this.setState({ cartCounter: cartCounter, cart })

    }
}

ReactDOM.render(
    <ProductCatalogue />,
    document.getElementById('root')
);
