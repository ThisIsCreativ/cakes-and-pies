import React from "react";
import { CatalogCategory, CatalogFilterInfo, CatalogItem } from "../../types/catalog";

interface CatalogFilterProps {
    loading: boolean
    items: string[]
    itemById: { [k: string]: CatalogItem }
    categories: CatalogCategory[]
    filter: CatalogFilterInfo | null
}
const CatalogFilter: React.FunctionComponent<CatalogFilterProps> = React.memo((props: CatalogFilterProps) => {
    return <div></div>;
});

export default CatalogFilter;