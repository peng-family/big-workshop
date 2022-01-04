const buildImage = async () => {
  const accountAddress = getQueryVariable("accounAddress")[0];
  pengFamilyContractERC720.methods
    .tokensByAddress(accountAddress)
    .call()
    .then((nftIds) => {
      const promisesToGenereateNFT = [];
      if (nftIds.length) {
        nftIds.forEach(async (id) => {
          promisesToGenereateNFT.push(generatePenguinNFT(Number(id)));
          Promise.all(promisesToGenereateNFT).then((results) => {
            results.sort((a, b) =>
              compareToSort(a.metadata.tokenId, b.metadata.tokenId)
            );
            results.forEach((result) => {
              document
                .getElementById("content")
                .appendChild(result.htmlElement);
            });
          });
        });
      }
    });
};