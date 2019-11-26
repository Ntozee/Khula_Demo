import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Product extends Component {

    render() {

        let serverImg = `https://khula.co.za/ProducePic/${ this.props.product.name.replace(/\ /g,"").toLowerCase()}.jpg`
        return(
            <div className="col-md-3">
                <div className="product-card">
                    <p className="product-name">{this.props.product.name}</p>
                    <img className="product-image" src={serverImg} alt="product-img"/>
                    <p className="product-price">{"R"+this.props.product.price +".00"}
                        <span className="lnr lnr-plus-circle"onClick={this.props.onClick}></span>
                    </p>
                </div>
            </div>
        )
    }
}

Product.propTypes = {
    product: PropTypes.object.isRequired
}