import React, { useEffect, useState } from 'react'
import './Pagination.css'
import { useParams } from 'react-router-dom'

export default function Pagination({ recipes, recipePerPage, setShownRecipes }) {
    const [pageCounts, setPagesCount] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const paginateRecipes = () => {
        const pageCounts = Math.ceil(recipes.length / recipePerPage)
        setPagesCount(pageCounts)
        const endIndex = currentPage * recipePerPage;
        const startIndex = endIndex - recipePerPage;
        const paginatedRecipes = recipes.slice(startIndex, endIndex)
        setShownRecipes(paginatedRecipes)
    }

    useEffect(() => {
        paginateRecipes()
    }, [recipes, currentPage])

    return (
        <div className='pagination'>
            {
                Array(pageCounts).fill(0).map((item, index) => (
                    <span key={index} className='pagination-recipes' onClick={() => setCurrentPage(index + 1)}>{index + 1}</span>
                ))
            }
        </div>
    )
}
