import userRepo from "./user/userRepo";

const seedData = async () => {
  const userSeedDataCount = await userRepo.count({ deletedAt: null });

  if (!userSeedDataCount) {
    console.log("||  User Data is Seeding  ||");
    await userRepo.create({
      name: "Shubhangi",
    }, { deletedAt: 0 });
    console.log("||  User Data seed successfully  ||");
  } else {
    console.log("||  User Data already seeded  ||");
  }
};
export default seedData;
