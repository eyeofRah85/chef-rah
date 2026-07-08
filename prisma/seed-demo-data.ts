import { prisma } from "./script-prisma";

async function seedDemoUser() {
  const user = await prisma.user.upsert({
    where: {
      email: "demo.customer@example.com",
    },
    update: {
      name: "Demo Customer",
      phone: "404-555-0147",
      addressLine1: "123 Demo Street",
      addressLine2: "Apt 2",
      city: "Atlanta",
      state: "GA",
      postalCode: "30301",
      deliveryNotes: "Demo delivery instructions.",
      role: "CUSTOMER",
    },
    create: {
      name: "Demo Customer",
      email: "demo.customer@example.com",
      phone: "404-555-0147",
      addressLine1: "123 Demo Street",
      addressLine2: "Apt 2",
      city: "Atlanta",
      state: "GA",
      postalCode: "30301",
      deliveryNotes: "Demo delivery instructions.",
      role: "CUSTOMER",
    },
  });

  console.log(`Demo user ready: ${user.email}`);

  return user;
}

async function upsertCategory(name: string, sortOrder: number) {
  return prisma.menuCategory.upsert({
    where: {
      name,
    },
    update: {
      sortOrder,
    },
    create: {
      name,
      sortOrder,
    },
  });
}

async function upsertMenuItem(input: {
  name: string;
  description: string;
  price: string;
  type:
    | "PLATE"
    | "A_LA_CARTE"
    | "MEAL_PLAN"
    | "CATERING"
    | "DESSERT"
    | "SIDE"
    | "OTHER";
  categoryId: string;
  requiresApproval?: boolean;
  customerInstructionsEnabled?: boolean;
}) {
  const existing = await prisma.menuItem.findFirst({
    where: {
      name: input.name,
    },
    select: {
      id: true,
    },
  });

  if (existing) {
    await prisma.menuItemOptionGroup.deleteMany({
      where: {
        menuItemId: existing.id,
      },
    });

    return prisma.menuItem.update({
      where: {
        id: existing.id,
      },
      data: {
        description: input.description,
        price: input.price,
        type: input.type,
        categoryId: input.categoryId,
        available: true,
        archived: false,
        requiresApproval: input.requiresApproval ?? false,
        customerInstructionsEnabled:
          input.customerInstructionsEnabled ?? true,
      },
    });
  }

  return prisma.menuItem.create({
    data: {
      name: input.name,
      description: input.description,
      price: input.price,
      type: input.type,
      categoryId: input.categoryId,
      available: true,
      archived: false,
      requiresApproval: input.requiresApproval ?? false,
      customerInstructionsEnabled: input.customerInstructionsEnabled ?? true,
    },
  });
}

