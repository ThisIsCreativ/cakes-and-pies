import React, { PropsWithChildren } from "react";

interface ContainerProps {
    className?: string
}

const Container = React.memo<PropsWithChildren<ContainerProps>>((props) => {
    return <div className={`common-container ${props.className}`}>
        {props.children}
    </div>
});

export default Container;