document.addEventListener('DOMContentLoaded', function() {
  
    let contactBtn = document.querySelector('.lets-start-section a');
    let contactSection = document.querySelector('.footer-contact-section');
    let hamburger = document.querySelector('.hamburger-menu');
    let mobileMenu = document.querySelector('.top-navigation');
  
    if (hamburger) {
      hamburger.addEventListener('click', function(e) {
        e.preventDefault();
        if (mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
        } else {
          mobileMenu.classList.add('open');
        }
      });
    }
    
    document.addEventListener('click', function(e) {
      if (mobileMenu.classList.contains('open') && !e.target.classList.contains('hamburger-menu') && !e.target.classList.contains('top-navigation')) {
        mobileMenu.classList.remove('open');
      }
    });
  
    if (contactBtn) {
      contactBtn.addEventListener('click', function(e) {
        e.preventDefault();
        contactSection.scrollIntoView({block: "center", behavior: "smooth"})
      });
    }
  
    let signUpForm = document.getElementById('mc-embedded-subscribe-form');
  
    if (signUpForm) {
      signUpForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let url = this.action.replace('/post?', '/post-json?');
        let data = '';
        let inputs = this.querySelectorAll('#mc-embedded-subscribe-form input');
        let submitButton = document.querySelector('[type="submit"]');
        let callback = 'callback';
        let script = document.createElement('script');
        let formMessage = document.querySelector('.form-message');
        let text = '';
  
        submitButton.setAttribute('disabled', 'disabled');
  
        for (let i = 0; i < inputs.length; i++) {
            data += '&' + inputs[i].name + '=' + encodeURIComponent(inputs[i].value);
        }
  
        script.src = url + data;
        document.body.appendChild(script);
  
        window[callback] = function(data) {
          formMessage.classList.remove('error', 'thank-you');
        
          if (data.result != "success") {
            submitButton.removeAttribute('disabled');
            if (data.msg.indexOf('Please enter a value') !== -1) {
              text = 'Please enter email.'
            } else if (data.msg.indexOf('must contain a single @') !== -1 || data.msg.indexOf('portion of the email address is invalid') !== -1) { 
              text = 'Please enter valid email.'
            } else if ( data.msg.indexOf('is already subscribed to list') !== -1 ) {
              text = 'Sorry, email already exist.'
            }
            formMessage.classList.add('error');
          } else {
            text = 'Thank you!'
            formMessage.classList.add('thank-you');
          }
  
          delete window[callback];
          document.body.removeChild(script);
  
          formMessage.innerHTML = text
        };
      });
    }
  
    // sidebar on post page
    // let post_page_left_bar = document.querySelector('.post-left-bar');
  
    // if (post_page_left_bar) {
    //   let headersArray = document.querySelectorAll('.post-content h2');
    //   let linksArray = document.querySelectorAll('.post-content a');
    //   let list = document.querySelector('.navigation');
  
    //   linksArray.forEach(function(item) {
    //     item.setAttribute('target', '_blank');
    //   });
  
    //   headersArray.forEach(function(item, index) {
    //     let anchorId = 'anchor-' + index;
    //     let href = document.createElement("a");
    //     let headingText = document.createTextNode(item.innerText);
    //     let linkHolder = document.createElement("li");
  
    //       item.setAttribute('target', anchorId);
  
    //       href.addEventListener('click', function(e) {
    //         e.preventDefault();
    //         let activeItems = document.querySelectorAll('.active');
    //         let id = this.getAttribute('href');
    //         let target = document.querySelector('[target="' + id + '"]');
  
    //         if (activeItems.length) {
    //           activeItems.forEach(function(item) {
    //             item.classList.remove('active');
    //           });
    //         }
  
    //         this.classList.add('active');
    //         target.classList.add('active');
    //         target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    //       });
  
    //       href.setAttribute('href', anchorId);
    //       href.append(headingText);
    //       linkHolder.append(href)
    //       list.append(linkHolder);
    //   });
  
    // let leftSidebar = document.querySelector('.post-left-bar');
    // let rightSidebar = document.querySelector('.post-right-bar');
    // let postWrapper = document.querySelector('.post-wrapper');
    // let header = document.querySelector('.header');
    // let footer = document.querySelector('.footer');
    // let container = document.querySelector('.post-wrapper.container');
  
    // function fixedIcons () {
    //   // fix icons when scrolling
    //   let tartgetHeight = header.offsetHeight + 40;
    //   let leftSidebarHeight = leftSidebar.offsetHeight;
    //   let leftSidebarOffsetBottom = leftSidebar.offsetTop + leftSidebarHeight;
    //   let footerHeight = footer.offsetTop - 40;
    //   let leftSidebarOffsetTop = leftSidebar.getBoundingClientRect().top;
  
    //   if (window.pageYOffset >= tartgetHeight) {
    //     if (!leftSidebar.classList.contains('fixed')){
    //       leftSidebar.classList.add('fixed');
    //       rightSidebar.classList.add('fixed');
    //       leftSidebar.style.left = container.offsetLeft + 15 + 'px';
    //       leftSidebar.style.top = '15px';
    //       rightSidebar.style.right = container.offsetLeft + 15 + 'px';
    //       rightSidebar.style.top = '15px';
    //     } else {
    //       if (footerHeight - window.pageYOffset <= leftSidebarOffsetBottom && leftSidebarOffsetTop <= 15) {
    //         if (!postWrapper.classList.contains('to-bottom')) {
    //           postWrapper.classList.add('to-bottom');
    //         }
    //       } else if (1) {
    //         if (postWrapper.classList.contains('to-bottom')) {
    //           postWrapper.classList.remove('to-bottom');
    //         }
    //       }
    //     }
    //   } else {
    //     rightSidebar.classList.remove('fixed');
    //     leftSidebar.classList.remove('fixed');
    //     leftSidebar.style.left = '15px';
    //     leftSidebar.style.top = '0';
    //     rightSidebar.style.right = '15px';
    //     rightSidebar.style.top = '0';
    //   }
    // }
  
    //   window.addEventListener('scroll', function(e) {
    //     // highlight headers
    //     if (window.innerWidth > 991) {
    //       setTimeout(function(){
    //         headersArray.forEach(function(item, index) {
    //           let topPosition = item.getBoundingClientRect().top;
    //           let id = +item.getAttribute('target').replace('anchor-', '') + 1;
    //           let nextItem = document.querySelector('[target="anchor-' + id + '"]');
    //           let topPositionNext;
  
    //           if (nextItem) {
    //             topPositionNext = nextItem.getBoundingClientRect().top;
    //             if (topPosition < 100 && topPositionNext > 100) {
    //               let navLinks = document.querySelectorAll('.active');
    //               let id = item.getAttribute('target');
    //               let navLink = document.querySelector('.navigation a[href="' + id + '"]');
    //               navLinks.forEach(function(item){
    //                 item.classList.remove('active');
    //               });
    //               item.classList.add('active');
    //               navLink.classList.add('active');
    //             }
    //           } else {
    //             if (topPosition < 50) {
    //               let navLinks = document.querySelectorAll('.active');
    //               let id = item.getAttribute('target');
    //               let navLink = document.querySelector('.navigation a[href="' + id + '"]');
    //               navLinks.forEach(function(item){
    //                 item.classList.remove('active');
    //               });
    //               item.classList.add('active');
    //               navLink.classList.add('active');
    //             }
    //           }
    //         });
    //       }, 100);
    //       fixedIcons();
    //     }
    //   });
  
    //   window.addEventListener('resize', function(e) {
    //     if (window.innerWidth <= 991) {
    //       if (rightSidebar.classList.contains('fixed')) {
    //         rightSidebar.classList.remove('fixed');
    //       }
    //     } else {
    //       if (leftSidebar.classList.contains('fixed')) {
    //         rightSidebar.classList.add('fixed');
    //         leftSidebar.style.left = container.offsetLeft + 15 + 'px';
    //         leftSidebar.style.top = '15px';
    //         rightSidebar.style.right = container.offsetLeft + 15 + 'px';
    //         rightSidebar.style.top = '15px';
    //       }
    //       fixedIcons();        
    //     }
    //   });
    // }
  });