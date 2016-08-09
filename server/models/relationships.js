module.exports = function(m) {
  // Categories
  m.Categories.hasMany(m.Events);

  // for subcategories
  // this will add the attribute sub_cat_id to Categories
  m.Categories.hasMany(m.Categories, {
    as: 'SubCategories',
    foreignKey: 'sub_cat_id'
  });

  // Events
  m.Events.hasMany(m.Rsvp);
  m.Events.hasMany(m.Images);
  m.Events.belongsTo(m.Users);
  m.Events.belongsTo(m.Categories);
  m.Events.hasMany(m.Reviews);

  // Images
  m.Images.belongsTo(m.Users);
  m.Images.belongsTo(m.Events);

  // Messaging
  m.Messages.belongsTo(m.Users);
  m.Messages.belongsTo(m.Users, {
    foreignKey: 'receiver_id'
  });

  // Notifications
  m.Notifications.belongsTo(m.Users);

  // RSVPs
  m.Rsvp.belongsTo(m.Events);
  m.Rsvp.belongsTo(m.Users);

  // Reviews
  m.Reviews.belongsTo(m.Users);
  m.Reviews.belongsTo(m.Events);

  // Users
  m.Users.hasMany(m.Events);
  m.Users.hasMany(m.Images);
  m.Users.hasMany(m.Messages);
  m.Users.hasMany(m.Notifications);
  m.Users.hasMany(m.Rsvp);
  m.Users.hasMany(m.Reviews);
};
