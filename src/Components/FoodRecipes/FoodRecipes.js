import { useEffect, useState } from 'react'
import './FoodRecipes.css'
import FoodItem from '../FoodItem/FoodItem'
import Pagination from '../Pagination/Pagination'

export default function FoodRecipes({ recipes }) {
    const [shownRecipes, setShownRecipes] = useState([])
    return (
        <>
            <ul className='recipe-list'>
                {
                    shownRecipes.map(recipe => (
                        <FoodItem key={recipe.id} {...recipe} />
                    ))
                }
            </ul>
            <Pagination recipes={recipes} recipePerPage={10} setShownRecipes={setShownRecipes} />
        </>

    )
}
