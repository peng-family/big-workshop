const buildImage = async () => {
  const nftIds = getQueryVariable("gen0");

  if (nftIds.length) {
    nftIds.forEach(async (id) => {
      const tmpUrl = id.substring("ipfs://".length)
      const ipfsUrl = "https://ipfs.io/ipfs/".concat(tmpUrl); 
      getMetaData(ipfsUrl, (metadata) => {
        const imgElement = buildImgElement(metadata.image, id);
        const idNftElement = buildIdNftElement(metadata.tokenId);
        const imgContainer = buildImgContainer(idNftElement, metadata.tokenId);

        imgContainer.appendChild(imgElement);
        imgContainer.onclick = () => {
          buildSummary(metadata, imgContainer);
        }  
        document.getElementById("content").appendChild(imgContainer);
      });
    });
  }
};

const getMetaData = (id, cb) => {
  const req = new XMLHttpRequest();
  req.open("GET", id);
  req.onload = () => {
    cb(JSON.parse(req.response));
  };
  req.onerror = (err) => {
    console.error(err);
  };
  req.send();
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
    "width: 20vw; height: auto; min-height: 20vw;  padding: 5px; margin-bottom: 25px; position: relative; cursor: pointer;";
  imgContainer.appendChild(idNftElement);
  return imgContainer;
};

const buildSummary = (metadata, imgContainer) => {
  const backContainer = document.createElement("div");
  backContainer.style = "width: 100%;";
  const backLabel = document.createElement("h3");
  backLabel.textContent = "< back to the list";
  backContainer.appendChild(backLabel);

  const cloneImgContainer = imgContainer.cloneNode(true);
  cloneImgContainer.classList.add("portrait");

  const summary = document.getElementById("summary");
  // summary.appendChild(backContainer);
  const summaryPortrait = document.getElementById("summaryportrait");

  const metadatas = document.getElementById("metadatas");
  const contents = document.getElementById("content");

  Object.values(metadata.attributes).forEach((meta) => {
    const infoContainer = buildInfoContainer(meta.value, meta.trait_type);
    metadatas.appendChild(infoContainer);
  });

  summaryPortrait.appendChild(cloneImgContainer);
  summary.classList.remove("hidden");
  contents.classList.add("hidden");
};

const leaveSummary = () => {
  const summary = document.getElementById("summary");
  const contents = document.getElementById("content");
  const summaryPortrait = document.getElementById("summaryportrait");
  const metadatas = document.getElementById("metadatas");

  metadatas.innerHTML = "";
  summaryPortrait.innerHTML = "";
  summary.classList.add("hidden");
  contents.classList.remove("hidden");
};

const buildInfoContainer = (metaInfo, metaTitle) => {
  const info = document.createElement("div");
  info.style =
    "background-color: #ffffff; border-radius: 4px; color: initial; padding: 10px; margin: 20px; width: 40%";
  const title = document.createElement("h2");
  title.textContent = metaTitle;
  title.style = "text-transform: capitalize;";
  const content = document.createElement("h4");
  content.style = "text-transform: capitalize;";
  content.textContent = metaInfo;
  info.appendChild(title);
  info.appendChild(content);
  return info;
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
      return nfts[0] !== "" ? nfts : [];
    }
  }
  console.log("Query variable %s not found", variable);
};
