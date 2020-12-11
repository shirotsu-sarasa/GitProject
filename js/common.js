// .productsBlock スライダー
$(function() {
    class ProductsSlider {
        constructor(sld, lmt) {
            this.sld = sld;
            this.lmt = lmt;
            this.itm = this.sld.find('.item');
            this.nxt = this.sld.find('.next');
            this.prv = this.sld.find('.prev');
            this.def = this.sld.find('.item:nth-child(-n+'+ this.lmt +')');
        }
        init() {
            return this.bind();
        }
        bind() {
            const _self = this;
            this.lmt >= this.itm.length ? this.itm.show().parents('.carousel').find('.next').hide()
            : this.def.addClass('active');
            this.nxt.on('click', () => {
                _self.nextAct();
            });
            this.prv.on('click', () => {
                _self.prevAct();
            });
        }
        nextAct() {
            const _self = this;
            _self.prv.show();
            this.actItm = this.sld.find('.item.active').eq(-1);
            this.actLgt = this.actItm.index()+1;
            if(_self.sld.find('.item:last-child').hasClass('active')) {
                _self.itm.removeClass('active').slice(_self.lmt, _self.lmt*2).addClass('active');
                _self.sld.find('.item:nth-child(-n+'+ _self.lmt +')');
            }else {
                _self.itm.removeClass('active').slice(this.actLgt, this.actLgt+=_self.lmt).addClass('active');
                if(_self.sld.find('.item:last-child').hasClass('active')) _self.nxt.hide();
            }
        }
        prevAct() {
            const _self = this;
            _self.nxt.show();
            this.actItm = _self.sld.find('.item.active').eq(0);
            this.actLgt = this.actItm.index();
            _self.itm.removeClass('active');
            if(this.actItm.prevAll().length === _self.lmt) {
                _self.prv.hide();
                _self.itm.slice(0, this.actLgt).addClass('active');
            }else {
                _self.itm.slice(this.actLgt-=_self.lmt, this.actLgt+=_self.lmt).addClass('active');
            }
        }
    }

    $('.productsBlock .flag + .carousel').each((i, e) => {
        new ProductsSlider($(e), 4).init();
    });

    $('.productsBlock .badge + .carousel').each((i, e) => {
        new ProductsSlider($(e), 3).init();
    });
});

// header スライダー
$(function() {
    const slider = '.mainSlider .carousel ul';
    const thumbnail = '.subSlider .carousel ul li';

    class HeaderSlider {
        constructor(sld, tmb) {
            this.sld = sld;
            this.tmb = tmb;
        }
        init() {
            return this.bind();
        }
        bind() {
            const _self = this;
            $(this.tmb).eq(0).addClass("currentSlide");
            $(this.tmb).each((i, e) => $(e).attr("data-index", $(_self.tmb).index(e)));
            $(this.sld).on('init', () => {
                this.idx = $(".slide-item.slick-slide.slick-current").attr("data-slick-index");
                $(_self.tmb +'[data-index="'+ this.idx +'"]').addClass("currentSlide");
            });
            $(this.sld).slick({
                nextArrow: '<p class="next"></p>',
                prevArrow: '<p class="prev"></p>',
                autoplay: true,
                arrows: true
            });
            $(this.tmb).on('click', e => {
                $(_self.sld).slick("slickGoTo", $(e.currentTarget).attr("data-index"), false);
            });
            $(this.sld).on('beforeChange', (event, slick, currentSlide, nextSlide) => {
                $(_self.tmb).each((i, e) => $(e).removeClass("currentSlide"));
                $(_self.tmb +'[data-index="'+ nextSlide +'"]').addClass("currentSlide");
            });
        }
    }

    new HeaderSlider(slider, thumbnail).init();
});