async function seedDemoMenuItems() {
  const mealPlans = await upsertCategory("Meal Plans", 1);
  await seedWeeklyMealPlans();
  const aLaCarte = await upsertCategory("A La Carte", 3);
  const catering = await upsertCategory("Catering", 4);
  const sides = await upsertCategory("Sides", 5);
  const desserts = await upsertCategory("Desserts", 6);

  const fiveDayPlan = await upsertMenuItem({
    name: "5-Day Balanced Meal Plan",
    description:
      "Ten prepared meals with lunch and dinner portions for five days.",
    price: "165.00",
    type: "MEAL_PLAN",
    categoryId: mealPlans.id,
    customerInstructionsEnabled: true,
  });

  await prisma.menuItemOptionGroup.create({
    data: {
      menuItemId: fiveDayPlan.id,
      name: "Protein Preference",
      required: true,
      multiple: true,
      choices: {
        create: [
          {
            name: "Chicken",
            priceDelta: "0.00",
            description: "Standard lean protein option.",
          },
          {
            name: "Turkey",
            priceDelta: "0.00",
            description: "Standard lean protein option.",
          },
          {
            name: "Fish",
            priceDelta: "10.00",
            description: "Seafood-based protein option.",
          },
          {
            name: "Beef",
            priceDelta: "18.00",
            description:
              "Available by request only. Not included in standard meal plans.",
            requestOnly: true,
          },
          {
            name: "Pork",
            priceDelta: "18.00",
            description:
              "Available by request only. Not included in standard meal plans.",
            requestOnly: true,
          },
        ],
      },
    },
  });

  await prisma.menuItemOptionGroup.create({
    data: {
      menuItemId: fiveDayPlan.id,
      name: "Meal Plan Style",
      required: true,
      multiple: false,
      choices: {
        create: [
          {
            name: "Balanced",
            priceDelta: "0.00",
          },
          {
            name: "Low Carb",
            priceDelta: "8.00",
          },
          {
            name: "Pescatarian",
            priceDelta: "15.00",
            requestOnly: true,
          },
        ],
      },
    },
  });

  await upsertMenuItem({
    name: "7-Day Family Meal Plan",
    description:
      "Fourteen prepared meals with lunch and dinner portions for seven days.",
    price: "225.00",
    type: "MEAL_PLAN",
    categoryId: mealPlans.id,
    customerInstructionsEnabled: true,
  });

  await upsertMenuItem({
    name: "Custom Wellness Meal Plan",
    description:
      "A customized meal plan request for dietary goals, substitutions, or special preferences.",
    price: "195.00",
    type: "MEAL_PLAN",
    categoryId: mealPlans.id,
    requiresApproval: true,
    customerInstructionsEnabled: true,
  });

  await upsertMenuItem({
    name: "Blackened Salmon Bowl",
    description:
      "Blackened salmon with seasonal vegetables and a healthy starch.",
    price: "18.00",
    type: "A_LA_CARTE",
    categoryId: aLaCarte.id,
  });

  await upsertMenuItem({
    name: "Jerk Chicken Plate",
    description:
      "Seasoned jerk chicken with vegetables and rice or another available starch.",
    price: "16.00",
    type: "A_LA_CARTE",
    categoryId: aLaCarte.id,
  });

  await upsertMenuItem({
    name: "Turkey Meatball Bowl",
    description:
      "Turkey meatballs served with vegetables and a healthy starch.",
    price: "15.00",
    type: "A_LA_CARTE",
    categoryId: aLaCarte.id,
  });

  await upsertMenuItem({
    name: "Catering Consultation",
    description:
      "A consultation placeholder for catering menu planning and quote requests.",
    price: "0.00",
    type: "CATERING",
    categoryId: catering.id,
    requiresApproval: true,
  });

  await upsertMenuItem({
    name: "Garlic Green Beans",
    description: "Seasoned green beans prepared as a side option.",
    price: "6.00",
    type: "SIDE",
    categoryId: sides.id,
  });

  await upsertMenuItem({
    name: "Mini Dessert Cups",
    description: "Assorted dessert cups for events or add-on orders.",
    price: "24.00",
    type: "DESSERT",
    categoryId: desserts.id,
  });

  console.log("Demo menu items ready.");

  return {
    fiveDayPlan,
  };
}

