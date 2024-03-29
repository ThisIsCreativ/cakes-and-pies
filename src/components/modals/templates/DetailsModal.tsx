import React, { PropsWithChildren } from "react";
import { DetailsModalInfo } from "../../../types/modals";
import { CatalogItem, isWeightItem } from "../../../types/catalog";
import { useSelector } from "react-redux";
import { CATALOG } from "../../../constants/catalog";
import { ApplicationState, LocalizedStringArray } from "../../../types/app";
import ModalContainer from "../ModalContainer";
import ModalDismissBtn from "../ModalDismissBtn";
import { FormattedMessage, useIntl } from "react-intl";
import { AcceptableLocales } from "../../../types/intl";

interface DetailsModalProps {
    info: DetailsModalInfo
}
const DetailsModal: React.FunctionComponent<DetailsModalProps> = React.memo((props: DetailsModalProps) => {
    const catalogItem: CatalogItem = useSelector<ApplicationState, CatalogItem>(state => state[CATALOG].itemById[props.info.itemId]);
    const intl = useIntl();
    const locale = intl.locale as "ru" | "en";
    let price: number | null = null;
    let packPrice: number | null = null;
    let priceExtension = null;
    if (isWeightItem(catalogItem)) {
        price = catalogItem.priceByKg;
        priceExtension = <FormattedMessage
            id="CATALOG_PRICE_BY_KG"
            defaultMessage="₽/kg"
            description="Price per kg"
        />
        if (catalogItem.standartWeight) {
            packPrice = price * catalogItem.standartWeight;
        }
    } else {
        price = catalogItem.priceByItem;
        priceExtension = <FormattedMessage
            id="CATALOG_PRICE_BY_COUNT"
            defaultMessage="₽/pc"
            description="Price per count"
        />
        if (catalogItem.standartCount) {
            packPrice = price * catalogItem.standartCount;
        }
    }
    return <ModalContainer modalId={props.info.id} className="modal-details-card">
        <ModalDismissBtn modalId={props.info.id} />
        <div className="modal-details-container">
            <div className="modal-details-gallery">
                <Gallery images={catalogItem.images} />
            </div>
            <div className="modal-details-body">
                <div className="modal-details-title">{catalogItem.title[locale]}</div>
                <div className="modal-details-description">{catalogItem.description[locale]}</div>
                <Ingridients ingridients={catalogItem.ingridients} locale={locale} />
                <PackPrice price={packPrice} >
                    <span className="value">{price}</span>
                    <span className="ext">{priceExtension}</span>
                </PackPrice>
            </div>
        </div>
    </ModalContainer>
});

interface PackPriceProps {
    price: number | null
}
const PackPrice: React.FunctionComponent<PackPriceProps> = React.memo((props: PropsWithChildren<PackPriceProps>) => {
    if (props.price === null) {
        return <div className="modal-details-price">{props.children}</div>
    }
    return <div className="modal-details-price">
        <span className="value">{props.price}₽</span>
        <span className="value">({props.children})</span>
    </div>
});

interface GalleryProps {
    images: string[]
}
const Gallery: React.FunctionComponent<GalleryProps> = React.memo((props: GalleryProps) => {
    /**TODO */
    return <img src={props.images[0]} alt="large image" />
});

interface IngridientsProps {
    ingridients: LocalizedStringArray
    locale: AcceptableLocales
}
const Ingridients: React.FunctionComponent<IngridientsProps> = React.memo((props: IngridientsProps) => {
    if (props.ingridients[props.locale].length === 0) {
        return null;
    }
    return <div className="modal-details-ingridients">
        <FormattedMessage id="CATALOG_INGRIDIENTS" />
        <span>:</span>
        <span className="value ml-1">{props.ingridients[props.locale].join(", ")}</span>
    </div>
});

export default DetailsModal;