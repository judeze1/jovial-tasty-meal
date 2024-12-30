//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch)

let hidden = document.querySelector('.hidden')

function getFetch(){
  hidden.classList.remove('hidden')
  const url = `https://www.themealdb.com/api/json/v1/1/random.php`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        let ulMeasures = document.querySelector('.ulMeasures')
        let ulIngredients = document.querySelector('.ulIngredients')
        ulMeasures.innerHTML = '';
        ulIngredients.innerHTML = '';
        let meals = data.meals[0]
        document.querySelector('h2').innerText = meals.strMeal
        document.querySelector('.cate').innerText = meals.strCategory
        document.querySelector('.area').innerText = meals.strArea
        document.querySelector('.instruction').innerText = meals.strInstructions
        document.querySelector('img').src = meals.strMealThumb
        document.querySelector('.youtube').href = meals.strYoutube
        data.meals.forEach((meal) => {
          const mealEntries = Object.entries(meal),
            ingredientsArray = mealEntries
              .filter(([key, value]) => key.startsWith("strIngredient") && value && value.trim())
              .map(([key, value]) => value),
            measuresArray = mealEntries
              .filter(([key, value]) => key.startsWith("strMeasure") && value && value.trim())
              .map(([key, value]) => value);   
              
              for(let i = 0; i < measuresArray.length; i++){
                let liMeasures = document.createElement('li')

                liMeasures.appendChild(document.createTextNode(measuresArray[i]));
                ulMeasures.appendChild(liMeasures)

              }
              for(let i = 0; i < ingredientsArray.length; i++){
                let liIngredients = document.createElement('li')

                liIngredients.appendChild(document.createTextNode(ingredientsArray[i]));
                ulIngredients.appendChild(liIngredients)

              }
          console.log("Ingredients:", ingredientsArray);
          console.log("Measures:", measuresArray);
        });
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}