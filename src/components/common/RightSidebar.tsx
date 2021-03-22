import React from "react";

const RightSidebar = React.memo((props) => <div className="common-right-sidebar">
    {props.children}
</div>);

export default RightSidebar;