import { CategoryContainer, Title } from "./category.styles";
import { useState, useEffect, Fragment } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";
import Spinner from "../../components/spinner/spinner.component";

import { selectCategoriesMap, selectCategoriesIsLoading } from "../../store/categories/category.selector";

const Category = () => {
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    const [products, setProducts] = useState(categoriesMap[category]);


    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            {
                isLoading ? 
                <Spinner /> :
                <CategoryContainer>
                {
                    // Safeguarding the component so that it will render only when actual data is present
                    // only render products.map() when products have a value.
                    // Doing this because we are fetching store data asynchronously when component mounts.
                    products &&
                    products.map((product) => <ProductCard key={product.id} product={product} />)
                }
                </CategoryContainer>
            }
        </Fragment>
    )
}

export default Category;