
import React from "react";
import { FormattedMessage } from 'react-intl';
import { CatalogItem } from "../../types/catalog";
import { LocalizedString } from "../../types/app";
import { parseLocalizedString } from "../../parsers/common";

interface CatalogListProps {
    items: string[]
    itemById: { [k: string]: CatalogItem }
}
const CatalogList: React.FunctionComponent<CatalogListProps> = React.memo((props: CatalogListProps) => {
    const [categories, setCategories] = React.useState<CategoryProps[]>([]);

    React.useEffect(()=>{
        const categories:CategoryProps[] = [];
        const categoryIdxByName: {[k:string] : number} = {};
        for(let itemId of props.items) {
            const item = props.itemById[itemId];
            const categoryEnName = item.category.en;
            if(typeof categoryIdxByName[categoryEnName] === "undefined") {
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

    if (props.items.length === 0) {
        return <EmptyResultPlaceholder />
    }
    console.log(props.items, props.itemById, categories)
    return <span>Здесь будет каталог</span>;
});

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

export default CatalogList;