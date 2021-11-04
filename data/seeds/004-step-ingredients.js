exports.seed = function(knex, Promise) {
    return knex('step_ingredients').insert([
      {step_id: 1, ingredient_id: null, quantity: 0},
      {step_id: 2, ingredient_id: 1, quantity: 1}
    ]);
  };