const users = [
  {
    name: 'Cyber Gênios',
    phone: '3412345678',
    email: 'admin@cybergenios.com.br',
    password: '$2y$10$maEbo/EHHN6WGBttA3aIy.nmmBCs5E7gBB.vRcu1x/RbAXrXE47Lu', // cybergenios
    cpf: '123456789',
    address: 'Avenida Dois, 123',
    role: 'admin',
  },
  {
    name: 'Fulano de Tal',
    phone: '3487654321',
    email: 'fulano@cybergenios.com.br',
    password: '$2y$10$5ViEN3bKxRGp1ASGaz3CnODDNkXfM5V3DiQWmUjGooV/qnvlu0NYy', // fulano
    cpf: '987654321',
    address: 'Avenida Dois, 123',
    role: 'customer',
  },
];

const cars = [
  {
    name: 'Golf',
    brand: 'VolksWagen',
    model: 'GTI',
    year: '2014',
  },
  {
    name: 'Saveiro',
    brand: 'VolksWagen',
    model: 'Surf',
    year: '2009',
  },
  {
    name: 'Camaro',
    brand: 'Chevrolet',
    model: 'ZL1',
    year: '2018',
  },
  {
    name: 'R8',
    brand: 'Audi',
    model: 'Spyder',
    year: '2011',
  },
];

module.exports = {
  users,
  cars,
};
