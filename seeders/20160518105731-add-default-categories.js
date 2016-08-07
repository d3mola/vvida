(function() {
  'use strict';

  module.exports = {
    up: function(queryInterface) {
      /**
       * Add altering commands here.
       * Return a promise to correctly handle asynchronicity.
       * @param  queryInterface, Sequelize
       */
      return queryInterface.bulkInsert('Categories', [{
        type: 'Item',
        name: 'Office Tools'
      }, {
        type: 'Item',
        name: 'Food'
      }, {
        type: 'Item',
        name: 'Fitness and Health'
      }, {
        type: 'Item',
        name: 'Clothing and Fashion'
      }, {
        type: 'Item',
        name: 'Computers'
      }, {
        type: 'Item',
        name: 'Household Appliances'
      }, {
        type: 'Item',
        name: 'Food'
      }, {
        type: 'Item',
        name: 'Hardware'
      }, {
        type: 'Event',
        name: 'Exhibition and Showcases'
      }, {
        type: 'Event',
        name: 'Concerts'
      }, {
        type: 'Event',
        name: 'Business and Economics'
      }, {
        type: 'Event',
        name: 'Public Holidays'
      }, {
        type: 'Event',
        name: 'Festivals'
      }, {
        type: 'Event',
        name: 'Premieres'
      }, {
        type: 'Event',
        name: 'Inaugurations'
      }], {});
    },

    down: function(queryInterface) {
      /*
        Add reverting commands here.
        Return a promise to correctly handle asynchronicity.
      */

      return queryInterface.bulkDelete('Categories', null, {});
    }
  };

})();
