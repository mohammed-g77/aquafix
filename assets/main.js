document.addEventListener("DOMContentLoaded", () => {
  const modal = new bootstrap.Modal(document.getElementById("customModal"));
  const modalTitle = document.getElementById("modalTitle");
  const modalContent = document.getElementById("modalContent");
   const customModalEl = document.getElementById("customModal");

  
  document.querySelectorAll(".testimonial-card").forEach(card => {
    card.addEventListener("click", () => {
      modalTitle.textContent = card.getAttribute("data-title");
      modalContent.innerHTML = `<p>${card.getAttribute("data-content")}</p>`;
      modal.show();
    });
  });

 
  document.querySelectorAll(".logo-row img").forEach(logo => {
    logo.addEventListener("click", () => {
      modalTitle.textContent = logo.getAttribute("data-title") || "Logo";
      modalContent.innerHTML = logo.getAttribute("data-content");
      modal.show();
    });
  });


   const testimonialImgs = Array.from(document.querySelectorAll(".testimonial-card img"));
   const logoImgs = Array.from(document.querySelectorAll(".logo-row img"));

   let galleryImages = [];
   let currentIndex = -1;
   let galleryActive = false;

   function renderGalleryImage() {
     if (!galleryActive || currentIndex < 0 || currentIndex >= galleryImages.length) return;
     const src = galleryImages[currentIndex].getAttribute("src");
     const alt = galleryImages[currentIndex].getAttribute("alt") || "Image";
     modalTitle.textContent = alt;
     modalContent.innerHTML = `
       <div class="position-relative">
         <img src="${src}" alt="${alt}" class="img-fluid rounded w-100" />
         <button type="button" class="btn btn-light border position-absolute top-50 start-0 translate-middle-y" id="galleryPrev" aria-label="Previous">
           <i class="bi bi-chevron-left"></i>
         </button>
         <button type="button" class="btn btn-light border position-absolute top-50 end-0 translate-middle-y" id="galleryNext" aria-label="Next">
           <i class="bi bi-chevron-right"></i>
         </button>
       </div>
     `;
    
     const prevBtn = document.getElementById("galleryPrev");
     const nextBtn = document.getElementById("galleryNext");
     if (prevBtn) prevBtn.onclick = prevImage;
     if (nextBtn) nextBtn.onclick = nextImage;
   }

   function nextImage() {
     if (!galleryActive) return;
     currentIndex++;
     if (currentIndex >= galleryImages.length) currentIndex = 0;
     renderGalleryImage();
   }

   function prevImage() {
     if (!galleryActive) return;
     currentIndex--;
     if (currentIndex < 0) currentIndex = galleryImages.length - 1;
     renderGalleryImage();
   }

   function openGallery(imagesNodeList, startEl) {
     galleryImages = Array.from(imagesNodeList);
     currentIndex = Math.max(0, galleryImages.indexOf(startEl));
     galleryActive = true;
     renderGalleryImage();
     modal.show();
   }

   
   testimonialImgs.forEach(img => {
     img.style.cursor = "zoom-in";
     img.addEventListener("click", (e) => {
       e.stopPropagation();
       openGallery(testimonialImgs, img);
     });
   });
   logoImgs.forEach(img => {
     img.style.cursor = "zoom-in";
     img.addEventListener("click", (e) => {
       e.stopPropagation();
       openGallery(logoImgs, img);
     });
   });

   
   document.addEventListener("keydown", (e) => {
     if (!galleryActive) return;
     if (!customModalEl.classList.contains("show")) return;
     if (e.code === "ArrowRight") {
       nextImage();
     } else if (e.code === "ArrowLeft") {
       prevImage();
     } else if (e.code === "Escape") {
       
       galleryActive = false;
     }
   });

    
   customModalEl.addEventListener("hidden.bs.modal", () => {
     galleryActive = false;
     galleryImages = [];
     currentIndex = -1;
   });
 
  // ---------------- Navbar scroll state ----------------
  const navbar = document.querySelector('.navbar');
  function updateNavbarOnScroll(){
    if (!navbar) return;
    const threshold = 12; // px
    if (window.scrollY > threshold){
      navbar.classList.add('navbar-scrolled');
    } else {
      navbar.classList.remove('navbar-scrolled');
    }
  }
  updateNavbarOnScroll();
  window.addEventListener('scroll', updateNavbarOnScroll, { passive: true });
});