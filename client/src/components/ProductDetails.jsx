import React, {PureComponent} from 'react'
import {fetchProduct, updateProduct} from '../actions/products';
import ProductForm from './ProductForm'
// import PropTypes from 'prop-types'


import {connect} from 'react-redux'



class ProductDetails extends PureComponent {
  state = {
    edit: false
  }



  toggleEdit = () => {
  this.setState({
    edit: !this.state.edit
  })
}
updateProduct = (product) => {
  this.props.updateProduct(this.props.match.params.id, product)
  this.toggleEdit()
}

  componentWillMount(props) {
    this.props.fetchProduct(this.props.match.params.id)
  }

  render() {
    const {product} = this.props
    if (!product) return null
    return (
      <div>
        <h1>{ product.name }</h1>
        {
     this.state.edit &&
     <ProductForm initialValues={product} onSubmit={this.updateProduct} />
   }
        {
          !this.state.edit &&
          <div>
        <p>&euro;{product.price}</p>
        {product.image != null &&  <img src={product.image} alt="anImage"/>}
        <p>{product.description}</p>
        <button><b>Buy This Product</b></button>

      </div>
    }
        <button onClick={this.toggleEdit}>Edit</button>
  </div>
    )
  }
}

const mapStateToProps = function (state, props) {
  return {
    product: state.product
  }
}

export default connect(mapStateToProps, {fetchProduct, updateProduct})(ProductDetails)
