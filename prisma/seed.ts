import {
  PrismaClient,
  UserPermissionEnum,
  EmployeeOccupationEnum,
  ProductStatusEnum,
  ProductTypeEnum
} from '@prisma/client';
import { hash } from 'bcryptjs';
import * as faker from 'faker';
import { fakeCPFGenerator } from '../src/common/utils';

const prisma = new PrismaClient();

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const main = async () => {
  const password = await hash('12345678', 8);

  const user = await prisma.user.create({
    data: {
      name: 'Luan Verdelho',
      email: 'luanverdelho642@gmail.com',
      password: await hash('9GjbB*mM', 8),
      document: '69403963069',
      permission: 'MASTER',
      birthDate: new Date('2001-09-18'),
      phone: '7920972453'
    }
  });

  const company = await prisma.company.create({
    data: {
      userId: user.id,
      document: '36246992000189',
      name: 'Salone di Belleza',
      corporateName: 'Salao de Beleza Fabiola Fonseca Cabelo & Maquiagem LTDA',
      tradingName: 'Salao de Beleza Isolete'
    }
  });

  await prisma.specialty.createMany({
    data: [
      {
        specialty: 'Cabeleireira'
      },
      {
        specialty: 'Manicure'
      },
      {
        specialty: 'Depiladora'
      },
      {
        specialty: 'Auxiliar/Assistente'
      }
    ]
  });

  const occupations: EmployeeOccupationEnum[] = ['EMPLOYEE', 'MANAGER'];

  const customersData = [...Array(150).keys()].map(_ => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password,
    document: fakeCPFGenerator(),
    phone: faker.phone.phoneNumber('###########')
  }));

  await prisma.user.createMany({
    data: customersData
  });

  const usersEmployeesData = [...Array(26).keys()].map(_ => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    email: faker.internet.email(),
    password,
    permission: UserPermissionEnum.EMPLOYEE,
    document: fakeCPFGenerator(),
    phone: faker.phone.phoneNumber('###########')
  }));

  await prisma.user.createMany({
    data: usersEmployeesData
  });

  const customers = await prisma.user.findMany({
    where: {
      permission: 'CUSTOMER'
    }
  });

  const userEmployees = await prisma.user.findMany({
    where: {
      permission: 'EMPLOYEE'
    }
  });

  const specialties = await prisma.specialty.findMany();

  const employees = userEmployees.map(item => ({
    userId: item.id,
    occupation: occupations[getRandomInt(2)],
    companyId: company.id,
    specialtyId: specialties[getRandomInt(4)].id
  }));

  await prisma.employee.createMany({
    data: employees
  });

  const categoriesData = [
    'Shampoo',
    'Condicionador',
    'Kit tratamento capilar',
    'Artigos de salão de beleza',
    'Nutricosméticos'
  ].map(category => ({
    name: category
  }));

  await prisma.productCategory.createMany({
    data: categoriesData
  });

  const categories = await prisma.productCategory.findMany();

  const productsData = [
    {
      companyId: company.id,
      reference: 'TEST123456',
      name: 'Shampoo Infusion',
      status: ProductStatusEnum.PUBLISHED,
      brand: 'Truss',
      price: 119.9,
      stock: 30,
      type: ProductTypeEnum.UNITY,
      categoryId: categories[0].id
    },
    {
      companyId: company.id,
      reference: 'TEST23432',
      name: 'KIT SEBASTIAN PROFESSIONAL DARK OIL',
      status: ProductStatusEnum.PUBLISHED,
      brand: 'SEBASTIAN',
      price: 336.8,
      stock: 30,
      type: ProductTypeEnum.KIT,
      categoryId: categories[2].id
    },
    {
      companyId: company.id,
      reference: 'TEST56984',
      name: 'Condicionador Nutrição e Brilho Natura Plant',
      status: ProductStatusEnum.PUBLISHED,
      brand: 'Natura',
      price: 150.5,
      stock: 30,
      type: ProductTypeEnum.UNITY,
      categoryId: categories[1].id
    },
    {
      companyId: company.id,
      reference: 'TEST56974',
      name: 'Renova Be Colágeno Verisol® com Ácido Hialurônico Frutado - 3 Potes',
      status: ProductStatusEnum.PUBLISHED,
      brand: 'RENOVA',
      price: 267.7,
      stock: 30,
      type: ProductTypeEnum.KIT,
      categoryId: categories[4].id
    }
  ];

  await prisma.product.createMany({
    data: productsData
  });
};

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect()); // eslint-disable-line
