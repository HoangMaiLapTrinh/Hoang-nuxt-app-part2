<template>
<section class="wrapper bg-gradient-reverse-primary">
  <div class="container pb-14 pb-md-16">
    <div class="row gx-lg-8 gx-xl-12 gy-10 align-items-center">
      <div class="col-lg-7">
        <figure><img class="img-auto" src="@/assets/img/illustrations/i22.png" srcset="@/assets/img/illustrations/i22@2x.png 2x" alt="" /></figure>
      </div>
      <div class="col-lg-5">
        <h2 class="fs-15 text-uppercase text-primary mb-3">Why Choose Us?</h2>
        <h3 class="display-3 mb-7">We bring solutions to make life easier.</h3>
        <div class="accordion accordion-wrapper" id="accordionExample">
          <div class="card plain accordion-item">
            <div class="card-header" id="headingOne">
              <button class="accordion-button" style="--bs-accordion-btn-icon:none; --bs-accordion-btn-active-icon:none;" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne"> Professional Design </button>
            </div>
            <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body"><p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.</p></div>
            </div>
          </div>
          <div class="card plain accordion-item">
            <div class="card-header" id="headingTwo">
              <button class="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"> Top-Notch Support </button>
            </div>
            <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div class="card-body"><p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.</p></div>
            </div>
          </div>
          <div class="card plain accordion-item">
            <div class="card-header" id="headingThree">
              <button class="collapsed" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree"> Header and Slider Options </button>
            </div>
            <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div class="card-body"><p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Cras mattis consectetur purus sit amet fermentum. Praesent commodo cursus magna, vel.</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="overflow-hidden">
      <div class="divider text-light mx-n2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100">
          <path fill="currentColor" d="M1260,1.65c-60-5.07-119.82,2.47-179.83,10.13s-120,11.48-180,9.57-120-7.66-180-6.42c-60,1.63-120,11.21-180,16a1129.52,1129.52,0,0,1-180,0c-60-4.78-120-14.36-180-19.14S60,7,30,7H0v93H1440V30.89C1380.07,23.2,1319.93,6.15,1260,1.65Z" />
        </svg>
      </div>
    </div>
</section>
</template>

<script setup lang="ts">
defineOptions({ name: 'SolutionsSection' })
</script>
