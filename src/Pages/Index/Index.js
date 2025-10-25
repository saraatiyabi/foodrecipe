import React, { useEffect, useState } from "react";
import "./Index.css";
import FoodRecipes from "./../../Components/FoodRecipes/FoodRecipes";
import RestaurantMenuOutlinedIcon from "@mui/icons-material/RestaurantMenuOutlined";
import EditCalendarOutlinedIcon from "@mui/icons-material/EditCalendarOutlined";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import Loader from "../../Components/Loader/Loader";
import ErrorBox from "../../Components/ErrorBox/ErrorBox";
import AddRecipeModal from "../../Components/AddRecipeModal/AddRecipeModal";
import FoodItem from "../../Components/FoodItem/FoodItem";
import MainFoodRecipe from "../../Components/MainFoodRecipe/MainFoodRecipe";

export default function Index() {
  const [searchedFood, setSearchedFood] = useState("pizza");
  const [recipes, setRecipes] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showAddRecipeModal, setShowAddRecipeModal] = useState(false);
  const [allBookmarks, setAllBookmarks] = useState([]);
  const key = process.env.REACT_APP_FORKIFY_API_KEY;

  function findRecipes() {
    setShowLoader(true);
    setErrorMessage("");
    setRecipes([]);
    fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchedFood}&key=${key}`
    )
      .then((res) => res.json())
      .then((foodData) => {
        console.log(foodData);
        setShowLoader(false);
        if (!foodData.data.recipes.length) {
          setErrorMessage("No recipe found! please try agian later!");
        } else {
          setRecipes(foodData.data.recipes);
        }
      })
      .catch((err) => setErrorMessage(err));
    setSearchedFood("");
  }

  useEffect(() => {
    const bookmarksArray = getBookmarks();
    setAllBookmarks(bookmarksArray);
  }, []);

  useEffect(() => {
    findRecipes();
    if (allBookmarks) {
      localStorage.setItem("bookmarks", JSON.stringify(allBookmarks));
    }
  }, [allBookmarks]);

  // Optional: warn in dev if key is missing
  useEffect(() => {
    if (!key) {
      console.warn("REACT_APP_FORKIFY_API_KEY is missing! Check .env file.");
    }
  }, [key]);

  const getBookmarks = () => {
    const bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    if (!bookmarks) {
      return [];
    } else {
      return bookmarks;
    }
  };

  const deleteBookmark = (recipeID) => {
    const filteredBookmarks = allBookmarks.filter((bookmarkedRecipe) => {
      return bookmarkedRecipe.id !== recipeID;
    });
    setAllBookmarks(filteredBookmarks);
  };

  return (
    <div className="container">
      <div className="food-plaza">
        <div className="food-plaza-header">
          <div className="food-plaza-header-left">
            <div className="food-plaza-icon-container">
              <RestaurantMenuOutlinedIcon className="food-plaza-header-icon" />
            </div>
            <h1>Let's explore new recipes!</h1>
            <div className="search-food">
              <input
                type="text"
                placeholder="what you want to cook..."
                value={searchedFood}
                onChange={(event) => setSearchedFood(event.target.value)}
              />
              <button onClick={findRecipes}>Search</button>
            </div>
          </div>
          <div className="food-plaza-header-right">
            <div
              className="addRecipe"
              onClick={() => setShowAddRecipeModal(true)}
            >
              <EditCalendarOutlinedIcon className="recipe-icon" />
              <span>Add Recipe</span>
            </div>
            <div className="bookmark-recipes">
              <BookmarkBorderOutlinedIcon className="recipe-icon" />
              <span className="bookmarks">Bookmarks</span>
              {allBookmarks.length > 0 ? (
                <ul className="bookmarks-list">
                  {allBookmarks.map((bookmarkedRecipe) => (
                    <div className="bookmark">
                      <FoodItem {...bookmarkedRecipe} />
                      <DeleteIcon
                        className="deleteBookmarkIcon"
                        onClick={() => deleteBookmark(bookmarkedRecipe.id)}
                      />
                    </div>
                  ))}
                </ul>
              ) : (
                <span className="bookmark-message">
                  No bookmarks yet. Find a nice recipe and bookmark it :)
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="row recipe-content-container">
          <div className="col-4 recipes-list-section">
            <div className="recipes-result-section-wrapper">
              {showLoader && <Loader className="text-center" />}
            </div>
            {recipes.length > 0 ? (
              <FoodRecipes recipes={recipes} />
            ) : (
              <>{errorMessage && <ErrorBox />}</>
            )}
          </div>
          <div className="col-8 recipe-info-section">
            {
              <MainFoodRecipe
                bookmarks={allBookmarks}
                setAllBookmarks={setAllBookmarks}
              />
            }
          </div>
        </div>
      </div>
      {showAddRecipeModal && (
        <AddRecipeModal
          showAddRecipeModal={showAddRecipeModal}
          setShowAddRecipeModal={setShowAddRecipeModal}
        />
      )}
    </div>
  );
}
