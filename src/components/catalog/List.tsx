
import React from "react";
import { FormattedMessage, useIntl } from 'react-intl';
import { CatalogItem, isWeightItem } from "../../types/catalog";
import { LocalizedString } from "../../types/app";
import { parseLocalizedString } from "../../parsers/common";


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
    return <div className="category-item-container">
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
        {/* TODO */}
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
        <div className="category-item-description">{props.item.description[locale]}</div>
        <CatalogItemPrice item={props.item} />
    </div>
});

interface CatalogItemPriceProps {
    item: CatalogItem
}
const CatalogItemPrice: React.FunctionComponent<CatalogItemPriceProps> = React.memo((props: CatalogItemPriceProps) => {
    let price = null;
    let priceExtension = null;
    if (isWeightItem(props.item)) {
        price = props.item.priceByKg;
        priceExtension = <FormattedMessage
            id="CATALOG_PRICE_BY_KG"
            defaultMessage="₽/kg"
            description="Price per kg"
        />
    } else {
        price = props.item.priceByItem;
        priceExtension = <FormattedMessage
            id="CATALOG_PRICE_BY_COUNT"
            defaultMessage="₽/pc"
            description="Price per count"
        />
    }
    return <div className="category-item-price">
        <span className="label">
            <FormattedMessage
                id="CATALOG_PRICE"
                defaultMessage="Price:"
                description="Price label"
            />
        </span>
        <span className="value">{price}</span>
        <span className="ext">{priceExtension}</span>
    </div>
});

interface CatalogWeightItemPriceProps {
    item: CatalogItem
}
const CatalogWeightItemPrice: React.FunctionComponent<CatalogWeightItemPriceProps> = React.memo((props: CatalogWeightItemPriceProps) => {
    return <div className="category-item-price"></div>
});



export default CatalogList;