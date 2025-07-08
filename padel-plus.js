/**   // force update 2024-06-25 again
 * Padel Plus - Main JS - 25.06.2025 12.28
 * 
 */

console.log('[Padel Plus] Script loaded (top of file)');

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      console.log(`[Padel Plus] Script already present: ${src}`);
      return resolve();
    }
    const s = document.createElement('script');
    s.src = src;
    s.onload = () => { console.log(`[Padel Plus] Loaded script: ${src}`); resolve(); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}

function loadLenisCSS() {
  if (!document.querySelector('link[data-lenis]')) {
    const lenisCss = document.createElement('link');
    lenisCss.rel = 'stylesheet';
    lenisCss.href = 'https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.css';
    lenisCss.setAttribute('data-lenis', 'true');
    document.head.appendChild(lenisCss);
    console.log('[Padel Plus] Lenis CSS loaded');
  }
}

console.log('[Padel Plus] Before Promise.all for dependencies');

Promise.all([
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js'),
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js'),
  loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/Flip.min.js'),
  loadScript('https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.min.js'),
  loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js').catch(err => {
    console.warn('[Padel Plus] Swiper CDN failed, trying alternative...');
    return loadScript('https://unpkg.com/swiper@11/swiper-bundle.min.js');
  }).catch(err => {
    console.warn('[Padel Plus] Swiper unpkg failed, trying jsdelivr...');
    return loadScript('https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js');
  }),
  loadScript('https://player.vimeo.com/api/player.js') // Vimeo Player API
]).then(() => {
  loadLenisCSS();
  console.log('[Padel Plus] All dependencies loaded (inside .then)');
  console.log('GSAP loaded:', !!window.gsap);
  console.log('ScrollTrigger loaded:', !!window.ScrollTrigger);
  console.log('Flip loaded:', !!window.Flip);
  console.log('Lenis loaded:', !!window.Lenis);
  console.log('Swiper loaded:', !!window.Swiper);
  
  // If Swiper still isn't loaded, try to load it manually with multiple fallbacks
  if (!window.Swiper) {
    console.warn('[Padel Plus] Swiper not loaded via CDN, trying manual load...');
    const swiperUrls = [
      'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
      'https://unpkg.com/swiper@11/swiper-bundle.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/Swiper/11.0.5/swiper-bundle.min.js'
    ];
    
    let currentUrlIndex = 0;
    
    function tryLoadSwiper() {
      if (currentUrlIndex >= swiperUrls.length) {
        console.error('[Padel Plus] All Swiper CDN attempts failed');
        return;
      }
      
      const script = document.createElement('script');
      script.src = swiperUrls[currentUrlIndex];
      script.onload = () => {
        console.log('[Padel Plus] Swiper loaded manually from:', swiperUrls[currentUrlIndex]);
        console.log('[Padel Plus] Swiper object:', window.Swiper);
      };
      script.onerror = () => {
        console.warn('[Padel Plus] Failed to load Swiper from:', swiperUrls[currentUrlIndex]);
        currentUrlIndex++;
        tryLoadSwiper();
      };
      document.head.appendChild(script);
    }
    
    tryLoadSwiper();
  }
  
  gsap.registerPlugin(ScrollTrigger, Flip);

  function runPadelPlusAnimationLogic() {
    console.log('[Padel Plus] runPadelPlusAnimationLogic called');
    // LENIS SMOOTH SCROLL (OPTIONAL)
    window.lenis = new Lenis({
      autoRaf: true,
    });
    console.log('[Padel Plus] Lenis instance created:', window.lenis);

    // MWG003 Debug
    console.log('[Padel Plus] Checking for .mwg_effect003...');
    const mwgEffect003Debug = document.querySelector('.mwg_effect003');
    const pinHeight = document.querySelector('.mwg_effect003 .pin-height');
    console.log('[Padel Plus] MWG003 pinHeight:', pinHeight);
    const circles = document.querySelectorAll('.mwg_effect003 .circle');
    const circlesContainer = document.querySelector('.mwg_effect003 .circles');
    const container = document.querySelector('.mwg_effect003 .container');
    if (mwgEffect003Debug) {
      console.log('[Padel Plus] MWG EFFECT 003 found, initializing...');
      console.log('[Padel Plus] MWG003 elements:', { pinHeight, circlesLength: circles.length, circlesContainer, container });
    } else {
      console.log('[Padel Plus] MWG EFFECT 003 not found on this page');
    }

    // MWG005 Debug
    console.log('[Padel Plus] Checking for .mwg_effect005...');
    const mwgEffect005Debug = document.querySelector('.mwg_effect005');
    const pinHeight005 = document.querySelector('.mwg_effect005 .pin-height-005');
    console.log('[Padel Plus] MWG005 pinHeight005:', pinHeight005);
    const container005 = document.querySelector('.mwg_effect005 .container');
    const words005 = document.querySelectorAll('.mwg_effect005 .word');
    if (mwgEffect005Debug) {
      console.log('[Padel Plus] MWG EFFECT 005 found, initializing...');
      console.log('[Padel Plus] MWG005 elements:', { pinHeight005, container005, wordsCount: words005.length });
    } else {
      console.log('[Padel Plus] MWG EFFECT 005 not found on this page');
    }

    // Dots grid debug
    console.log('[Padel Plus] Checking for [data-dots-container-init]...');
    const dotsContainers = document.querySelectorAll('[data-dots-container-init]');
    console.log('[Padel Plus] Dots grid containers found:', dotsContainers.length);

    // Scroll-To Anchor Lenis
    function initScrollToAnchorLenis() {
      document.querySelectorAll('[data-anchor-target]').forEach(element => {
        element.addEventListener('click', function () {
          const targetScrollToAnchorLenis = this.getAttribute('data-anchor-target');
          if (window.lenis && typeof window.lenis.scrollTo === 'function') {
            window.lenis.scrollTo(targetScrollToAnchorLenis, {
              easing: (x) => (x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2),
              duration: 1.2,
              offset: 0 // Option to create an offset when there is a fixed navigation for example
            });
          }
        });
      });
    }
    // Initialize Scroll-To Anchor Lenis
    initScrollToAnchorLenis();

    gsap.to('.scroll', {
      autoAlpha:0,
      duration:0.2,
      scrollTrigger: {
        trigger:'.mwg_effect031',
        start:'top top',
        end:'top top-=1',
        toggleActions: "play none reverse none"
      }
    });
    console.log('[Padel Plus] .scroll animation set up');

    // === MWG EFFECT 031 (Slide Animations) ===
    // Check if MWG EFFECT 031 exists before running
    const mwgEffect031 = document.querySelector(".mwg_effect031");
    if (mwgEffect031) {
      console.log('[Padel Plus] MWG EFFECT 031 found, initializing...');
      
      gsap.to('.mwg_effect031 .scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
          trigger:'.mwg_effect031',
          start:'top top',
          end:'top top-=1',
          toggleActions: "play none reverse none"
        }
      });
      console.log('[Padel Plus] .scroll animation set up');

      const slides = document.querySelectorAll('.mwg_effect031 .slide');
      if (slides.length > 0) {
        console.log('[Padel Plus] MWG EFFECT 031 slides found, creating animations...');
        
        slides.forEach(slide => {
          const contentWrapper = slide.querySelector('.content-wrapper');
          const content = slide.querySelector('.content');
          if (!contentWrapper || !content) return;
          gsap.to(content, {
            rotationZ: (Math.random() - 0.5) * 10,
            scale: 0.7,
            rotationX: 40,
            ease: 'power1.in',
            scrollTrigger: {
              pin: contentWrapper,
              trigger: slide,
              start: 'top 0%',
              end: '+=' + window.innerHeight,
              scrub: true
            }
          });
          gsap.to(content, {
            autoAlpha: 0,
            ease: 'power1.in',
            scrollTrigger: {
              trigger: content,
              start: 'top -80%',
              end: '+=' + 0.2 * window.innerHeight,
              scrub: true
            }
          });
        });
        console.log('[Padel Plus] Slide animations set up');
      } else {
        console.warn('[Padel Plus] MWG EFFECT 031: No slides found');
      }
    } else {
      console.log('[Padel Plus] MWG EFFECT 031 not found on this page');
    }
    // === END MWG EFFECT 031 ===

    // PAGE TRANSITION ANIMATION (vanilla JS)
    console.log('[Padel Plus] Setting up page transitions');
    // Page load transition
    let tl = gsap.timeline();
    tl.to(".transition_column", {yPercent: -100, stagger: 0.2});
    tl.set(".transition_wrap", {display: "none"});

    // Link click transition
    document.querySelectorAll('a:not(.excluded-class)')?.forEach(link => {
      link.addEventListener('click', function(e) {
        let currentUrl = link.getAttribute('href');
        if (
          link.hostname === window.location.host &&
          currentUrl && !currentUrl.includes("#") &&
          link.target !== "_blank"
        ) {
          e.preventDefault();
          // window.lenis && window.lenis.stop && window.lenis.stop();
          gsap.set(".transition_wrap", {display: "flex"});
          gsap.set(".transition_column", {yPercent: 100});
          gsap.to(".transition_column", {
            yPercent: 0,
            stagger: 0.1,      // Faster stagger
            duration: 0.4,     // Faster animation
            onComplete: () => (window.location.href = currentUrl)
          });
        }
      });
    });

    // On Back Button Tap
    window.onpageshow = function (event) {
      if (event.persisted) window.location.reload();
    };

    // Highlight active slide link
    document.querySelectorAll('.slide').forEach(slide => {
      const slideId = slide.id;
      if (!slideId) return;
      ScrollTrigger.create({
        trigger: slide,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveSlideLink(slideId),
        onEnterBack: () => setActiveSlideLink(slideId)
      });
    });
    function setActiveSlideLink(activeId) {
      console.log('[Padel Plus] setActiveSlideLink called with activeId:', activeId);
      document.querySelectorAll('.product-list-item').forEach(link => {
        const target = link.getAttribute('data-anchor-target');
        const normalizedTarget = target ? target.replace(/^#/, '').trim().toLowerCase() : '';
        const normalizedActiveId = activeId.trim().toLowerCase();
        console.log('[Padel Plus] Comparing:', normalizedTarget, 'vs', normalizedActiveId, 'for link:', link);
        if (
          target &&
          normalizedTarget === normalizedActiveId
        ) {
          console.log('[Padel Plus] Match found. Setting opacity 1 for link:', link);
          link.style.opacity = "1";
        } else {
          link.style.opacity = "0.3";
        }
      });
    }

    // --- CATEGORY LINK HIGHLIGHTING ---
    function setActiveCategory(category) {
      const courtsLink = document.querySelector('.courts-link');
      const canopiesLink = document.querySelector('.canopies-link');
      if (!courtsLink || !canopiesLink) return;

      // Remove .active from both, then add to the active one
      courtsLink.classList.remove('active');
      canopiesLink.classList.remove('active');

      if (category === 'courts') {
        courtsLink.style.opacity = '1';
        canopiesLink.style.opacity = '0.3';
        courtsLink.classList.add('active');
        console.log('[Padel Plus] Courts active: plus symbol animated in, opacity 1');
        console.log('[Padel Plus] Canopies inactive: opacity 0.3');
      } else if (category === 'canopies') {
        courtsLink.style.opacity = '0.3';
        canopiesLink.style.opacity = '1';
        canopiesLink.classList.add('active');
        console.log('[Padel Plus] Canopies active: plus symbol animated in, opacity 1');
        console.log('[Padel Plus] Courts inactive: opacity 0.3');
      }
    }

    // Courts slides
    document.querySelectorAll('.slide[data-category="courts"]').forEach(slide => {
      ScrollTrigger.create({
        trigger: slide,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveCategory('courts'),
        onEnterBack: () => setActiveCategory('courts')
      });
    });
    // Canopies slides
    document.querySelectorAll('.slide[data-category="canopies"]').forEach(slide => {
      ScrollTrigger.create({
        trigger: slide,
        start: "top center",
        end: "bottom center",
        onEnter: () => setActiveCategory('canopies'),
        onEnterBack: () => setActiveCategory('canopies')
      });
    });

    // Smooth background color transition for body (only on /products)
    if (window.location.pathname === '/products') {
      ScrollTrigger.create({
        trigger: '.product-section',
        start: 'top top',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: '#1a1a1a',
            duration: 0.3,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          gsap.to('body', {
            backgroundColor: '#f9f9f9',
            duration: 0.1,
            ease: 'power2.out'
          });
        }
      });
    }

    // Smooth background color transition for body on review section (mwg003)
    const mwg003Section = document.querySelector('.mwg_effect003');
    if (mwg003Section) {
      ScrollTrigger.create({
        trigger: mwg003Section,
        start: 'top 60%',
        end: 'bottom 60%',
        onEnter: () => {
          gsap.to('body', {
            backgroundColor: '#1a1a1a',
            duration: 0.3,
            ease: 'power2.out'
          });
        },
        onLeaveBack: () => {
          gsap.to('body', {
            backgroundColor: '#f9f9f9',
            duration: 0.1,
            ease: 'power2.out'
          });
        },
        onLeave: () => {
          gsap.to('body', {
            backgroundColor: '#f9f9f9',
            duration: 0.1,
            ease: 'power2.out'
          });
        },
        onEnterBack: () => {
          gsap.to('body', {
            backgroundColor: '#1a1a1a',
            duration: 0.3,
            ease: 'power2.out'
          });
        }
      });
    }

    // Toggle nav button color based on section background using ScrollTrigger only
    const btnBg = document.querySelector('.button-color-tennis_bg');
    const btnText = document.querySelector('.button-color-tennis_text');
    if (btnBg && btnText) {
      document.querySelectorAll('[data-bg="dark"]').forEach(section => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "bottom top",
          toggleClass: {
            targets: [btnBg, btnText],
            className: "light"
          }
        });
      });
    }

    // Guarantee correct button color state on initial load
    function setButtonColorManually() {
      const btnBg = document.querySelector('.button-color-tennis_bg');
      const btnText = document.querySelector('.button-color-tennis_text');
      if (!btnBg || !btnText) return;
      let isOverDark = false;
      document.querySelectorAll('[data-bg="dark"]').forEach(section => {
        const rect = section.getBoundingClientRect();
        // Use a small margin for robustness
        if (rect.top <= 1 && rect.bottom > 1) {
          isOverDark = true;
        }
      });
      if (isOverDark) {
        btnBg.classList.add('light');
        btnText.classList.add('light');
      } else {
        btnBg.classList.remove('light');
        btnText.classList.remove('light');
      }
    }

    // Force ScrollTrigger to refresh and update after everything is loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        ScrollTrigger.refresh(true);
        setButtonColorManually();
      }, 100);
    });

    // Ensure correct button color at the very top of the page
    window.addEventListener('scroll', () => {
      if (window.scrollY === 0) {
        setButtonColorManually();
      }
    });

    // VimeoBG: Only run on homepage
    console.log('[VimeoBG] Current pathname:', window.location.pathname);
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html' ||
      window.location.pathname === '/home'
    ) {
      console.log('[VimeoBG] Forcing initVimeoBGVideo call (homepage)');
      initVimeoBGVideo();
    }

    // === LOGO/NAV ANIMATION ===
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html' ||
      window.location.pathname === '/home'
    ) {
      ScrollTrigger.create({
        trigger: '.hero',
        start: 'top+=50 top',
        end: 'bottom top',
        onEnter: () => {
          const tl = gsap.timeline();
          tl.to('.logo-contain', { width: '10em', duration: 0.5, ease: 'power1.inOut' }, 0)
            .to(['.nav-menu', '.contact-btn-wrap'], { opacity: 1, y: 0, pointerEvents: 'auto', duration: 0.4 }, 0.3);
          document.body.classList.add('nav-active');
        },
        onLeaveBack: () => {
          const tl = gsap.timeline();
          tl.to('.logo-contain', { width: '100%', duration: 0.7, ease: 'power1.inOut' }, 0)
            .to(['.nav-menu', '.contact-btn-wrap'], { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.4 }, 0.2);
          document.body.classList.remove('nav-active');
        }
      });
    }
    // === END LOGO/NAV ANIMATION ===

    // COURTS IMAGE FLIP
    ScrollTrigger.create({
      trigger: ".courts-large", // The section where the large courts image should appear
      start: "top 80%", // Adjust as needed
      end: "bottom top",
      onEnter: () => {
        console.log('[Flip Debug] ScrollTrigger COURTS onEnter (moveCourtsToLarge)');
        moveCourtsToLarge();
      },
      onLeaveBack: () => {
        console.log('[Flip Debug] ScrollTrigger COURTS onLeaveBack (moveCourtsToSmall)');
        moveCourtsToSmall();
      }
    });

    function moveCourtsToLarge() {
      const courts = document.querySelector('[data-flip-id="courts"]');
      const largeContainer = document.querySelector('.courts-image-large[data-flip-container="courts"]');
      if (!courts || !largeContainer) return;
      const state = Flip.getState(courts);
      largeContainer.appendChild(courts);

      // Animate out the plus and text
      gsap.to(['.img-link-text.flip', '.img-link-plus.flip'], {
        y: -20,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });

      Flip.from(state, {
        duration: 0.7,
        ease: "power2.inOut",
        absolute: true,
        scale: true,
        onStart: () => courts.style.zIndex = 10,
        onComplete: () => {
          courts.style.zIndex = "";
          ScrollTrigger.refresh(true);
        }
      });
    }

    function moveCourtsToSmall() {
      const courts = document.querySelector('[data-flip-id="courts"]');
      const smallContainer = document.querySelector('.courts-image-small[data-flip-container="courts"]');
      if (!courts || !smallContainer) return;
      const state = Flip.getState(courts);
      smallContainer.appendChild(courts);

      // Animate in the plus and text
      gsap.to(['.img-link-text.flip', '.img-link-plus.flip'], {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });

      Flip.from(state, {
        duration: 0.7,
        ease: "power2.inOut",
        absolute: true,
        scale: true,
        onStart: () => courts.style.zIndex = 10,
        onComplete: () => {
          courts.style.zIndex = "";
          ScrollTrigger.refresh(true);
        }
      });
    }

    // Add .homepage class to body if on homepage
    if (
      window.location.pathname === '/' ||
      window.location.pathname === '/index.html' ||
      window.location.pathname === '/home'
    ) {
      document.body.classList.add('homepage');
    }

    // === MWG EFFECT 003 (Pin Height Circles Fan) ===
    // Check if MWG EFFECT 003 exists before running
    const mwgEffect003 = document.querySelector(".mwg_effect003");
    if (mwgEffect003) {
      console.log('[Padel Plus] MWG EFFECT 003 found, initializing...');
      if (pinHeight && circles.length > 0) {
        // Pin the container and animate the circles wrapper
        gsap.fromTo('.mwg_effect003 .circles', {
          y: '5%'
        }, {
          y: '-5%',
          ease: 'none',
          scrollTrigger: {
            trigger: pinHeight,
            start: 'top top',
            end: 'bottom bottom',
            pin: '.mwg_effect003 .container',
            scrub: true
          }
        });

        // Fan out the circles/cards
        let angle = 3,
            halfRange = (circles.length - 1) * angle / 2,
            rot = -halfRange;
        const distPerCard = (pinHeight.clientHeight - window.innerHeight) / circles.length;
        circles.forEach((circle, index) => {
          gsap.to(circle, {
            rotation: rot,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: pinHeight,
              start: 'top top-=' + (distPerCard) * index,
              end: '+=' + (distPerCard),
              scrub: true
            }
          });
          const card = circle.querySelector('.card');
          if (card) {
            gsap.to(card, {
              rotation: rot,
              y: '-50%',
              ease: 'power1.out',
              scrollTrigger: {
                trigger: pinHeight,
                start: 'top top-=' + (distPerCard) * index,
                end: '+=' + (distPerCard),
                scrub: true
              }
            });
          }
          rot += angle;
        });
      }
    } else {
      console.log('[Padel Plus] MWG EFFECT 003 not found on this page');
    }
    // === END MWG EFFECT 003 ===

    // === MWG EFFECT 005 (Pin Height Words Animation) ===
    // Check if MWG EFFECT 005 exists before running
    const mwgEffect005 = document.querySelector(".mwg_effect005");
    const mwgEffect005Section = mwgEffect005?.closest('.section');
    if (mwgEffect005) {
      console.log('[Padel Plus] MWG EFFECT 005 found, initializing...');
      // INSTRUCTION: Ensure there is a spacer or the carousel section immediately after MWG005 in your HTML, e.g.:
      // <section class="section mwg_effect005">...</section>
      // <div class="mwg005-spacer" style="height: 100vh;"></div>
      // <section class="swiper-section">...</section>
      // Utility to wrap each word in a span
      function wrapWordsInSpan(element) {
        if (!element) return;
        const text = element.textContent;
        element.innerHTML = text
          .split(' ')
          .map(word => `<span class="word">${word}</span>`)
          .join(' ');
      }
      gsap.to('.mwg_effect005 .scroll', {
        autoAlpha:0,
        duration:0.2,
        scrollTrigger: {
          trigger:'.mwg_effect005',
          start:'top top',
          end:'top top-=1',
          toggleActions: "play none reverse none"
        }
      });
      const paragraph005 = document.querySelector(".mwg_effect005 .paragraph");
      if (paragraph005) {
        wrapWordsInSpan(paragraph005);
      }
      const pinHeight005 = document.querySelector(".mwg_effect005 .pin-height-005");
      const container005 = document.querySelector(".mwg_effect005 .container");
      const words005 = document.querySelectorAll(".mwg_effect005 .word");
      // Only create ScrollTrigger if all required elements exist
      if (pinHeight005 && container005 && words005.length > 0) {
        console.log('[Padel Plus] MWG EFFECT 005 elements found, creating ScrollTrigger...');
        // MWG005: Pin, animate, finish, then unpin before carousel
        gsap.to(words005, {
          x: 0,
          stagger: 0.02,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: pinHeight005,
            start: 'top top',
            endTrigger: '.mwg005-spacer', // Use the spacer as endTrigger
            end: 'top top', // When MWG005 top hits spacer top
            scrub: true,
            pin: pinHeight005,
            anticipatePin: 1,
            id: 'mwg005-words',
            markers: true,
            onUpdate: (self) => {
              console.log('[Padel Plus] MWG005 animation updating', self.progress);
            },
            onEnter: () => {
              console.log('[Padel Plus] MWG005 onEnter');
            },
            onLeave: () => {
              console.log('[Padel Plus] MWG005 onLeave (unpinning)');
              gsap.to(pinHeight005, {
                opacity: 0.8,
                duration: 0.3,
                ease: 'power2.out'
              });
            },
            onEnterBack: () => {
              console.log('[Padel Plus] MWG005 onEnterBack (re-pinning)');
              gsap.to(pinHeight005, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
              });
            },
            onLeaveBack: () => {
              console.log('[Padel Plus] MWG005 onLeaveBack');
            }
          }
        });
      } else {
        console.warn('[Padel Plus] MWG EFFECT 005: Missing required elements:', {
          pinHeight005: !!pinHeight005,
          container005: !!container005,
          wordsCount: words005.length
        });
      }
    } else {
      console.log('[Padel Plus] MWG EFFECT 005 not found on this page');
    }
    // === END MWG EFFECT 005 ===

    // === GLOWING INTERACTIVE DOTS GRID (Osmo) ===
    gsap.registerPlugin(InertiaPlugin);

    function initGlowingInteractiveDotsGrid() {
      document.querySelectorAll('[data-dots-container-init]').forEach(container => {
        const colors         = { base: "#3939CA", active: "#A2A2E6" };
        const threshold      = 200;
        const speedThreshold = 100;
        const shockRadius    = 325;
        const shockPower     = 5;
        const maxSpeed       = 5000;
        const centerHole     = false;

        let dots       = [];
        let dotCenters = [];

        function buildGrid() {
          container.innerHTML = "";
          dots = [];
          dotCenters = [];

          const style = getComputedStyle(container);
          const dotPx = parseFloat(style.fontSize);
          const gapPx = dotPx * 2;
          const contW = container.clientWidth;
          const contH = container.clientHeight;

          const cols  = Math.floor((contW + gapPx) / (dotPx + gapPx));
          const rows  = Math.floor((contH + gapPx) / (dotPx + gapPx));
          const total = cols * rows;

          for (let i = 0; i < total; i++) {
            const row    = Math.floor(i / cols);
            const col    = i % cols;

            const d = document.createElement("div");
            d.classList.add("dot");
            
            // Position the dot in the grid
            const x = col * (dotPx + gapPx);
            const y = row * (dotPx + gapPx);
            
            // Create custom SVG content
            const svgContent = `
              <svg width="${dotPx}" height="${dotPx}" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.04999 9.16H0V14.26H9.04999V9.16Z" fill="currentColor"/>
                <path d="M14.92 9.16V0H9.04999V9.16H14.92V14.26H9.04999V23.97H14.92V14.26H23.97V9.16H14.92Z" fill="currentColor"/>
              </svg>
            `;
            
            // Set basic styles for the dot (no background, no border-radius)
            d.style.cssText = `
              position: absolute;
              width: ${dotPx}px;
              height: ${dotPx}px;
              left: ${x}px;
              top: ${y}px;
              pointer-events: auto;
              color: ${colors.base};
            `;
            
            d.innerHTML = svgContent;

            gsap.set(d, { x: 0, y: 0 });
            d._inertiaApplied = false;

            container.appendChild(d);
            dots.push(d);
          }

          requestAnimationFrame(() => {
            dotCenters = dots.map(d => {
              const r = d.getBoundingClientRect();
              return {
                el: d,
                x:  r.left + window.scrollX + r.width  / 2,
                y:  r.top  + window.scrollY + r.height / 2
              };
            });
          });
        }

        window.addEventListener("resize", buildGrid);
        buildGrid();

        let lastTime = 0, lastX = 0, lastY = 0;

        window.addEventListener("mousemove", e => {
          const now   = performance.now();
          const dt    = now - lastTime || 16;
          let   dx    = e.pageX - lastX;
          let   dy    = e.pageY - lastY;
          let   vx    = dx / dt * 1000;
          let   vy    = dy / dt * 1000;
          let   speed = Math.hypot(vx, vy);

          if (speed > maxSpeed) {
            const scale = maxSpeed / speed;
            vx *= scale; vy *= scale; speed = maxSpeed;
          }

          lastTime = now;
          lastX    = e.pageX;
          lastY    = e.pageY;

          requestAnimationFrame(() => {
            dotCenters.forEach(({ el, x, y }) => {
              const dist = Math.hypot(x - e.pageX, y - e.pageY);
              const t    = Math.max(0, 1 - dist / threshold);
              const col  = gsap.utils.interpolate(colors.base, colors.active, t);
              gsap.set(el, { color: col });

              if (speed > speedThreshold && dist < threshold && !el._inertiaApplied) {
                el._inertiaApplied = true;
                const pushX = (x - e.pageX) + vx * 0.005;
                const pushY = (y - e.pageY) + vy * 0.005;

                gsap.to(el, {
                  inertia: { x: pushX, y: pushY, resistance: 750 },
                  onComplete() {
                    gsap.to(el, {
                      x: 0,
                      y: 0,
                      duration: 1.5,
                      ease: "elastic.out(1,0.75)"
                    });
                    el._inertiaApplied = false;
                  }
                });
              }
            });
          });
        });

        window.addEventListener("click", e => {
          dotCenters.forEach(({ el, x, y }) => {
            const dist = Math.hypot(x - e.pageX, y - e.pageY);
            if (dist < shockRadius && !el._inertiaApplied) {
              el._inertiaApplied = true;
              const falloff = Math.max(0, 1 - dist / shockRadius);
              const pushX   = (x - e.pageX) * shockPower * falloff;
              const pushY   = (y - e.pageY) * shockPower * falloff;

              gsap.to(el, {
                inertia: { x: pushX, y: pushY, resistance: 750 },
                onComplete() {
                  gsap.to(el, {
                    x: 0,
                    y: 0,
                    duration: 1.5,
                    ease: "elastic.out(1,0.75)"
                  });
                  el._inertiaApplied = false;
                }
              });
            }
          });
        });
      });
    }

    // Call this in your main animation logic so it runs on all pages
    initGlowingInteractiveDotsGrid();
    // === END GLOWING INTERACTIVE DOTS GRID ===

    // === 3D CAROUSEL (Swiper Integration) ===
    // Delay carousel initialization to ensure Swiper is loaded
    setTimeout(() => {
      console.log('[Padel Plus] Starting 3D Carousel initialization...');
      console.log('[Padel Plus] Current page URL:', window.location.href);
      
      // Check if 3D carousel components exist before running
      const carouselComponents = document.querySelectorAll("[carousel='component']");
      console.log('[Padel Plus] 3D Carousel: Found', carouselComponents.length, 'carousel components');
      
      // Debug: Check for any elements with carousel attributes
      const allCarouselElements = document.querySelectorAll('[carousel]');
      console.log('[Padel Plus] 3D Carousel: All elements with carousel attribute:', allCarouselElements.length);
      allCarouselElements.forEach((el, i) => {
        console.log('[Padel Plus] 3D Carousel: Element', i, 'has attributes:', {
          carousel: el.getAttribute('carousel'),
          className: el.className,
          tagName: el.tagName
        });
      });
      
      // Debug: Check for swiper elements
      const swiperElements = document.querySelectorAll('.swiper');
      console.log('[Padel Plus] 3D Carousel: Found', swiperElements.length, 'swiper elements');
      
      if (carouselComponents.length > 0) {
        console.log('[Padel Plus] 3D Carousel components found, initializing...');
        console.log('[Padel Plus] 3D Carousel: Swiper available:', typeof Swiper !== 'undefined');
        console.log('[Padel Plus] 3D Carousel: jQuery available:', typeof $ !== 'undefined');
        
        // Check if jQuery is available (required for the original code)
        if (typeof $ === 'undefined') {
          console.warn('[Padel Plus] 3D Carousel: jQuery not found, using vanilla JS fallback');
          // Vanilla JS fallback implementation
          carouselComponents.forEach(function(componentEl, index) {
            console.log('[Padel Plus] 3D Carousel: Processing component', index + 1);
            
            const wrapEl = componentEl.querySelector("[carousel='wrap']");
            const swiperEl = componentEl.querySelector(".swiper");
            const nextEl = componentEl.querySelector("[carousel='next']");
            const prevEl = componentEl.querySelector("[carousel='prev']");
            
            console.log('[Padel Plus] 3D Carousel: Elements found:', {
              wrapEl: !!wrapEl,
              swiperEl: !!swiperEl,
              nextEl: !!nextEl,
              prevEl: !!prevEl
            });
            
            if (!wrapEl || !swiperEl || !nextEl || !prevEl) {
              console.warn('[Padel Plus] 3D Carousel: Missing required elements', {
                wrapEl: !!wrapEl,
                swiperEl: !!swiperEl,
                nextEl: !!nextEl,
                prevEl: !!prevEl
              });
              return;
            }
            
            // Get the carousel items - they're in the wrap's first child (the list)
            const itemEl = wrapEl.querySelector('.w-dyn-items') ? wrapEl.querySelector('.w-dyn-items').children : [];
            
            console.log('[Padel Plus] 3D Carousel: Found', itemEl.length, 'carousel items');
            
            if (itemEl.length === 0) {
              console.warn('[Padel Plus] 3D Carousel: No carousel items found');
              return;
            }
            
            console.log('[Padel Plus] 3D Carousel: Found', itemEl.length, 'items');
            
            const rotateAmount = 360 / itemEl.length;
            const zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
            const negTranslate = `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
            const posTranslate = `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;

            console.log('[Padel Plus] 3D Carousel: Setting up 3D transforms...');
            wrapEl.style.setProperty("--3d-carousel-z", negTranslate);
            wrapEl.style.setProperty("perspective", posTranslate);

            itemEl.forEach(function(item, index) {
              item.style.transform = `rotateY(${rotateAmount * index}deg) translateZ(${posTranslate})`;
            });

            console.log('[Padel Plus] 3D Carousel: Starting intro animation...');
            let introTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.swiper-section',
                start: 'top 80%',
                once: true
              },
              onComplete: () => {
                console.log('[Padel Plus] 3D Carousel: Intro animation complete, initializing Swiper...');
                swiperCode();
              }
            });
            introTl.to(wrapEl, { opacity: 1, duration: 0.3 });
            introTl.fromTo(wrapEl, { "--3d-carousel-rotate": 100, "--3d-carousel-rotate-x": -90 }, { "--3d-carousel-rotate": 0, "--3d-carousel-rotate-x": -4, duration: 4, ease: "power2.inOut" }, "<");
            introTl.to("[fade-up]", { opacity: 1 }, ">-0.3");

            function swiperCode() {
              console.log('[Padel Plus] 3D Carousel: Setting up Swiper...');
              let tl = gsap.timeline({ paused: true });
              tl.fromTo(wrapEl, { "--3d-carousel-rotate": 0 }, { "--3d-carousel-rotate": -(360 - rotateAmount), duration: 30, ease: "none" });

              let progress = {
                value: 0
              };

              if (typeof Swiper !== 'undefined') {
                console.log('[Padel Plus] 3D Carousel: Creating Swiper instance...');
                const swiper = new Swiper(swiperEl, {
                  effect: "creative",
                  creativeEffect: {
                    prev: {
                      translate: [0, "-100%", 0],
                      scale: 0.5,
                      opacity: 0
                    },
                    next: {
                      translate: [0, "100%", 0],
                      scale: 0.5,
                      opacity: 0
                    }
                  },
                  grabCursor: true,
                  keyboard: true,
                  speed: 500,
                  mousewheel: {
                    eventsTarget: "[carousel='component']"
                  },
                  navigation: {
                    nextEl: nextEl,
                    prevEl: prevEl
                  }
                });
                swiper.on("progress", function (e) {
                  console.log('[Padel Plus] 3D Carousel progress:', e.progress);
                  gsap.to(progress, {
                    value: e.progress,
                    onUpdate: () => {
                      tl.progress(progress.value);
                    }
                  });
                });
                console.log('[Padel Plus] 3D Carousel: Swiper initialized successfully');
              } else {
                console.warn('[Padel Plus] 3D Carousel: Swiper not loaded');
              }
            }
          });
        } else {
          console.log('[Padel Plus] 3D Carousel: Using jQuery implementation');
          // Original jQuery implementation
          $("[carousel='component']").each(function (index) {
            console.log('[Padel Plus] 3D Carousel: Processing jQuery component', index + 1);
            
            let componentEl = $(this);
            let wrapEl = componentEl.find("[carousel='wrap']");
            let swiperEl = componentEl.find(".swiper");
            let nextEl = componentEl.find("[carousel='next']");
            let prevEl = componentEl.find("[carousel='prev']");
            
            console.log('[Padel Plus] 3D Carousel: jQuery elements found:', {
              wrapEl: wrapEl.length,
              swiperEl: swiperEl.length,
              nextEl: nextEl.length,
              prevEl: prevEl.length
            });
            
            if (wrapEl.length === 0 || swiperEl.length === 0 || nextEl.length === 0 || prevEl.length === 0) {
              console.warn('[Padel Plus] 3D Carousel: Missing required elements');
              return;
            }
            
            // Get the carousel items - they're in the wrap's first child (the list)
            let itemEl = wrapEl.find('.w-dyn-items').children();
            
            console.log('[Padel Plus] 3D Carousel: Found', itemEl.length, 'jQuery carousel items');
            
            if (itemEl.length === 0) {
              console.warn('[Padel Plus] 3D Carousel: No carousel items found');
              return;
            }
            
            console.log('[Padel Plus] 3D Carousel: Found', itemEl.length, 'items');
            
            let rotateAmount = 360 / itemEl.length;
            let zTranslate = 2 * Math.tan((rotateAmount / 2) * (Math.PI / 180));
            let negTranslate = `calc(var(--3d-carousel-item-width) / -${zTranslate} - var(--3d-carousel-gap))`;
            let posTranslate = `calc(var(--3d-carousel-item-width) / ${zTranslate} + var(--3d-carousel-gap))`;

            wrapEl.css("--3d-carousel-z", negTranslate);
            wrapEl.css("perspective", posTranslate);

            itemEl.each(function (index) {
              $(this).css("transform", `rotateY(${rotateAmount * index}deg) translateZ(${posTranslate})`);
            });

            let introTl = gsap.timeline({
              scrollTrigger: {
                trigger: '.swiper-section',
                start: 'top 80%',
                once: true
              },
              onComplete: () => {
                swiperCode();
              }
            });
            introTl.to(wrapEl, { opacity: 1, duration: 0.3 });
            introTl.fromTo(wrapEl, { "--3d-carousel-rotate": 100, "--3d-carousel-rotate-x": -90 }, { "--3d-carousel-rotate": 0, "--3d-carousel-rotate-x": -4, duration: 4, ease: "power2.inOut" }, "<");
            introTl.to("[fade-up]", { opacity: 1 }, ">-0.3");

            function swiperCode() {
              let tl = gsap.timeline({ paused: true });
              tl.fromTo(wrapEl, { "--3d-carousel-rotate": 0 }, { "--3d-carousel-rotate": -(360 - rotateAmount), duration: 30, ease: "none" });

              let progress = {
                value: 0
              };

              if (typeof Swiper !== 'undefined') {
                const swiper = new Swiper(swiperEl[0], {
                  effect: "creative",
                  creativeEffect: {
                    prev: {
                      translate: [0, "-100%", 0],
                      scale: 0.5,
                      opacity: 0
                    },
                    next: {
                      translate: [0, "100%", 0],
                      scale: 0.5,
                      opacity: 0
                    }
                  },
                  grabCursor: true,
                  keyboard: true,
                  speed: 500,
                  mousewheel: {
                    eventsTarget: "[carousel='component']"
                  },
                  navigation: {
                    nextEl: nextEl[0],
                    prevEl: prevEl[0]
                  }
                });
                swiper.on("progress", function (e) {
                  console.log('[Padel Plus] 3D Carousel progress:', e.progress);
                  gsap.to(progress, {
                    value: e.progress,
                    onUpdate: () => {
                      tl.progress(progress.value);
                    }
                  });
                });
                console.log('[Padel Plus] 3D Carousel: Swiper initialized successfully');
              } else {
                console.warn('[Padel Plus] 3D Carousel: Swiper not loaded');
              }
            }
          });
        }
      } else {
        console.log('[Padel Plus] 3D Carousel components not found on this page');
      }
    }, 1000); // 1 second delay to ensure Swiper is loaded
    // === END 3D CAROUSEL ===

    // Output computed heights for debugging
    setTimeout(() => {
      const eff005Section = document.querySelector('.mwg_effect005')?.closest('.section');
      const swiperSection = document.querySelector('.swiper-section');
      const eff003Section = document.querySelector('.mwg_effect003')?.closest('.section');
      const pinHeight003 = document.querySelector('.mwg_effect003 .pin-height');
      const pinHeight005 = document.querySelector('.mwg_effect005 .pin-height');
      console.log('[DEBUG HEIGHTS] .section (mwg_effect005):', eff005Section?.offsetHeight);
      console.log('[DEBUG HEIGHTS] .swiper-section:', swiperSection?.offsetHeight);
      console.log('[DEBUG HEIGHTS] .section (mwg_effect003):', eff003Section?.offsetHeight);
      console.log('[DEBUG HEIGHTS] .mwg_effect003 .pin-height:', pinHeight003?.offsetHeight);
      console.log('[DEBUG HEIGHTS] .mwg_effect005 .pin-height:', pinHeight005?.offsetHeight);
    }, 1500);

    // At the end of runPadelPlusAnimationLogic, add:
    window.addEventListener('load', () => {
      setTimeout(() => {
        if (window.ScrollTrigger) {
          window.ScrollTrigger.refresh(true);
          console.log('[Padel Plus] ScrollTrigger refreshed after load');
        }
      }, 500);
    });
  }

  if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', runPadelPlusAnimationLogic);
  } else {
    runPadelPlusAnimationLogic();
  }

}).catch((e) => {
  console.error('[Padel Plus] Error loading dependencies:', e);
});

