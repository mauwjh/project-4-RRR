import Card from "./Card";
import { Link } from "react-router-dom";

const Carousel = ({ header, data, cols, likes, setLikes, setData, search }) => {
  let sortedData = [];

  for (let i = 0; i < data?.length; i++) {
    if ((i + 1) % cols === 0) {
        let tempArr = []
        for(let j = i-(cols-1); j <= i; j++) {
            tempArr.push(data[j])
        }
        sortedData = [...sortedData, tempArr];
        tempArr = []
    }
  }

  if(data?.length % cols > 0) {
    sortedData = [...sortedData, data.slice((data.length - (data.length % cols)), data.length)]
  }

  const carouselRows = () => {
    return sortedData.map((a, i) => (
      <div class={`carousel-item ${i === 0 ? "active" : null}`}>
        <div class="row">
          {sortedData[i].map((a) => (
            <div class={`col-lg-${12/cols} mb-4`}>
              <Card data={a} likes={likes} setLikes={setLikes} setData={setData}/>
            </div>
          ))}
        </div>
      </div>
    ));
  };

  return (
    <section class="pt-5 pb-1 mb-4">
      <div class="container">
        <div class="row">
          <div class="col-6">
            <h3 class="mb-3">
              {header}{" "}
              <span
                style={{
                  fontSize: "15px",
                  fontWeight: "normal",
                  marginLeft: "5px",
                }}
              >
                <br />
                <Link to={`/listings/${header}/${search}`} style={{color: '#212529'}}>Discover More {">"}</Link>
              </span>
            </h3>
          </div>
          <div class="col-6 text-right">
            <a
              class="btn btn-primary mb-3 mr-1 "
              href={`#${header}`}
              role="button"
              data-slide="prev"
              style={{ boxShadow: "none", outline: "none" }}
            >
              <i class="fa fa-arrow-left"></i>
            </a>
            <a
              class="btn btn-primary mb-3 "
              href={`#${header}`}
              role="button"
              data-slide="next"
              style={{ boxShadow: "none", outline: "none" }}
            >
              <i class="fa fa-arrow-right"></i>
            </a>
          </div>
          <div class="col-12">
            <div
              id={header}
              class="carousel slide"
              data-interval="false"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                {carouselRows()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
