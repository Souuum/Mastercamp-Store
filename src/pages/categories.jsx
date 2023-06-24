import { Routes, Route, useParams } from "react-router-dom"
import RecipeRow from "../components/RecipeRow"
import RecipeRowCard from "../components/RecipeRowCard"
import Page from "../components/page"
import call from "../api/api"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { enqueueSnackbar } from "notistack"

export default function Categories() {
  const [categories, setCategories] = useState([])
  useEffect(() => {
    call({
      entity: "Category",
    })
      .then((response) => response.json())
      .then((json) => setCategories(json))
  }, [])
  return (
    <Page>
      {categories && (
        <RecipeRow title={`All categories`}>
          {!categories && "Loading..."}
          {categories &&
            categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              >
                {category.name}
              </Link>
            ))}
        </RecipeRow>
      )}

      {categories.length == 0 && <RecipeRow title={``}>Loading...</RecipeRow>}
    </Page>
  )
}
