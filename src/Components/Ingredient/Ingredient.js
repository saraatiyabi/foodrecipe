import React, { useEffect, useReducer } from 'react'
import CheckIcon from '@mui/icons-material/Check';
import './Ingredient.css'

export default function Ingredient(props) {

    const ingredientReducer = (state, action) => {
        switch (action.type) {
            case 'UPDATE': {
                return {
                    quantity: action.quantity,
                    unit: action.unit,
                    description: action.description
                }
            }
            default: {
                return state
            }
        }
    }

    useEffect(() => {
        updateIngredient()
    }, [props.newServings,props.description])



    const [ingredient, dispatch] = useReducer(ingredientReducer, {
        quantity: props.quantity,
        unit: props.unit,
        description: props.description
    })


    const updateIngredient = () => {
        dispatch({
            type: "UPDATE",
            quantity: props.quantity * props.newServings / props.prevServings,
            unit: props.unit,
            description: props.description
        })
    }

    return (
        <li className='recipe-ingredient'>
            <span><CheckIcon className='recipe-ingredient-icon' /></span>
            <span className='recipe-quantity'>{ingredient.quantity ? ingredient.quantity : ''}</span>
            <span className='recipe-unit'>{ingredient.unit ? ingredient.unit : ''}</span>
            <span className='recipe-description'>{ingredient.description}</span>
        </li>
    )
}
