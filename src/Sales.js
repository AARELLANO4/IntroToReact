import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom';
import { Table, Pagination } from 'react-bootstrap';

class Sales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          sales: [],
          currentPage: 1
        }
    
        this.getData = this.getData.bind(this);
        this.previousPage = this.previousPage.bind(this);
        this.nextPage = this.nextPage.bind(this);
    };

    // utility function
    getData(page){
        fetch(`https://aarellano4w422a1.herokuapp.com/api/sales?page=${page.currentPage}&perPage=10`)
        .then(res=>res.json())
        .then(sale=>{
            this.setState({sales: sale.data})
        })
    }

    // mount, getData with current page
    componentDidMount() {
        this.getData({
            currentPage: this.state.currentPage
        })
    }

    previousPage(){
        if (this.state.currentPage >1 ){
            this.getData({currentPage: this.state.currentPage-1});

            this.setState({
                currentPage: this.state.currentPage-1
            });

            this.setState({
                sales: this.state.sales
            })
        }
    }

    nextPage(){
        this.getData({currentPage: this.state.currentPage+1});

        this.setState({
            currentPage: this.state.currentPage+1
        });

        this.setState({
            sales: this.state.sales
        })
    }
    

    render() {
        if(this.state.sales.length > 1){
            return (
                <div>
                    <Table hover>
                    <thead>
                        <tr>
                            <th>Customer</th>
                            <th>Store Location</th>
                            <th>Number of Items</th>
                            <th>Sale Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.sales.map((sale)=>
                            <tr key={sale._id} onClick={()=>{this.props.history.push(`/Sale/${sale._id}`)}}>
                                <td>{sale.customer.email}</td>
                                <td>{sale.storeLocation}</td>
                                <td>{sale.items.length}</td>
                                <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
                            </tr>
                        )}
                    </tbody>
                    </Table>
                    <Pagination>
                        <Pagination.Prev onClick={this.previousPage}/>
                        <Pagination.Item>{this.state.currentPage}</Pagination.Item>
                        <Pagination.Next onClick={this.nextPage} />
                    </Pagination>
                </div>
            )
        }

        else {
            return(
                <p>Loading. . .</p>
            )
        }
        
    }
}

export default withRouter(Sales);