const { PrismaClient } = require('@prisma/client');
const { users, cars } = require('./data');

const prisma = new PrismaClient();

const load = async () => {
  try {
    users.forEach(async (user) => {
      await prisma.user.create({
        data: user,
      });
    });
    console.log('users seeded');
    cars.forEach(async (car) => {
      await prisma.car.create({
        data: car,
      });
    });
    console.log('cars seeded');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
};
load();
