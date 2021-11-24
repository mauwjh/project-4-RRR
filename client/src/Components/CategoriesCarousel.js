import { Link } from "react-router-dom";

const CategoriesCarousel = ({ data, cols }) => {
  let sortedData = [];

  for (let i = 0; i < data?.length; i++) {
    if ((i + 1) % cols === 0) {
      let tempArr = [];
      for (let j = i - (cols - 1); j <= i; j++) {
        tempArr.push(data[j]);
      }
      sortedData = [...sortedData, tempArr];
      tempArr = [];
    }
  }

  if(data.length % cols > 0) {
    sortedData = [...sortedData, data.slice((data.length - (data.length % cols)), data.length)]
  }

  console.log(sortedData);

  return (
    <section class="pt-1 pb-1 mb-3 d-none d-md-flex" style={{minHeight: '170px'}}>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <h2 class="mb-5">Categories </h2>
          </div>
          <div class="col-1">
          <a
              class="btn mb-3 "
              href={`#categories`}
              role="button"
              data-slide="prev"
              style={{ boxShadow: "none", outline: "none", color:'grey' }}
            >
              <i class="fa fa-arrow-left"></i>
            </a>
          </div>
          <div class="col-10">
            <div
              id="categories"
              class="carousel slide"
              data-interval="false"
              data-ride="carousel"
            >
              <div class="carousel-inner">
                {sortedData.map((a, i) => (
                  <div class={`carousel-item ${i === 0 ? "active" : null}`}>
                    <div class="row">
                      {sortedData[i].map((a) => (
                        <div class={`col-md-2 mb-4 text-center`}><Link to={`/listings/${a.name}/${a.id}`}><span  style={{color: 'black'}}>{a.name}</span></Link></div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div class="col-1">
            <a
              class="btn mb-3"
              href={`#categories`}
              role="button"
              data-slide="next"
              style={{ boxShadow: "none", outline: "none", color:'grey'  }}
            >
              <i class="fa fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesCarousel;
