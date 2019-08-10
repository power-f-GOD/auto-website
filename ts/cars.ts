
function loadCarsPageScript()
{
  document.title = 'Cars | Auto-Web';

  const cars = 
  {
    families: [
      {
        name: 'Kia Wagon',
        children: [
          {
            testID: '01',
            imageSrc: 'soul.jpg',
            name: 'Soul',
            priceInfo: 'Starting at $17,490 MSRP',
            specsLinkText: 'Kia Soul Pro Review & Specs'
          },
          {
            testID: '02',
            imageSrc: 'soul_ev.jpg',
            name: 'Soul EV',
            priceInfo: 'Starting at $33,950 MSRP',
            specsLinkText: 'Kia Soul EV Pricing & Specs'
          }
        ]
      },
      {
        name: 'Kia SUV',
        children: [
          {
            testID: '03',
            imageSrc: 'niro.jpg',
            name: 'Niro',
            priceInfo: 'Starting at $23,490 MSRP',
            specsLinkText: 'Kia Niro Pro Review & Specs'
          },
          {
            testID: '04',
            imageSrc: 'sportage.jpg',
            name: 'Sportage',
            priceInfo: 'Starting at $23,990 MSRP',
            specsLinkText: 'Kia Sportage Pro Review & Specs'
          },
          {
            testID: '05',
            imageSrc: 'telluride.jpg',
            name: 'Telluride',
            priceInfo: 'Starting at $31,690 MSRP',
            specsLinkText: 'Kia Telluride Pro Review & Specs'
          },
          {
            testID: '06',
            imageSrc: 'niro_ev.jpg',
            name: 'Niro EV',
            priceInfo: 'Starting at $38,500 MSRP',
            specsLinkText: 'Kia Niro EV Pricing & Specs'
          },
        ]
      },
      {
        name: 'Kia Sedan',
        children: [
          {
            testID: '07',
            imageSrc: 'rio.jpg',
            name: 'Rio',
            priceInfo: 'Starting at $15,390 MSRP',
            specsLinkText: 'Kia Rio Pro Review & Specs'
          },
          {
            testID: '08',
            imageSrc: 'forte.jpg',
            name: 'Forte',
            priceInfo: 'Starting at $17,790 MSRP',
            specsLinkText: 'Kia Forte Pro Review & Specs'
          },
          {
            testID: '09',
            imageSrc: 'forte5.jpg',
            name: 'Forte5',
            priceInfo: 'Starting at $18,300 MSRP',
            specsLinkText: 'Kia Forte5 Pricing & Specs'
          },
          {
            testID: '10',
            imageSrc: 'optima_hybrid.jpg',
            name: 'Optima Hybrid',
            priceInfo: 'Starting at $29,310 MSRP',
            specsLinkText: 'Kia Optima Hybrid Pricing & Specs'
          },
          {
            testID: '11',
            imageSrc: 'stinger.jpg',
            name: 'Stinger',
            priceInfo: 'Starting at $32,990 MSRP',
            specsLinkText: 'Kia Stinger Pro Review & Specs'
          },
          {
            testID: '12',
            imageSrc: 'cadenza.jpg',
            name: 'Cadenza',
            priceInfo: 'Starting at $33,100 MSRP',
            specsLinkText: 'Kia Cadenza Pricing & Specs'
          }
        ]
      },
      {
        name: 'Kia Minivan',
        children: [
          {
            testID: '13',
            imageSrc: 'sedona.jpg',
            name: 'Sedona',
            priceInfo: 'Starting at $27,200 MSRP',
            specsLinkText: 'Kia Sedona Pro Review & Specs'
          }
        ]
      }
    ]
  };


  let i = 0;
  for (let family of cars.families)
  {
    let carsList = Q('.cars-list-wrapper')!;

    carsList.insertAdjacentHTML('beforeend', 
    ` <div class="pad-y-15px"></div>
      <h3 class="flex-start">
        ${family.name}
        <div class="pad-y-15px"></div>
      </h3>
      <ul class="cars-list d-flex flex-wrap"></ul>
      `.trim());


    setTimeout(() => {
      for (let child of family.children)
      {
        QAll('.cars-list')[i].insertAdjacentHTML('beforeend', 
        `<li data-testid='${child.testID}' class="col-12 col-sm-6 col-md-4 col-lg-3 card-wrapper">
            <div class='card custom-card'>
              <a href="#!">
                <img class="card-img-top car-image" alt="${child.name}" src="images/cars/${child.imageSrc}"/>
              </a>
              <div class="card-body">
                <h5 class="card-title">${child.name}</h5>
                <span class="car-price">${child.priceInfo}</span>
                <a href="#!" class="car-specs-link">${child.specsLinkText}</a>
              </div>
            </div>
            <a tabindex="0" href="#!" class="browse-cars-btn btn btn-primary">Browse Cars</a>
          </li>`.trim());
      }
      i++;
    }, 200)
  }

  console.log("Upload page script deferred and loaded.");
}