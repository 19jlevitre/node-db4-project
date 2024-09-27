const db = require('../data/db-config.js');

module.exports = {
    findById,
}

async function findById(id) {
    const rows = await db('recipes as r')
        .leftJoin('steps as s', 's.recipe_id', 'r.recipe_id')
        .leftJoin('step_ingredients as si', 'si.step_id', 's.step_id')
        .leftJoin('ingredients as i', 'i.ingredient_id', 'si.ingredient_id')
        .select(
            'r.recipe_id',
            'r.recipe_name',
            's.step_id',
            's.step_number',
            's.step_instructions',
            'i.ingredient_id',
            'i.ingredient_name',
            'i.ingredient_unit',
            'si.quantity'
        )
        .where('r.recipe_id', id)
    let result = { steps: [] }

    for (let step of rows) {
        if (!result.recipe_id) {
            result.recipe_id = step.recipe_id
            result.recipe_name = step.recipe_name
        }
        if (step.step_id) {
            const stepIndex = result.steps.findIndex(rstep => rstep.step_id === step.step_id)
            const ingredient = {
                ingredient_id: step.ingredient_id,
                ingredient_name: step.ingredient_name,
                quantity: step.quantity,
                measurment_unit: step.ingredient_unit
            }
            console.log(stepIndex)
            console.log(ingredient)
            if (stepIndex > -1) {
                result.steps[stepIndex].ingredients = [...result.steps[stepIndex].ingredients, ingredient]
            } else {
                result.steps.push({
                    step_id: step.step_id,
                    step_number: step.step_number,
                    step_instructions: step.step_instructions,
                    ingredients: !ingredient.ingredient_id ? [] : [ingredient],
                })
            }
        }
    }
    return result
}