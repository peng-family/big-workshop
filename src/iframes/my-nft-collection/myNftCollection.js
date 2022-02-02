const buildImage = async () => {
  window.parent[0].pengFam.player.penguins
    .sort((a, b) => compareToSort(a.metadata.tokenId, b.metadata.tokenId))
    .forEach((peng) => {
      const { htmlElement } = generatePenguinNFTFromPeng(peng);
      document.getElementById("content").appendChild(htmlElement);
    });
};
