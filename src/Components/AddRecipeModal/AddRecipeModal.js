import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './AddRecipeModal.css'

export default function AddRecipeModal(props) {

    const [newRecipeTitle, setNewRecipeTitle] = useState('')
    const [newRecipeSourceUrl, setNewRecipeSourceUrl] = useState('')
    const [newRecipeImgUrl, setNewRecipeImgUrl] = useState('')
    const [newRecipePublisher, setNewRecipePublisher] = useState('')
    const [newRecipeCookingTime, setNewRecipeCookingTime] = useState('')
    const [newRecipeServings, setNewRecipeServings] = useState(0)
    const [newRecipeIngredient1, setNewRecipeIngredient1] = useState('')
    const [newRecipeIngredient2, setNewRecipeIngredient2] = useState('')
    const [newRecipeIngredient3, setNewRecipeIngredient3] = useState('')
    const [newRecipeIngredient4, setNewRecipeIngredient4] = useState('')
    const [newRecipeIngredient5, setNewRecipeIngredient5] = useState('')
    const [newRecipeIngredient6, setNewRecipeIngredient6] = useState('')
    const key = "40022206-fb2c-4ac5-ac7b-28d10fbce030"

    async function createNewRecipe() {

        const ingredientsArray = [newRecipeIngredient1, newRecipeIngredient2, newRecipeIngredient3,
            newRecipeIngredient4, newRecipeIngredient5, newRecipeIngredient6]

        const ingObjs = await addNewIngredient(ingredientsArray)

        const newRecipeObj = {
            title: newRecipeTitle,
            source_url: newRecipeSourceUrl,
            image_url: newRecipeImgUrl,
            publisher: newRecipePublisher,
            cooking_time: newRecipeCookingTime,
            servings: newRecipeServings,
            ingredients: ingObjs
        }

        if (newRecipeObj.ingredients.length > 0) {
            uploadNewRecipe(newRecipeObj)
        }
    }


    const createIngredientObj = (ing) => {
        const splittedIng = ing.split(',')

        const ingObj = {
            quantity: splittedIng[0],
            unit: splittedIng[1],
            description: splittedIng[2]
        }

        console.log(ingObj)

        return ingObj;
    }

    async function addNewIngredient(recipeIngs) {
        const ingObjs = recipeIngs.map(recipeIng => createIngredientObj(recipeIng))
        console.log("ingredients objects :", ingObjs)
        return ingObjs;
    }

    function uploadNewRecipe(newRecipeObj) {
        fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/?&key=${key}`, {
            method: 'POST',
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(newRecipeObj)
        }).then(res => res.json())
            .then(result => {
                console.log(result)
                props.setShowAddRecipeModal(false)
            })
    }

    return (
        <Modal
            show={props.showAddRecipeModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onClick={() => props.setShowAddRecipeModal(false)}>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-6'>
                        <h2 className='recipe-modal-title'>RECIPE DATA</h2>
                        <div className='input-group'>
                            <label>Title</label>
                            <input type="text" placeholder='enter the title...' value={newRecipeTitle} onChange={event => setNewRecipeTitle(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>URL</label>
                            <input type="text" placeholder='enter the recipe url...' value={newRecipeSourceUrl} onChange={event => setNewRecipeSourceUrl(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Image URL</label>
                            <input type="text" placeholder='enter the recipe image url...' value={newRecipeImgUrl} onChange={event => setNewRecipeImgUrl(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Publisher</label>
                            <input type="text" placeholder='enter the recipe publisher...' value={newRecipePublisher} onChange={event => setNewRecipePublisher(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Prep time</label>
                            <input type="text" placeholder='enter the recipe cooking time...' value={newRecipeCookingTime} onChange={event => setNewRecipeCookingTime(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Servings</label>
                            <input type="text" placeholder='enter the recipe servings...' value={newRecipeServings} onChange={event => setNewRecipeServings(event.target.value)} />
                        </div>
                    </div>
                    <div className='col-6'>
                        <h2 className='recipe-modal-title'>INGREDIENTS</h2>
                        <div className='input-group'>
                            <label>Ingredient 1</label>
                            <input type="text" placeholder='quantity,unit,description...' value={newRecipeIngredient1} onChange={event => setNewRecipeIngredient1(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Ingredient 2</label>
                            <input type="text" placeholder='quantity,unit,description...' value={newRecipeIngredient2} onChange={event => setNewRecipeIngredient2(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Ingredient 3</label>
                            <input type="text" placeholder='quantity,unit,description...' value={newRecipeIngredient3} onChange={event => setNewRecipeIngredient3(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Ingredient 4</label>
                            <input type="text" placeholder='quantity,unit,description...' value={newRecipeIngredient4} onChange={event => setNewRecipeIngredient4(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Ingredient 5</label>
                            <input type="text" placeholder='quantity,unit,description...' value={newRecipeIngredient5} onChange={event => setNewRecipeIngredient5(event.target.value)} />
                        </div>
                        <div className='input-group'>
                            <label>Ingredient 6</label>
                            <input type="text" placeholder='quantity,unit,description...' value={newRecipeIngredient6} onChange={event => setNewRecipeIngredient6(event.target.value)} />
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={createNewRecipe}>Create Recipe</Button>
            </Modal.Footer>
        </Modal>
    );
}
