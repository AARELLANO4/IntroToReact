import React from 'react';
import  { Table, ListGroup, ListGroupItem } from 'react-bootstrap';

class Sale extends React.Component{
    
    constructor(props) {
        super(props);
        this.state = {
          sale: null,
          loading: true
        }

        this.itemTotal = this.itemTotal.bind(this);
    };

        // mount, getData with current page
    componentDidMount() {
        fetch(`https://aarellano4w422a1.herokuapp.com/api/sales/${this.props.id}`)
        .then(res=>res.json())
        .then(saleData => {
            this.setState({
                sale: saleData.data,
                loading: false});
            this.props.viewedSale(saleData.data._id)
        })
        .catch(err=>console.log(`ERROR: Cannot retrieve data: ${err}`))
    }
    
    componentDidUpdate(prevProps) {
        if(prevProps.id !== this.props.id){
            this.setState({loading: true})
            fetch(`https://aarellano4w422a1.herokuapp.com/api/sales/${this.props.id}`)
            .then(res=>res.json())
            .then(saleData => {
                this.setState({
                    sale: saleData.data,
                    loading: false
                });
                this.props.viewedSale(saleData.data._id)
            })
            .catch(err=>console.log(`ERROR: Cannot retrieve data: ${err}`))
        }
    }

    itemTotal(items){
        let total = 0;
        items.forEach(
            function(item){
                total += item.quantity * item.price;
            }
        )
        return total;
    }

    render(){
        if (this.state.loading) {
            return (
                <p>Loading. . . </p>
            )
        
        } 
        else {
            if (this.state.sale != null) {
                let data = this.state.sale;
                return (<div>
                        <h1>Sale: {data._id}</h1>
                        <h2>Customer</h2>
                        <ListGroup>
                            <ListGroupItem><strong>email:</strong> {data.customer.email}</ListGroupItem>
                            <ListGroupItem><strong>age:</strong> {data.customer.age}</ListGroupItem>
                            <ListGroupItem><strong>satisfaction:</strong> {data.customer.satisfaction} / 5</ListGroupItem>
                        </ListGroup>
                        <h2> Items: ${this.itemTotal(data.items).toFixed(2)}</h2>
                        <Table>
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                            </thead>
                            <tbody>
                                {data.items.map(item=>
                                    <tr>
                                        <td>{item.name}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.price}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </div>);
            } 
            else {
                return (<div><h1>Unable to find Sale</h1><p>id: {this.props.id}</p></div>)
                    
            }
        }
    }
        
}

export default Sale;