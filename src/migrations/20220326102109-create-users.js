module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      lastName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        defaultValue: 'password'
      },
      isVerified: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      lastLogin: {
        allowNull: true,
        type: Sequelize.DATE
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      birthDate: {
        allowNull: true,
        type: Sequelize.DATE
      },
      address: {
        allowNull: true,
        type: Sequelize.STRING
      },
      gender: {
        allowNull: true,
        type: Sequelize.STRING
      },
      phoneNumber: {
        allowNull: true,
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        defaultValue: 'default',
        values: ['super_administrator', 'administrator', 'default']
      },
      profilePicture: {
        type: Sequelize.STRING,
        allowNull: true
      },
      remember: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: true
      },
      createdAt: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }),
  down: (queryInterface) => queryInterface.dropTable('Users')
};
