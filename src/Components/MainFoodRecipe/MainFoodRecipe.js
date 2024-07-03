import React, { useEffect, useState } from 'react'
import './MainFoodRecipe.css'
import { Link, useParams } from 'react-router-dom'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Image, Shimmer } from 'react-shimmer'
import Ingredient from '../Ingredient/Ingredient';
import Loader from '../Loader/Loader';

export default function MainFoodRecipe(props) {
    const { id } = useParams();
    const [mainRecipeInfo, setMainRecipeInfo] = useState({})
    const [mainRecipeIngredients, setMainRecipeIngredients] = useState([])
    const [servings, setServings] = useState(4)
    const [showRecipeLoader, setShowRecipeLoader] = useState(false)
    const KEY = 'f8d381ea-c426-439c-b99a-a75fe9bcbe40'

    useEffect(() => {
        if (id) {
            getMainRecipeInfo()
        }
    }, [id, mainRecipeInfo.isBookmarked])


    const getMainRecipeInfo = () => {
        setShowRecipeLoader(true)
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${KEY}`)
            .then(res => res.json())
            .then(foodRecipe => {
                setMainRecipeInfo(foodRecipe.data.recipe)
                checkIsRecipeBookmarked(foodRecipe.data.recipe.title)
                setMainRecipeIngredients(foodRecipe.data.recipe.ingredients)
                setServings(foodRecipe.data.recipe.servings)
                setShowRecipeLoader(false)
            })
    }

    function checkIsRecipeBookmarked(recipeTitle) {
        if (props.bookmarks.length) {
            const isMainRecipeBookmarked = props.bookmarks.some(bookmark => {
                return bookmark.title === recipeTitle
            })
            if (isMainRecipeBookmarked) {
                setMainRecipeInfo(prevRecipeInfo => {
                    return {
                        ...prevRecipeInfo,
                        isBookmarked: true
                    }
                })
            } else {
                setMainRecipeInfo(prevRecipeInfo => {
                    return { ...prevRecipeInfo, isBookmarked: false }
                })
            }
        } else {
            setMainRecipeInfo(prevRecipeInfo => {
                return { ...prevRecipeInfo, isBookmarked: false }
            })
        }
    }

    function bookmarkRecipe() {
        setMainRecipeInfo(prevRecipeInfo => {
            return {
                ...prevRecipeInfo,
                isBookmarked: true
            }
        })
        props.setAllBookmarks((prevRecipe) => {
            return [...prevRecipe, mainRecipeInfo]
        })
    }

    function deleteBookmark(recipeID) {
        console.log("bookmark delete:))")
        const updatedBookmarks = props.bookmarks.filter(bookmarkedRecipe => {
            return bookmarkedRecipe.id !== recipeID
        })
        console.log(updatedBookmarks)
        props.setAllBookmarks(updatedBookmarks)
        checkIsRecipeBookmarked(recipeID)
    }

    return (
        <div className='main-recipe'>
            {
                id ?
                    (<div>
                        <div className='main-recipe-loader-wrapper'>
                            {
                                showRecipeLoader && <Loader />
                            }
                        </div>

                        <div className='main-recipe-header'>
                            <Image
                                src={mainRecipeInfo.image_url}
                                fallback={<Shimmer width={700} height={300} />}
                            />
                            <h1 className='main-recipe-title'>
                                <span>{mainRecipeInfo.title}</span>
                            </h1>
                        </div>
                        <div className='main-recipe-details'>
                            <div className='main-recipe-details-left'>
                                <div className='main-recipe-info recipe-time'>
                                    <AccessTimeIcon className='main-recipe-icon' />
                                    <span className='recipe-info-data'>{mainRecipeInfo.cooking_time}</span>
                                    <span>minutes</span>
                                </div>
                                <div className='main-recipe-info servings-count'>
                                    <PeopleAltIcon className='main-recipe-icon' />
                                    <span className='recipe-info-data'>{servings}</span>
                                    <span>servings</span>
                                    <ControlPointIcon className='main-recipe-icon plus' onClick={() => {
                                        setServings(prevServings => prevServings + 1)
                                    }} />
                                    <RemoveCircleOutlineIcon className='main-recipe-icon minus' onClick={() => setServings(prevServings => prevServings - 1)} />
                                </div>
                            </div>
                            <div className='main-recipe-details-right'>
                                <div className='main-recipe-info'>
                                    {
                                        !mainRecipeInfo.isBookmarked ? (<BookmarkBorderIcon className='main-recipe-icon' onClick={bookmarkRecipe} />) :
                                            (<BookmarkIcon onClick={() => deleteBookmark(mainRecipeInfo.id)} className='main-recipe-icon' />)
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='main-recipe-ingredients'>
                            <h3>Recipe ingredients</h3>
                            <ul className='main-recipe-ingredients-list'>
                                {
                                    mainRecipeIngredients.map(ingredient => (
                                        <Ingredient {...ingredient} newServings={servings} prevServings={mainRecipeInfo.servings} />
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='recipe-how-to'>
                            <h3 className='recipe-how-to-title'>how to cook it</h3>
                            <p>This recipe was carefully designed
                                and tested by <span className='recipe-creator'>Closet Cooking</span>.
                                Please check out directions at their website.
                            </p>
                            <Link to={mainRecipeInfo.source_url} className='recipe-how-to-btn'>
                                directions
                                <ArrowForwardIcon />
                            </Link>
                        </div>
                    </div>) : (<p className='no-main-recipe-message'>start by searching for new recipes :)</p>)
            }
        </div>
    )
}
