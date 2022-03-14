import './index.css'
function HEADER(props) {
    return (
        <div className="header">
            
                <div class="row">
                    <h4 className="text-start col-md-12">{props.Name}</h4>
                </div>
            
        </div>

    );
}

export default HEADER;