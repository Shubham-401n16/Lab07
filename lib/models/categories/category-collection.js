'use strict';

const DataModel = require('../memory-data-model.js');

class Category extends DataModel {
    constructor() {
        super();
        this.schema ={
            id: { type: 'string', required: true },
            name: { type: 'string', required: true },
            display_name:{type: 'string'},
            description:{type:'string'}
        };
    }
}

module.exports = new Category();