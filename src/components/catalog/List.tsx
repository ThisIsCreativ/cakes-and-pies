
import React, { PropsWithChildren } from "react";
import { FormattedMessage, useIntl } from 'react-intl';
import { CatalogItem, isWeightItem } from "../../types/catalog";
import { LocalizedString } from "../../types/app";
import { parseLocalizedString } from "../../parsers/common";
import { ModalInfo } from "../../types/modals";
import { MODAL_DETAILS } from "../../constants/modal";
import shortid from "shortid";
import { useDispatch } from "react-redux";
import { openModal } from "../../actions/modals";


interface CatalogListProps {
    loading: boolean
    items: string[]
    itemById: { [k: string]: CatalogItem }
}
const CatalogList: React.FunctionComponent<CatalogListProps> = React.memo((props: CatalogListProps) => {
    const [categories, setCategories] = React.useState<CategoryProps[]>([]);

    React.useEffect(() => {
        const categories: CategoryProps[] = [];
        const categoryIdxByName: { [k: string]: number } = {};
        for (let itemId of props.items) {
            const item = props.itemById[itemId];
            const categoryEnName = item.category.en;
            if (typeof categoryIdxByName[categoryEnName] === "undefined") {
                categories.push({
                    label: item.category,
                    items: []
                });
                categoryIdxByName[categoryEnName] = categories.length - 1;
            }
            const category = categories[categoryIdxByName[categoryEnName]];
            category.items.push(item);
        }
        setCategories(categories);
    }, [props.items, props.itemById]);

    if (props.loading) {
        return <LoadingPlaceholder />;
    }
    if (props.items.length === 0) {
        return <EmptyResultPlaceholder />;
    }
    console.log(props.items, props.itemById, categories)
    return <>
        {categories.map((category, idx) => <Category key={idx} label={category.label} items={category.items} />)}</>;
});

/**TODO: add styling */
const LoadingPlaceholder = React.memo(() => <div className="catalog-loading-placeholder">
    <FormattedMessage
        id="CATALOG_LOADING"
        defaultMessage="Please wait, catalog is loading"
        description="Message to be displayed on catalog loading"
    />
</div>);

/**TODO: add styling */
const EmptyResultPlaceholder = React.memo(() => <div className="catalog-empty-placeholder">
    <FormattedMessage
        id="CATALOG_RESULT_EMPTY"
        defaultMessage="Result for request is empty"
        description="Message for empty request result"
    />
</div>);

interface CategoryProps {
    label: LocalizedString
    items: CatalogItem[]
}
const Category: React.FunctionComponent<CategoryProps> = React.memo((props: CategoryProps) => {
    const intl = useIntl();
    const locale = intl.locale as "ru" | "en";
    return <div className="catalog-category">
        <div className="category-title">{props.label[locale]}</div>
        <div className="category-items">
            {props.items.map((item, idx) => <CategoryItem key={idx} item={item} />)}
        </div>
    </div>
});

interface CategoryItemProps {
    item: CatalogItem
}
const CategoryItem: React.FunctionComponent<CategoryItemProps> = React.memo((props: CategoryItemProps) => {
    const dispatch: any = useDispatch();
    let clickTimestamp: number = 0;
    let clickX: number = 0;
    let clickY: number = 0;
    const mouseDownHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        clickTimestamp = Date.now();
        clickX = event.screenX;
        clickY = event.screenY;
    }
    const mouseUpHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const newClickTimestamp = Date.now();
        if (newClickTimestamp - clickTimestamp > 200 || event.screenX - clickX > 5 || event.screenY - clickY > 5) {
            return;
        }
        dispatch(openModal({ id: shortid.generate(), type: MODAL_DETAILS, itemId: props.item.id }));
    }
    return <div className="category-item-container" onMouseDown={mouseDownHandler} onMouseUp={mouseUpHandler}>
        <div className="category-item-card">
            <CatalogItemGallery images={props.item.images} />
            <CatalogItemDetails item={props.item} />
        </div>
    </div>
});

interface CatalogItemGalleryProps {
    images?: string[]
}
const CatalogItemGallery: React.FunctionComponent<CatalogItemGalleryProps> = React.memo((props: CatalogItemGalleryProps) => {
    return <div className="category-item-gallery">
        {props.images ? <img src={props.images[0]} alt="preview" /> : null}
    </div>
});

interface CatalogItemDetailsProps {
    item: CatalogItem
}
const CatalogItemDetails: React.FunctionComponent<CatalogItemDetailsProps> = React.memo((props: CatalogItemDetailsProps) => {
    const intl = useIntl();
    const locale = intl.locale as "ru" | "en";
    return <div className="category-item-details">
        <div className="category-item-title">{props.item.title[locale]}</div>
        <CatalogItemPrice item={props.item} />
    </div>
});

interface CatalogItemPriceProps {
    item: CatalogItem
}
const CatalogItemPrice: React.FunctionComponent<CatalogItemPriceProps> = React.memo((props: CatalogItemPriceProps) => {
    let price: number | null = null;
    let packPrice: number | null = null;
    let priceExtension = null;
    if (isWeightItem(props.item)) {
        price = props.item.priceByKg;
        priceExtension = <FormattedMessage
            id="CATALOG_PRICE_BY_KG"
            defaultMessage="₽/kg"
            description="Price per kg"
        />
        if (props.item.standartWeight) {
            packPrice = price * props.item.standartWeight;
        }
    } else {
        price = props.item.priceByItem;
        priceExtension = <FormattedMessage
            id="CATALOG_PRICE_BY_COUNT"
            defaultMessage="₽/pc"
            description="Price per count"
        />
        if (props.item.standartCount) {
            packPrice = price * props.item.standartCount;
        }
    }
    return <PackPrice price={packPrice} >
        <span className="value">{price}</span>
        <span className="ext">{priceExtension}</span>
    </PackPrice>
});

interface PackPriceProps {
    price: number | null
}
const PackPrice: React.FunctionComponent<PackPriceProps> = React.memo((props: PropsWithChildren<PackPriceProps>) => {
    if (props.price === null) {
        return <div className="category-item-price">{props.children}</div>
    }
    return <div className="category-item-price">
        <span className="value">{props.price}₽</span>
        <span className="value">({props.children})</span>
    </div>
});

export default CatalogList;