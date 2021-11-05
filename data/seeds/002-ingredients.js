exports.seed = function(knex, Promise) {
    return knex('ingredients').insert([
    {ingredient_name: 'Olive Oil', ingredient_unit: 'tbsp'},
    {ingredient_name: 'Basil', ingredient_unit: 'leaf'}])
}