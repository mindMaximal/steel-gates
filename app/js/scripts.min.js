document.addEventListener("DOMContentLoaded", ready);

// Popups
var popup = (function () {
    return function (selector) {
        var _trigers = document.querySelectorAll(selector);

        function popupOpen(elem) {
            var _modal = document.querySelector(elem);

            if (_modal.querySelector('.popup__close')) {
                _modal.querySelector('.popup__close').addEventListener('click', function () {
                    popupClose(elem);
                });
            }

            _modal.addEventListener('click', function (e) {
                if (e.target.classList.contains('popup')) {
                    popupClose(elem);                 
                }                
            });

            _modal.classList.add('popup--open');

            return true;
        }

        function popupClose (elem) {
            var _modal = document.querySelector(elem);

            _modal.classList.remove('popup--open');   

            return true;
        }

        for (var i = 0; i < _trigers.length; i++) {
           _trigers[i].addEventListener('click', function (e) {
               e.preventDefault();
               var id = this.getAttribute('href');             
               
               popupOpen(id);                
           });
        }

        return {
            open(id) {
                popupOpen(id);
            },
            close(id) {
                popupClose(id);
            }
        }
    }
}());

var popupContacts;

function ready() {

    // Menu
    document.querySelector('.button-menu').addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('button-menu--active');
        document.querySelector('.menu').classList.toggle('menu--active');
    })

    // Navigation mobile
    document.querySelector('.button-nav').addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('button-nav--active');
        document.querySelector('.header__list--mobile').classList.toggle('header__list--active');
    })

    // Constructor
    document.querySelectorAll('.constructor__button').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector('.constructor__button--active').classList.toggle('constructor__button--active');
            this.classList.toggle('constructor__button--active');
            
            if (this.classList.contains('constructor__button--sectional')) {

                if (document.querySelector('.constructor__sectional').classList.contains('constructor__wrapper--hidden')) {
                    document.querySelector('.constructor__sectional').classList.remove('constructor__wrapper--hidden');
                }

                if (!document.querySelector('.constructor__rollback').classList.contains('constructor__wrapper--hidden')) {
                    document.querySelector('.constructor__rollback').classList.add('constructor__wrapper--hidden');
                }             
                
                
            } else if (this.classList.contains('constructor__button--rollback')) {

                if (!document.querySelector('.constructor__sectional').classList.contains('constructor__wrapper--hidden')) {
                    document.querySelector('.constructor__sectional').classList.add('constructor__wrapper--hidden');
                }

                if (document.querySelector('.constructor__rollback').classList.contains('constructor__wrapper--hidden')) {
                    document.querySelector('.constructor__rollback').classList.remove('constructor__wrapper--hidden');
                }        

            }
        });
    });

    document.querySelectorAll('.choice-gate').forEach(el => {
        el.addEventListener('click', function (e) {
            e.preventDefault(); 

            if (this.closest('.constructor__wrapper').querySelector('.choice-gate__button--active')) {
                this.closest('.constructor__wrapper').querySelector('.choice-gate__button--active').classList.remove('choice-gate__button--active');
            }

            this.querySelector('.choice-gate__button').classList.toggle('choice-gate__button--active');
        })
    });

    // Popups
    if (document.querySelector('.popup--trigger')) {
        popupContacts = popup('.popup--trigger');        
    }

    document.querySelector('.menu--popup').addEventListener('click', function (e) {
        e.preventDefault();
        this.classList.toggle('button-menu--active');
        document.querySelector('.menu').classList.toggle('menu--active');
    });

    //Forms
    function submitHandler(e){    
        e.preventDefault();
        var self = this;
        fetch("mail.php", {
            method: "POST",
            body: new FormData(self)
        }).then(function() {
            if (document.querySelector('.popup--open')) {
                var id ='#' + document.querySelector('.popup--open').getAttribute('id');       
                popupContacts.close(id);
            }
            popupContacts.open("#popup-success-massage");
            //alert('Спасибо, скоро наши специалисты свяжутся с вами');
            self.reset();
        })
        .catch(function(error) { console.log(error); });
    } 

    document.querySelectorAll('.form').forEach(function(element) {
        element.addEventListener('submit', submitHandler);
    });
}