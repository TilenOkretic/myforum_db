const Knex = require('knex');
const table_names = require('../libs/table_names');

/**
 * 
 * @param {Knex} knex 
 */
exports.up = async (knex) => {
    await Promise.all([
        knex.schema.createTable(table_names.role, (table) => {
            table.increments();
            table.string('name').notNullable();
        }),
        knex.schema.createTable(table_names.user, (table) => {
            table.increments();
            table.integer('role_id').unsigned().index().references('id').inTable(table_names.role);
            table.string('name').notNullable();
            table.string('email').notNullable();
            table.string('google_id').notNullable();
            table.boolean('banned').notNullable().defaultTo(false);
        })
    ]);
};


/**
 * 
 * @param {Knex} knex 
 */
exports.down = async (knex) => {
    await Promise.all([
        knex.schema.dropTable(table_names.role),
        knex.schema.dropTable(table_names.user)
    ]);
};