(function() {
    'use strict';
    
    console.log('[Padel Plus] Script loaded (top of file)');
    
    // Configuration
    const CONFIG = {
        version: '1.0.0',
        debug: false
    };
    
    // Main PadelPlus class
    class PadelPlus {
        constructor() {
            this.isInitialized = false;
            this.lenis = null;
            this.init();
        }
        
        async init() {
            if (this.isInitialized) return;
            this.log('Padel Plus initializing...');
            // Load Lenis CSS and JS, then initialize
            await this.loadLenisResources();
            // Load GSAP and ScrollTrigger
            await this.loadGsapResources();
            this.initLenis();
            // Wait for DOM to be ready
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.setup());
            } else {
                this.setup();
            }
            this.isInitialized = true;
        }
        
        async loadLenisResources() {
            // Load Lenis CSS
            await this.loadLenisCSS();
            // Load Lenis JS
            await this.loadLenisJS();
        }
        
        async loadLenisCSS() {
            if (!document.querySelector('link[data-lenis]')) {
                const lenisCss = document.createElement('link');
                lenisCss.rel = 'stylesheet';
                lenisCss.href = 'https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.css';
                lenisCss.setAttribute('data-lenis', 'true');
                document.head.appendChild(lenisCss);
                console.log('[Padel Plus] Lenis CSS loaded');
            }
        }
        
        async loadLenisJS() {
            if (!window.Lenis) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdn.jsdelivr.net/npm/lenis@1.2.3/dist/lenis.min.js';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
        }
        
        async loadGsapResources() {
            // Load GSAP
            await this.loadGSAP();
            // Load ScrollTrigger
            await this.loadScrollTrigger();
            // Register plugin
            if (window.gsap && window.ScrollTrigger) {
                window.gsap.registerPlugin(window.ScrollTrigger);
            }
        }
        
        async loadGSAP() {
            if (!window.gsap) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
        }
        
        async loadScrollTrigger() {
            if (!window.ScrollTrigger) {
                await new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js';
                    script.async = true;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.head.appendChild(script);
                });
            }
        }
        
        initLenis() {
            if (window.Lenis && !this.lenis) {
                this.lenis = new window.Lenis({ autoRaf: true });
                this.log('Lenis smooth scroll initialized');
            }
        }
        
        setup() {
            this.log('Setting up Padel Plus...');
            
            // Add CSS styles
            this.addStyles();
            
            // Initialize components
            this.initComponents();
            
            // Listen for Webflow events
            this.listenForWebflowEvents();
            
            // Run GSAP/ScrollTrigger/Lenis animation logic
            this.initGsapScrollAnimations();
            
            this.log('Padel Plus setup complete!');
        }
        
        addStyles() {
            const styles = `
                .padel-plus-container {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                }
                
                .padel-plus-button {
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 8px;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                }
                
                .padel-plus-button:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(0,0,0,0.15);
                }
                
                .padel-plus-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.5);
                    display: none;
                    justify-content: center;
                    align-items: center;
                    z-index: 10000;
                }
                
                .padel-plus-modal-content {
                    background: white;
                    padding: 30px;
                    border-radius: 12px;
                    max-width: 500px;
                    width: 90%;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                }
                
                .padel-plus-modal h2 {
                    margin-top: 0;
                    color: #333;
                }
                
                .padel-plus-close {
                    position: absolute;
                    top: 15px;
                    right: 20px;
                    background: none;
                    border: none;
                    font-size: 24px;
                    cursor: pointer;
                    color: #666;
                }

                /* Dots container styles */
                .dots-container {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 1;
                    pointer-events: none;
                }

                /* Footer content z-index to appear above dots */
                .footer-top,
                .footer-list,
                .footer-bottom {
                    position: relative;
                    z-index: 10;
                }

                /* Ensure all footer links and buttons are above dots */
                .footer a,
                .footer button,
                .footer .button-color-tennis {
                    position: relative;
                    z-index: 10;
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        initComponents() {
            // Initialize any components here
            this.log('Components initialized');
        }
        
        listenForWebflowEvents() {
            // Listen for Webflow page transitions
            if (window.Webflow) {
                window.Webflow.push(() => {
                    this.log('Webflow page loaded');
                    this.onPageLoad();
                });
            }
            
            // Listen for Webflow form submissions
            document.addEventListener('submit', (e) => {
                if (e.target.closest('[data-wf-form]')) {
                    this.log('Webflow form submitted');
                    this.onFormSubmit(e);
                }
            });
        }
        
        onPageLoad() {
            // Handle page load events
            this.log('Page loaded - Padel Plus ready');
        }
        
        onFormSubmit(event) {
            // Handle form submissions
            this.log('Form submitted:', event.target);
        }
        
        // Utility methods
        log(message, data = null) {
            if (CONFIG.debug) {
                console.log(`[Padel Plus] ${message}`, data);
            }
        }
        
        // Public API methods
        showModal(title, content) {
            const modal = document.createElement('div');
            modal.className = 'padel-plus-modal';
            modal.innerHTML = `
                <div class="padel-plus-modal-content">
                    <button class="padel-plus-close">&times;</button>
                    <h2>${title}</h2>
                    <div>${content}</div>
                </div>
            `;
            
            document.body.appendChild(modal);
            modal.style.display = 'flex';
            
            // Close functionality
            modal.querySelector('.padel-plus-close').addEventListener('click', () => {
                modal.remove();
            });
            
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            });
        }
        
        createButton(text, onClick) {
            const button = document.createElement('button');
            button.className = 'padel-plus-button';
            button.textContent = text;
            button.addEventListener('click', onClick);
            return button;
        }
        
        // Utility methods for Lenis
        pauseScroll() {
            if (this.lenis) this.lenis.stop();
        }
        resumeScroll() {
            if (this.lenis) this.lenis.start();
        }
        getLenisInstance() {
            return this.lenis;
        }
        
        initGsapScrollAnimations() {
            // Ensure GSAP and ScrollTrigger are loaded
            if (!window.gsap || !window.ScrollTrigger) return;
            // Use the existing Lenis instance if available
            const lenis = this.lenis || (window.Lenis ? new window.Lenis({ autoRaf: true }) : null);
            // Animation logic
            window.addEventListener('DOMContentLoaded', () => {
                console.log('[Padel Plus] GSAP/ScrollTrigger animation logic running');
                // Hide .scroll when .mwg_effect031 is at the top
                window.gsap.to('.scroll', {
                    autoAlpha: 0,
                    duration: 0.2,
                    scrollTrigger: {
                        trigger: '.mwg_effect031',
                        start: 'top top',
                        end: 'top top-=1',
                        toggleActions: 'play none reverse none'
                    }
                });
                const slides = document.querySelectorAll('.mwg_effect031 .slide');
                slides.forEach(slide => {
                    const contentWrapper = slide.querySelector('.content-wrapper');
                    const content = slide.querySelector('.content');
                    if (!contentWrapper || !content) return;
                    window.gsap.to(content, {
                        rotationZ: (Math.random() - 0.5) * 10,
                        scale: 0.7,
                        rotationX: 40,
                        ease: 'power1.in',
                        scrollTrigger: {
                            pin: contentWrapper,
                            trigger: slide,
                            start: 'top 0%',
                            end: '+=' + window.innerHeight,
                            scrub: true
                        }
                    });
                    window.gsap.to(content, {
                        autoAlpha: 0,
                        ease: 'power1.in',
                        scrollTrigger: {
                            trigger: content,
                            start: 'top -80%',
                            end: '+=' + 0.2 * window.innerHeight,
                            scrub: true
                        }
                    });
                });
            });
        }
    }
    
    // Initialize Padel Plus when script loads
    const padelPlus = new PadelPlus();
    
    // Expose to global scope for external access
    window.PadelPlus = padelPlus;
    
    // Log initialization
    console.log('Padel Plus v' + CONFIG.version + ' loaded successfully!');
    
})(); 

// --- Vimeo Background Video (Basic Version) ---
// Source: https://www.osmo.supply/resource/vimeo-background-video
console.log('[VimeoBG] Script loaded');

function initVimeoBGVideo() {
  console.log('[VimeoBG] initVimeoBGVideo called');
  // Select all elements that have [data-vimeo-bg-init]
  const vimeoPlayers = document.querySelectorAll('[data-vimeo-bg-init]');
  console.log('[VimeoBG] Found elements:', vimeoPlayers.length);

  vimeoPlayers.forEach(function(vimeoElement, index) {
    const vimeoVideoID = vimeoElement.getAttribute('data-vimeo-video-id');
    console.log('[VimeoBG] Video ID:', vimeoVideoID);
    if (!vimeoVideoID) return;
    const vimeoVideoURL = `https://player.vimeo.com/video/${vimeoVideoID}?api=1&background=1&autoplay=1&loop=1&muted=1`;
    console.log('[VimeoBG] Setting src:', vimeoVideoURL);
    vimeoElement.querySelector('iframe').setAttribute('src', vimeoVideoURL);

    // Assign an ID to each element
    const videoIndexID = 'vimeo-bg-basic-index-' + index;
    vimeoElement.setAttribute('id', videoIndexID);

    const iframeID = vimeoElement.id;
    const player = new Vimeo.Player(iframeID);

    player.setVolume(0);
    
    player.on('bufferend', function() {
      vimeoElement.setAttribute('data-vimeo-activated', 'true');
      vimeoElement.setAttribute('data-vimeo-loaded', 'true');
      console.log('[VimeoBG] Buffer end for:', iframeID);
    });
    
    // Update Aspect Ratio if [data-vimeo-update-size="true"]
    let videoAspectRatio;
    if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
      player.getVideoWidth().then(function(width) {
        player.getVideoHeight().then(function(height) {
          videoAspectRatio = height / width;
          const beforeEl = vimeoElement.querySelector('.vimeo-bg__before');
          if (beforeEl) {
            beforeEl.style.paddingTop = videoAspectRatio * 100 + '%';
            console.log('[VimeoBG] Set aspect ratio padding for', iframeID, ':', videoAspectRatio * 100 + '%');
          }
        });
      });
    }

    // Function to adjust video sizing
    function adjustVideoSizing() {
      const containerAspectRatio = (vimeoElement.offsetHeight / vimeoElement.offsetWidth) * 100;
      const iframeWrapper = vimeoElement.querySelector('.vimeo-bg__iframe-wrapper');
      if (iframeWrapper && videoAspectRatio) {
        if (containerAspectRatio > videoAspectRatio * 100) {
          iframeWrapper.style.width = `${(containerAspectRatio / (videoAspectRatio * 100)) * 100}%`;
        } else {
          iframeWrapper.style.width = '';
        }
      }
    }
    // Adjust video sizing initially
    if (vimeoElement.getAttribute('data-vimeo-update-size') === 'true') {
      adjustVideoSizing();
      player.getVideoWidth().then(function() {
        player.getVideoHeight().then(function() {
          adjustVideoSizing();
        });
      });
    } else {
      adjustVideoSizing();
    }
    // Adjust video sizing on resize
    window.addEventListener('resize', adjustVideoSizing);
  });
} 

