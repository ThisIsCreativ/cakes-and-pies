import React from "react";
import { DetailsModalInfo } from "../../../types/modals";
import { CatalogItem } from "../../../types/catalog";
import { useSelector } from "react-redux";
import { CATALOG } from "../../../constants/catalog";
import { ApplicationState } from "../../../types/app";
import ModalContainer from "../ModalContainer";
import ModalDismissBtn from "../ModalDismissBtn";

interface DetailsModalProps {
    info: DetailsModalInfo
}
const DetailsModal: React.FunctionComponent<DetailsModalProps> = React.memo((props: DetailsModalProps) => {
    const catalogItem: CatalogItem = useSelector<ApplicationState, CatalogItem>(state => state[CATALOG].itemById[props.info.id]);
    return <ModalContainer modalId={props.info.id}>
        <ModalDismissBtn modalId={props.info.id} />
        <div className="modal-details-container"></div>
    </ModalContainer>
});

export default DetailsModal;