import React from "react";

const Body = React.memo((props) => <div className="common-body">
    {props.children}
</div>);

export default Body;