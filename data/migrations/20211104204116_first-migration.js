
exports.up = function(knex) {
    return knex.schema
    .createTable('recipes', table => {
        table.increments('recipe_id')
        table.string('recipe_name', 128)
        .notNullable()
        table.integer('step_id')
            .unsigned()
            .notNullable()
            .references('step_id')
            .inTable('steps')
            .onDelete("RESTRICT")
            .onUpdate("RESTRICT")
    })
    .createTable('steps', table => {
        table.increments('step_id')
        table.integer('step_number')
        table.string('step_instructions', 128)
        .notNullable()
    })
    .createTable('ingredients', table => {
        table.increments('ingredient_id')
    })
    .createTable('quantities', table => {
        table.increments('quantity_id')
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('quantities')
    .dropTableIfExists('ingredients')
    .dropTableIfExists('steps')
    .dropTableIfExists('recipes')
};
