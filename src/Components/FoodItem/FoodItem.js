import React, { useState } from 'react'
import './FoodItem.css'
import { Link } from 'react-router-dom'
import { Image, Shimmer } from 'react-shimmer'

export default function FoodItem(props) {
    const [recipeInfo, setRecipeInfo] = useState([])
    const [showRecipeImg, setShowRecipeImg] = useState(false)
    const getMainRecipe = (recipeID) => {
        fetch(`https://forkify-api.herokuapp.com/api/get?${recipeID}`)
            .then(res => res.json())
            .then(result => setRecipeInfo(recipeInfo))
    }
    return (
        <>
            <li className='food-recipe' onClick={() => getMainRecipe(props.recipe_id)}>
                <Link to={`/recipe/${props.id}`} className='food-recipe-content'>
                    <Image
                        src={props.image_url}
                        fallback={<Shimmer className='food-recipe-img' width={60} height={60}
                            style={{ borderRadius: "50%", width: "60px", height: "60px" }}
                        />}
                    />
                    <div className='recipe-info'>
                        <span className='recipe-title'>{props.title}</span>
                        <span className='recipe-publisher'>{props.publisher}</span>
                    </div>
                </Link>
            </li>
        </>
    )
}
