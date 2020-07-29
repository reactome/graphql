const initializeDatabase = (driver) => {
  // const initCypher = `CALL apoc.schema.assert({}, {User: ["userId"], Business: ["businessId"], Review: ["reviewId"], Category: ["name"]})`
  // const initCypher = null;

  const executeQuery = (driver) => {
    const session = driver.session();
    return session
      .writeTransaction((tx) => tx.run())
      .then()
      .finally(() => session.close());
  };

  // executeQuery(driver).catch((error) => {
  //   console.error(
  //     "Database initialization failed to complete\n",
  //     error.message
  //   );
  // });
};

export default initializeDatabase;
