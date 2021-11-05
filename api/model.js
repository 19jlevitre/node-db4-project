const db = require('../data/db-config.js');

module.exports = {
    findById,
}

async function findById(id) {
    const rows = await db('recipes as r')
    .leftJoin('steps as s', 's.recipe_id', 'r.recipe_id')
    .select(
        'r.recipe_id',
        'r.recipe_name',
        's.step_id',
        's.step_number',
        's.step_instructions'
    )
    .where('r.recipe_id', id)

let result = { steps: [] }

for (let step of rows) {
    if(step.step_id) {
        result.steps.push({
            step_id: step.step_id,
            step_number: step.step_number,
            step_instructions: step.step_instructions
        })
    }
}
const more = await db('ingredients as i')
.join('steps as s', 's.step_id', 'i.step_id')
.select(
    'i.ingredient_id',
    'i.ingredient_name',
)

let stuff = { ingredients: [] }

for (let ingredient of result ) {
    if(ingredient.step_id) {
        stuff.ingredients.push({
            ingredient_id: ingredient.ingredient_id,
            ingredient_name: ingredient.ingredient_name
        })
    }
}
return result
}