// === ACCORDION CSS INIT ===
function initAccordionCSS() {
  document.querySelectorAll('[data-accordion-css-init]').forEach((accordion) => {
    const closeSiblings = accordion.getAttribute('data-accordion-close-siblings') === 'true';

    accordion.addEventListener('click', (event) => {
      const toggle = event.target.closest('[data-accordion-toggle]');
      if (!toggle) return; // Exit if the clicked element is not a toggle

      const singleAccordion = toggle.closest('[data-accordion-status]');
      if (!singleAccordion) return; // Exit if no accordion container is found

      const isActive = singleAccordion.getAttribute('data-accordion-status') === 'active';
      singleAccordion.setAttribute('data-accordion-status', isActive ? 'not-active' : 'active');
      
      // When [data-accordion-close-siblings="true"]
      if (closeSiblings && !isActive) {
        accordion.querySelectorAll('[data-accordion-status="active"]').forEach((sibling) => {
          if (sibling !== singleAccordion) sibling.setAttribute('data-accordion-status', 'not-active');
        });
      }
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initAccordionCSS();
}); 

// === SLIDESHOW PARALLAX GALLERY INIT ===
// Ensure GSAP Observer and CustomEase are loaded and registered
(function() {
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="${src}"]`)) return resolve();
      const s = document.createElement('script');
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  Promise.all([
    loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/gsap.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/Observer.min.js'),
    loadScript('https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/CustomEase.min.js')
  ]).then(() => {
    if (window.gsap && window.Observer && window.CustomEase) {
      gsap.registerPlugin(Observer, CustomEase);
      CustomEase.create("slideshow-wipe", "0.6, 0.08, 0.02, 0.99");
    }
  });
})();

function initSlideShow(el) {
  const ui = {
    el,
    slides: Array.from(el.querySelectorAll('[data-slideshow="slide"]')),
    inner: Array.from(el.querySelectorAll('[data-slideshow="parallax"]')),
    thumbs: Array.from(el.querySelectorAll('[data-slideshow="thumb"]'))
  };
  let current = 0;
  const length = ui.slides.length;
  let animating = false;
  let observer;
  let animationDuration = 0.9;
  ui.slides.forEach((slide, index) => {
    slide.setAttribute('data-index', index);
  });
  ui.thumbs.forEach((thumb, index) => {
    thumb.setAttribute('data-index', index);
  });
  ui.slides[current].classList.add('is--current');
  ui.thumbs[current].classList.add('is--current');
  function navigate(direction, targetIndex = null) {
    if (animating) return;
    animating = true;
    observer.disable();
    const previous = current;
    current =
      targetIndex !== null && targetIndex !== undefined
        ? targetIndex
        : direction === 1
          ? current < length - 1
            ? current + 1
            : 0
          : current > 0
            ? current - 1
            : length - 1;
    const currentSlide = ui.slides[previous];
    const currentInner = ui.inner[previous];
    const upcomingSlide = ui.slides[current];
    const upcomingInner = ui.inner[current];
    gsap.timeline({
      defaults: {
        duration: animationDuration,
        ease: 'slideshow-wipe'
      },
      onStart: function() {
        upcomingSlide.classList.add('is--current');
        ui.thumbs[previous].classList.remove('is--current');
        ui.thumbs[current].classList.add('is--current');
      },
      onComplete: function() {
        currentSlide.classList.remove('is--current');
        animating = false;
        setTimeout(() => observer.enable(), animationDuration * 1000);
      }
    })
      .to(currentSlide, { xPercent: -direction * 100 },0)
      .to(currentInner, { xPercent: direction * 50 }, 0)
      .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
      .fromTo(upcomingInner, { xPercent: -direction * 50 }, { xPercent: 0 }, 0);
  }
  function onClick(event) {
    const targetIndex = parseInt(event.currentTarget.getAttribute('data-index'), 10);
    if (targetIndex === current || animating) return;
    const direction = targetIndex > current ? 1 : -1;
    navigate(direction, targetIndex);
  }
  ui.thumbs.forEach(thumb => {
    thumb.addEventListener('click', onClick);
  });
  observer = Observer.create({
    target: el,
    type: 'wheel,touch,pointer',
    onLeft: () => { if (!animating) navigate(1); },
    onRight: () => {if (!animating) navigate(-1); },
    onWheel: (event) => {
      if (animating) return;
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        if (event.deltaX > 50) {
          navigate(1);
        } else if (event.deltaX < -50) {
          navigate(-1);
        }
      }
    },
    wheelSpeed: -1,
    tolerance: 10
  });
  return {
    destroy: function() {
      if (observer) observer.kill();
      ui.thumbs.forEach(thumb => {
        thumb.removeEventListener('click', onClick);
      });
    }
  };
}

function initParallaxImageGalleryThumbnails() {
  let wrappers = document.querySelectorAll('[data-slideshow="wrap"]');
  wrappers.forEach(wrap => initSlideShow(wrap));
}

document.addEventListener('DOMContentLoaded', () => {
  initParallaxImageGalleryThumbnails();
}); 