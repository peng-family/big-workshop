const getCollection = () => {
  console.log("getCollection");
  const req = new XMLHttpRequest();
  req.open(
    "GET",
    "https://ipfs.io/ipfs/QmcEgLN4B43ZLL2QwQbsmWJGS6TZEwHP6ju3zKEocg5uh8"
  );
  req.onload = (result) => {
    console.log("yo");
    console.log(req.response);
  };
  req.onerror = (err) => {
    console.log("ya");
    console.error(err);
  };
  req.send();
  console.log("bonjour");
};
