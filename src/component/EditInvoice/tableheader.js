function TABLEHEADER() {
    return (
        <thead class="thead">
            <tr>
                <th scope="col" className="invoice_table_row">
                    <label type="text" className="invoice_text_table_header  " value="Item Description" >Item Description</label>
                </th>
                <th scope="col">
                    <label type="text" className="invoice_text_table_header " value="Qty" >Qty</label>
                </th>
                <th scope="col">
                    <label type="text" className="invoice_text_table_header" value="Rate" >Rate</label>
                </th>
                <th scope="col">
                    <label type="text" className="invoice_text_table_header" value="Amount">Amount</label>
                </th>
                <th scope="col">

                </th>
            </tr>
        </thead>
    )
}
export default TABLEHEADER;