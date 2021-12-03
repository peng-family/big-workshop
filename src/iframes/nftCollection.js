const buildImage = async () => {
  const nftIds = getQueryVariable("gen0");
  const nftUrl = getQueryVariable("nftUrl")[0];

  if (nftIds.length) {
    nftIds.forEach(async (id) => {
      const url = nftUrl.concat(id).concat(".png");
      const imgElement = buildImgElement(url, id);
      const idNftElement = buildIdNftElement(id);
      const imgContainer = buildImgContainer(idNftElement);

      document
        .getElementById("content")
        .appendChild(imgContainer)
        .appendChild(imgElement);
    });
  }
};

const buildIdNftElement = (id) => {
  const idNft = document.createElement("div");
  idNft.textContent = `${id}.`;
  idNft.style = "position: absolute; top: 10px; left: 16px;";
  return idNft;
};

const buildImgContainer = (idNftElement) => {
  const imgContainer = document.createElement("div");
  imgContainer.className = "background--custom";
  imgContainer.style =
    "width: 20vw; height: auto; min-height: 20vw;  padding: 5px; margin-bottom: 25px; position: relative;";
  imgContainer.appendChild(idNftElement);
  return imgContainer;
};

const buildImgElement = (url, id) => {
  const img = document.createElement("img");
  img.src = url;
  img.style = "height: 100%; width: 100%;";
  img.id = `nft-${id}`;
  return img;
};

const getQueryVariable = (variable) => {
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
};
