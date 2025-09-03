<template>
<section class="wrapper bg-light">
  <div class="container pt-12 pt-lg-8 pb-14 pb-md-16">
    <div class="row gx-lg-8 gx-xl-12 gy-10 gy-lg-0 mb-11">
      <div class="col-lg-4 text-center text-lg-start">
        <h2 class="fs-16 text-uppercase text-primary mb-3">Company Facts</h2>
        <h3 class="display-3 mb-4 pe-xxl-5">We are proud of our design team</h3>
        <p class="mb-0 pe-xxl-11">Just sit back and relax while we take care of your business needs for you.</p>
      </div>
      <div class="col-lg-8 mt-lg-2">
        <div class="row align-items-center counter-wrapper gy-6 text-center">
          <div class="col-md-4">
            <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4"> <i class="uil uil-presentation-check"></i> </div>
            <h3 class="counter">1000+</h3>
            <p>Completed Projects</p>
          </div>
          <div class="col-md-4">
            <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4"> <i class="uil uil-user-check"></i> </div>
            <h3 class="counter">50K+</h3>
            <p>Happy Customers</p>
          </div>
          <div class="col-md-4">
            <div class="icon btn btn-circle btn-lg btn-soft-primary pe-none mb-4"> <i class="uil uil-trophy"></i> </div>
            <h3 class="counter">20+</h3>
            <p>Awards Won</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row grid-view gy-6 gy-xl-0">
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-lg">
          <div class="card-body">
            <img class="rounded-circle w-15 mb-4" src="@/assets/img/avatars/te1.jpg" srcset="@/assets/img/avatars/te1@2x.jpg 2x" alt="" />
            <h4 class="mb-1">Coriss Ambady</h4>
            <div class="meta mb-2">Financial Analyst</div>
            <p class="mb-2">Fermentum massa justo sit amet risus morbi leo.</p>
            <nav class="nav social mb-0">
              <a href="#"><i class="uil uil-twitter"></i></a>
              <a href="#"><i class="uil uil-facebook-f"></i></a>
              <a href="#"><i class="uil uil-dribbble"></i></a>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-lg">
          <div class="card-body">
            <img class="rounded-circle w-15 mb-4" src="@/assets/img/avatars/te2.jpg" srcset="@/assets/img/avatars/te2@2x.jpg 2x" alt="" />
            <h4 class="mb-1">Cory Zamora</h4>
            <div class="meta mb-2">Marketing Specialist</div>
            <p class="mb-2">Fermentum massa justo sit amet risus morbi leo.</p>
            <nav class="nav social mb-0">
              <a href="#"><i class="uil uil-twitter"></i></a>
              <a href="#"><i class="uil uil-facebook-f"></i></a>
              <a href="#"><i class="uil uil-dribbble"></i></a>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-lg">
          <div class="card-body">
            <img class="rounded-circle w-15 mb-4" src="@/assets/img/avatars/te3.jpg" srcset="@/assets/img/avatars/te3@2x.jpg 2x" alt="" />
            <h4 class="mb-1">Nikolas Brooten</h4>
            <div class="meta mb-2">Sales Manager</div>
            <p class="mb-2">Fermentum massa justo sit amet risus morbi leo.</p>
            <nav class="nav social mb-0">
              <a href="#"><i class="uil uil-twitter"></i></a>
              <a href="#"><i class="uil uil-facebook-f"></i></a>
              <a href="#"><i class="uil uil-dribbble"></i></a>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-xl-3">
        <div class="card shadow-lg">
          <div class="card-body">
            <img class="rounded-circle w-15 mb-4" src="@/assets/img/avatars/te4.jpg" srcset="@/assets/img/avatars/te4@2x.jpg 2x" alt="" />
            <h4 class="mb-1">Jackie Sanders</h4>
            <div class="meta mb-2">Investment Planner</div>
            <p class="mb-2">Fermentum massa justo sit amet risus morbi leo.</p>
            <nav class="nav social mb-0">
              <a href="#"><i class="uil uil-twitter"></i></a>
              <a href="#"><i class="uil uil-facebook-f"></i></a>
              <a href="#"><i class="uil uil-dribbble"></i></a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
</template>

<script setup lang="ts">
defineOptions({ name: 'TeamSection' })
</script>
