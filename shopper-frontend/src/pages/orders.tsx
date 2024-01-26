import { ReactElement, useState } from "react";
import TableHOC from "../Components/admin/TableHOC"
import { Link } from "react-router-dom";
import { Column } from "react-table";
type DataType = {
    _id: string;
    amount: number;
    quantity: number;
    discount: number;
    status: ReactElement;
    action: ReactElement;
};
const column: Column<DataType>[] = [
    {
        Header: "ID",
        accessor: "_id",
    },{
        Header: "Amount",
        accessor: "amount",
    },{
        Header: "Quantity",
        accessor: "quantity",
    },{
        Header: "Discount",
        accessor: "discount",
    },{
        Header: "Status",
        accessor: "status",
    },{
        Header: "Action",
        accessor: "action",
    },

];
const Orders = () => {
    const[rows] = useState([
        {
        _id: "saddas",
        amount: 123,
        quantity: 2,
        discount: 12,
        status: <span className="red">Processing</span>,
        action: <Link to = "/orders/saddas">View</Link>,
        }
    

    ])

    const Table = TableHOC<DataType>(column,rows,"dashboard-product-box","Orders",rows.length>6)()
  return (
    <div className="container">
        <h1>MY ORDERS</h1>
        {Table}
    </div>
  )
}

export default Orders
