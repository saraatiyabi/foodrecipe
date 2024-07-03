import Index from "./Pages/Index/Index";
import MainFoodRecipe from "./Components/MainFoodRecipe/MainFoodRecipe";

const routes = [
    {
        path: "/", element: <Index />, children: [
            { path: "/recipe/:id", element: <MainFoodRecipe /> },
        ]
    }
]

export { routes }