async function seedWeeklyMealPlans() {
  const now = new Date();

  const startDate = new Date(now);
  startDate.setDate(now.getDate() + 7);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + 6);
  endDate.setHours(23, 59, 59, 999);

  const orderCutoffAt = new Date(startDate);
  orderCutoffAt.setDate(startDate.getDate() - 3);
  orderCutoffAt.setHours(17, 0, 0, 0);

  const existingPeriod = await prisma.weeklyMenuPeriod.findFirst({
    where: {
      label: "Demo Weekly Menu",
    },
    select: {
      id: true,
    },
  });

  const period = existingPeriod
    ? await prisma.weeklyMenuPeriod.update({
        where: {
          id: existingPeriod.id,
        },
        data: {
          startDate,
          endDate,
          orderCutoffAt,
          fulfillmentNotes:
            "Demo weekly menu for testing package and offering selection.",
          status: "PUBLISHED",
          capacity: 25,
          ordersPlaced: 0,
        },
      })
    : await prisma.weeklyMenuPeriod.create({
        data: {
          label: "Demo Weekly Menu",
          startDate,
          endDate,
          orderCutoffAt,
          fulfillmentNotes:
            "Demo weekly menu for testing package and offering selection.",
          status: "PUBLISHED",
          capacity: 25,
          ordersPlaced: 0,
        },
      });

  await prisma.weeklyMealPlanAllowedOption.deleteMany({
    where: {
      offering: {
        periodId: period.id,
      },
    },
  });

  await prisma.allergenWeeklyMealPlanOffering.deleteMany({
    where: {
      offering: {
        periodId: period.id,
      },
    },
  });

  await prisma.weeklyMealPlanOffering.deleteMany({
    where: {
      periodId: period.id,
    },
  });

  await prisma.weeklyMealPlanPackage.deleteMany({
    where: {
      periodId: period.id,
    },
  });

  await prisma.weeklyMealPlanPackage.createMany({
    data: [
      {
        periodId: period.id,
        name: "5-Day / 2 Meals Per Day",
        days: 5,
        mealsPerDay: 2,
        price: "165.00",
        available: true,
        displayOrder: 1,
        notes: "Ten meals total.",
      },
      {
        periodId: period.id,
        name: "7-Day / 2 Meals Per Day",
        days: 7,
        mealsPerDay: 2,
        price: "225.00",
        available: true,
        displayOrder: 2,
        notes: "Fourteen meals total.",
      },
      {
        periodId: period.id,
        name: "5-Day / 3 Meals Per Day",
        days: 5,
        mealsPerDay: 3,
        price: "240.00",
        available: true,
        displayOrder: 3,
        notes: "Fifteen meals total.",
      },
    ],
  });

  const offerings = [
    {
      name: "Island Chicken Meal Prep",
      description:
        "Jerk-inspired chicken with vegetables and rice or sweet potato.",
      dietaryInfo: "Dairy-free option available.",
      displayOrder: 1,
    },
    {
      name: "Salmon Wellness Meal Prep",
      description:
        "Salmon-focused weekly prep with vegetables and healthy starches.",
      dietaryInfo: "Pescatarian-friendly.",
      displayOrder: 2,
    },
    {
      name: "Turkey Power Bowl Prep",
      description:
        "Turkey-based prep bowls with vegetables and balanced starch portions.",
      dietaryInfo: "High-protein option.",
      displayOrder: 3,
    },
  ];

  for (const offeringData of offerings) {
    const offering = await prisma.weeklyMealPlanOffering.create({
      data: {
        periodId: period.id,
        name: offeringData.name,
        description: offeringData.description,
        dietaryInfo: offeringData.dietaryInfo,
        available: true,
        displayOrder: offeringData.displayOrder,
      },
    });

    await prisma.weeklyMealPlanAllowedOption.createMany({
      data: [
        {
          offeringId: offering.id,
          optionType: "SPICE_LEVEL",
          name: "Mild",
          priceDelta: "0.00",
          available: true,
          displayOrder: 1,
        },
        {
          offeringId: offering.id,
          optionType: "SPICE_LEVEL",
          name: "Medium",
          priceDelta: "0.00",
          available: true,
          displayOrder: 2,
        },
        {
          offeringId: offering.id,
          optionType: "SPICE_LEVEL",
          name: "Hot",
          priceDelta: "0.00",
          available: true,
          displayOrder: 3,
        },
        {
          offeringId: offering.id,
          optionType: "PROTEIN_SUBSTITUTION",
          name: "No substitution",
          priceDelta: "0.00",
          available: true,
          displayOrder: 1,
        },
        {
          offeringId: offering.id,
          optionType: "PROTEIN_SUBSTITUTION",
          name: "Extra 3oz Protein",
          priceDelta: "2.00",
          available: true,
          displayOrder: 2,
        },
        {
          offeringId: offering.id,
          optionType: "PROTEIN_SUBSTITUTION",
          name: "Extra 5oz Seafood",
          priceDelta: "4.50",
          available: true,
          displayOrder: 3,
        },
        {
          offeringId: offering.id,
          optionType: "PROTEIN_SUBSTITUTION",
          name: "Beef Request",
          description:
            "Available by request only. Not included in standard meal plans.",
          priceDelta: "0.00",
          requestOnly: true,
          requiresApproval: true,
          available: true,
          displayOrder: 4,
        },
      ],
    });
  }

  console.log("Demo weekly meal plans ready.");

  return period;
}

async function main() {
  await seedDemoUser();
  await seedDemoMenuItems();
  await seedWeeklyMealPlans();

  const weeklyPeriodCount = await prisma.weeklyMenuPeriod.count();
  const weeklyPackageCount = await prisma.weeklyMealPlanPackage.count();
  const weeklyOfferingCount = await prisma.weeklyMealPlanOffering.count();

  console.log({
    weeklyPeriodCount,
    weeklyPackageCount,
    weeklyOfferingCount,
  });

  console.log("Demo data foundation seeded.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });