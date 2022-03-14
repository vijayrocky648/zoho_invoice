function TABLEROW(props) {

    const ITEMDESCRIPTION = "description"
    const QUANTITY = "quantity"
    const RATE = "rate"
    const AMOUNT = "item_total"

    return (
        props.itemsList == 0 ? <></> :
            props.itemsList.map((x, index) => {
                return (<tbody>
                    <tr>
                        <td scope="row" className="invoice_table_row">
                            <textarea type="text" id="1" className="invoice_text_table_body"
                            
                             placeholder="Item Description" onChange={(e) => {
                                
                                props.addTextForList(e, ITEMDESCRIPTION, index);
                            } } value={x[ITEMDESCRIPTION]} />
                        </td>
                        <td scope="row">
                            <input type="number" id="2" className="invoice_text_table_body " placeholder="Qty" onChange={(e) => {

                                props.addTextForList(e, QUANTITY, index);
                            }} value={x[QUANTITY]} />
                        </td>
                        <td scope="row">
                            <input type="number" id="3" className="invoice_text_table_body" placeholder="Rate" onChange={(e) => {

                                props.addTextForList(e, RATE, index);
                            }} value={x[RATE]}/>
                        </td>
                        <td scope="row">
                            <input type="text" id="4" className="invoice_text_table_body" disabled={true} value={x.item_total} placeholder="Amount" onChange={(e) => {
                                props.addTextForList(e, QUANTITY, index);
                            }} />
                        </td>
                        <td scope="col" className='invoice_remove'>
                            <span onClick={() => {
                                props.removeItem(index)
                            }}>X</span>
                        </td>
                    </tr>
                </tbody>)

            })

    )
}
export default TABLEROW;