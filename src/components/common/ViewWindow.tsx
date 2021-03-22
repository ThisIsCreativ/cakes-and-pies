import React from "react";

const ViewWindow = React.memo((props) => <div className="common-view-window">
    {props.children}
</div>);

export default ViewWindow;