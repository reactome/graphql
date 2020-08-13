const initializeDatabase = (driver) => {

  const executeQuery = (driver) => {
    const session = driver.session();
    return session
      .writeTransaction((tx) => tx.run())
      .then()
      .finally(() => session.close());
  };
};

export default initializeDatabase;
