export const initializeDatabase = (driver) => {
  const initProtein = `match (n:EntityWithAccessionedSequence) set n :Protein`;
  const initReaction = `match (n:ReactionLikeEvent) set n :Reaction`;

  const executeQueryProtein = (driver) => {
    const session = driver.session();
    return session
      .writeTransaction((tx) => tx.run(initProtein))
      .then()
      .finally(() => session.close());
  };

  const executeQueryReaction = (driver) => {
    const session = driver.session();
    return session
      .writeTransaction((tx) => tx.run(initReaction))
      .then()
      .finally(() => session.close());
  };

  executeQueryProtein(driver).catch((error) => {
    console.error(
      "Database initialization failed to complete\n",
      error.message
    );
  });

  executeQueryReaction(driver).catch((error) => {
    console.error(
      "Database initialization failed to complete\n",
      error.message
    );
  });
};
