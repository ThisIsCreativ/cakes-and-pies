import React from "react";

const LeftSidebar = React.memo((props) => <div className="common-left-sidebar">
    {props.children}
</div>);

export default LeftSidebar;