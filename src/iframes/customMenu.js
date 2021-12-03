console.log("HELOOOOOO", window);
// console.log("simpleWeb3", simpleWeb3);

const buildImage = async () => {
  console.log("buildImage");
  const nftIds = getQueryVariable("gen0");
  console.log(nftIds);
  const nftUrl = getQueryVariable("nftUrl");
  const nftUrls = nftIds.map((id) => {
    console.log(nftUrl);
    console.log(id);
    return nftUrl[0].concat(id).concat(".png");
  });

  nftIds.forEach(async (id) => {
    const url = nftUrl[0].concat(id).concat(".png");
    const imgContainer = document.createElement("div");
    const idNft = document.createElement("div");
    idNft.textContent = `${id}.`;
    idNft.style = "position: absolute; top: 10px; left: 16px;";
    const img = document.createElement("img");
    img.src = url;
    img.style = "height: 100%; width: 100%;";
    img.id = `nft-${id}`;
    imgContainer.className = "background--custom";
    imgContainer.style =
      "width: 20vw; height: auto; min-height: 20vw;  padding: 5px; margin-bottom: 25px; position: relative;";
    imgContainer.appendChild(idNft);
    document
      .getElementById("content")
      .appendChild(imgContainer)
      .appendChild(img);
  });
};

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) == variable) {
      const nftsString = decodeURIComponent(pair[1]);
      const nfts = nftsString.split(",");
      return nfts;
    }
  }
  console.log("Query variable %s not found", variable);
}
