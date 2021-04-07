import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { CatalogCategory, CatalogFilterInfo, CatalogItem, AcceptableFilterType } from "../../types/catalog";
import { AcceptableLocales } from "../../types/intl";

interface CatalogFilterProps {
    loading: boolean
    items: string[]
    itemById: { [k: string]: CatalogItem }
    categories: CatalogCategory[]
    filter: CatalogFilterInfo
    changeFilter: (type: AcceptableFilterType, item: string) => void
}
const CatalogFilter: React.FunctionComponent<CatalogFilterProps> = React.memo((props: CatalogFilterProps) => {
    const [localeIngridients, setLocaleIngridients] = React.useState<string[]>([]);
    const [localeCategories, setLocaleCategories] = React.useState<string[]>([]);
    const locale = useIntl().locale as AcceptableLocales;

    React.useEffect(() => {
        const localeIngridients: string[] = [];
        const ingridientsMap: { [k: string]: boolean } = {};
        for (let itemId of props.items) {
            const item = props.itemById[itemId];
            for (let ingridient of item.ingridients[locale]) {
                if (ingridientsMap[ingridient]) {
                    continue;
                }
                ingridientsMap[ingridient] = true;
                localeIngridients.push(ingridient);
            }
        };
        setLocaleIngridients(localeIngridients.sort());
    }, [props.items, props.itemById, locale]);

    React.useEffect(() => {
        const localeCategories = props.categories.map(category => category.label[locale]);
        setLocaleCategories(localeCategories.sort());
    }, [props.categories, locale]);

    return <div className="catalog-filter">
        <div className="catalog-filter-container">
            <FilterGroup>
                <FilterGroupTitle>
                    <FormattedMessage
                        id="CATALOG_CATEGORIES"
                        defaultMessage="Categories"
                        description="Categories"
                    />
                </FilterGroupTitle>
                <FilterGroupContent>
                    {localeCategories.map((category, idx) =>
                        <FilterItem key={idx} value={props.filter.groups[category]} onClick={() => props.changeFilter("groups", category)}>
                            {category}
                        </FilterItem>)}
                </FilterGroupContent>
            </FilterGroup>
            <FilterGroup>
                <FilterGroupTitle>
                    <FormattedMessage
                        id="CATALOG_INGRIDIENTS"
                    />
                </FilterGroupTitle>
                <FilterGroupContent>
                    {localeIngridients.map((ingridient, idx) =>
                        <FilterItem key={idx} value={props.filter.ingridients[ingridient]} onClick={() => props.changeFilter("ingridients", ingridient)}>
                            {ingridient}
                        </FilterItem>)}
                </FilterGroupContent>
            </FilterGroup>
        </div>
    </div>;
});

const FilterGroup: React.FunctionComponent = (props) => {
    return <div className="catalog-filter-group">{props.children}</div>
};

const FilterGroupTitle: React.FunctionComponent = (props) => {
    return <div className="catalog-filter-title">{props.children}</div>
};

const FilterGroupContent: React.FunctionComponent = (props) => {
    return <div className="catalog-filter-content">{props.children}</div>
};

interface FilterItemProps {
    value?: boolean
    onClick: () => void
}
const FilterItem: React.FunctionComponent<FilterItemProps> = React.memo((props) => {
    return <div className="catalog-filter-item" onClick={props.onClick}>
        <FilterItemCheckbox value={props.value} />
        <span className="label">{props.children}</span>
    </div>
});

interface FilterItemCheckboxProps {
    value?: boolean
}
const FilterItemCheckbox: React.FunctionComponent<FilterItemCheckboxProps> = React.memo((props) => {
    let className = "catalog-filter-item-checkbox";
    if (props.value) {
        className += " include";
    } else if (props.value === false) {
        className += " exclude";
    }
    return <div className={className}></div>
});

export default CatalogFilter;