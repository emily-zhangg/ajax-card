module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert("users", [
      {
        email: "yiqing@gmail.com",
        password: "12345678",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "jane@gmail.com",
        password: "12345678",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", null, {});
  },
};
