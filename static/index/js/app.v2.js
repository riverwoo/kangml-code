if (typeof jQuery === "undefined") {
    throw new Error("Bootstrap requires jQuery")
}
+function($) {
    "use strict";
    function transitionEnd() {
        var el = document.createElement('bootstrap')
        var transEndEventNames = {'WebkitTransition': 'webkitTransitionEnd','MozTransition': 'transitionend','OTransition': 'oTransitionEnd otransitionend','transition': 'transitionend'}
        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return {end: transEndEventNames[name]}
            }
        }
    }
    $.fn.emulateTransitionEnd = function(duration) {
        var called = false, $el = this
        $(this).one($.support.transition.end, function() {
            called = true
        })
        var callback = function() {
            if (!called)
                $($el).trigger($.support.transition.end)
        }
        setTimeout(callback, duration)
        return this
    }
    $(function() {
        $.support.transition = transitionEnd()
    })
}(jQuery);
+function($) {
    "use strict";
    var dismiss = '[data-dismiss="alert"]'
    var Alert = function(el) {
        $(el).on('click', dismiss, this.close)
    }
    Alert.prototype.close = function(e) {
        var $this = $(this)
        var selector = $this.attr('data-target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        var $parent = $(selector)
        if (e)
            e.preventDefault()
        if (!$parent.length) {
            $parent = $this.hasClass('alert') ? $this : $this.parent()
        }
        $parent.trigger(e = $.Event('close.bs.alert'))
        if (e.isDefaultPrevented())
            return
        $parent.removeClass('in')
        function removeElement() {
            $parent.trigger('closed.bs.alert').remove()
        }
        $.support.transition && $parent.hasClass('fade') ? $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) : removeElement()
    }
    var old = $.fn.alert
    $.fn.alert = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.alert')
            if (!data)
                $this.data('bs.alert', (data = new Alert(this)))
            if (typeof option == 'string')
                data[option].call($this)
        })
    }
    $.fn.alert.Constructor = Alert
    $.fn.alert.noConflict = function() {
        $.fn.alert = old
        return this
    }
    $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
}(jQuery);
+function($) {
    "use strict";
    var Button = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Button.DEFAULTS, options)
    }
    Button.DEFAULTS = {loadingText: 'loading...'}
    Button.prototype.setState = function(state) {
        var d = 'disabled'
        var $el = this.$element
        var val = $el.is('input') ? 'val' : 'html'
        var data = $el.data()
        state = state + 'Text'
        if (!data.resetText)
            $el.data('resetText', $el[val]())
        $el[val](data[state] || this.options[state])
        setTimeout(function() {
            state == 'loadingText' ? $el.addClass(d).attr(d, d) : $el.removeClass(d).removeAttr(d);
        }, 0)
    }
    Button.prototype.toggle = function() {
        var $parent = this.$element.closest('[data-toggle="buttons"]')
        if ($parent.length) {
            var $input = this.$element.find('input')
            .prop('checked', !this.$element.hasClass('active'))
            .trigger('change')
            if ($input.prop('type') === 'radio')
                $parent.find('.active').removeClass('active')
        }
        this.$element.toggleClass('active')
    }
    var old = $.fn.button
    $.fn.button = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.button')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.button', (data = new Button(this, options)))
            if (option == 'toggle')
                data.toggle()
            else if (option)
                data.setState(option)
        })
    }
    $.fn.button.Constructor = Button
    $.fn.button.noConflict = function() {
        $.fn.button = old
        return this
    }
    $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function(e) {
        var $btn = $(e.target)
        if (!$btn.hasClass('btn'))
            $btn = $btn.closest('.btn')
        $btn.button('toggle')
        e.preventDefault()
    })
}(jQuery);
+function($) {
    "use strict";
    var Carousel = function(element, options) {
        this.$element = $(element)
        this.$indicators = this.$element.find('.carousel-indicators')
        this.options = options
        this.paused = this.sliding = this.interval = this.$active = this.$items = null
        this.options.pause == 'hover' && this.$element
        .on('mouseenter', $.proxy(this.pause, this))
        .on('mouseleave', $.proxy(this.cycle, this))
    }
    Carousel.DEFAULTS = {interval: 5000,pause: 'hover',wrap: true}
    Carousel.prototype.cycle = function(e) {
        e || (this.paused = false)
        this.interval && clearInterval(this.interval)
        this.options.interval && !this.paused && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))
        return this
    }
    Carousel.prototype.getActiveIndex = function() {
        this.$active = this.$element.find('.item.active')
        this.$items = this.$active.parent().children()
        return this.$items.index(this.$active)
    }
    Carousel.prototype.to = function(pos) {
        var that = this
        var activeIndex = this.getActiveIndex()
        if (pos > (this.$items.length - 1) || pos < 0)
            return
        if (this.sliding)
            return this.$element.one('slid', function() {
                that.to(pos)
            })
        if (activeIndex == pos)
            return this.pause().cycle()
        return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
    }
    Carousel.prototype.pause = function(e) {
        e || (this.paused = true)
        if (this.$element.find('.next, .prev').length && $.support.transition.end) {
            this.$element.trigger($.support.transition.end)
            this.cycle(true)
        }
        this.interval = clearInterval(this.interval)
        return this
    }
    Carousel.prototype.next = function() {
        if (this.sliding)
            return
        return this.slide('next')
    }
    Carousel.prototype.prev = function() {
        if (this.sliding)
            return
        return this.slide('prev')
    }
    Carousel.prototype.slide = function(type, next) {
        var $active = this.$element.find('.item.active')
        var $next = next || $active[type]()
        var isCycling = this.interval
        var direction = type == 'next' ? 'left' : 'right'
        var fallback = type == 'next' ? 'first' : 'last'
        var that = this
        if (!$next.length) {
            if (!this.options.wrap)
                return
            $next = this.$element.find('.item')[fallback]()
        }
        this.sliding = true
        isCycling && this.pause()
        var e = $.Event('slide.bs.carousel', {relatedTarget: $next[0],direction: direction})
        if ($next.hasClass('active'))
            return
        if (this.$indicators.length) {
            this.$indicators.find('.active').removeClass('active')
            this.$element.one('slid', function() {
                var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
                $nextIndicator && $nextIndicator.addClass('active')
            })
        }
        if ($.support.transition && this.$element.hasClass('slide')) {
            this.$element.trigger(e)
            if (e.isDefaultPrevented())
                return
            $next.addClass(type)
            $next[0].offsetWidth
            $active.addClass(direction)
            $next.addClass(direction)
            $active
            .one($.support.transition.end, function() {
                $next.removeClass([type, direction].join(' ')).addClass('active')
                $active.removeClass(['active', direction].join(' '))
                that.sliding = false
                setTimeout(function() {
                    that.$element.trigger('slid')
                }, 0)
            })
            .emulateTransitionEnd(600)
        } else {
            this.$element.trigger(e)
            if (e.isDefaultPrevented())
                return
            $active.removeClass('active')
            $next.addClass('active')
            this.sliding = false
            this.$element.trigger('slid')
        }
        isCycling && this.cycle()
        return this
    }
    var old = $.fn.carousel
    $.fn.carousel = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.carousel')
            var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
            var action = typeof option == 'string' ? option : options.slide
            if (!data)
                $this.data('bs.carousel', (data = new Carousel(this, options)))
            if (typeof option == 'number')
                data.to(option)
            else if (action)
                data[action]()
            else if (options.interval)
                data.pause().cycle()
        })
    }
    $.fn.carousel.Constructor = Carousel
    $.fn.carousel.noConflict = function() {
        $.fn.carousel = old
        return this
    }
    $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function(e) {
        var $this = $(this), href
        var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''))
        var options = $.extend({}, $target.data(), $this.data())
        var slideIndex = $this.attr('data-slide-to')
        if (slideIndex)
            options.interval = false
        $target.carousel(options)
        if (slideIndex = $this.attr('data-slide-to')) {
            $target.data('bs.carousel').to(slideIndex)
        }
        e.preventDefault()
    })
    $(window).on('load', function() {
        $('[data-ride="carousel"]').each(function() {
            var $carousel = $(this)
            $carousel.carousel($carousel.data())
        })
    })
}(jQuery);
+function($) {
    "use strict";
    var Collapse = function(element, options) {
        this.$element = $(element)
        this.options = $.extend({}, Collapse.DEFAULTS, options)
        this.transitioning = null
        if (this.options.parent)
            this.$parent = $(this.options.parent)
        if (this.options.toggle)
            this.toggle()
    }
    Collapse.DEFAULTS = {toggle: true}
    Collapse.prototype.dimension = function() {
        var hasWidth = this.$element.hasClass('width')
        return hasWidth ? 'width' : 'height'
    }
    Collapse.prototype.show = function() {
        if (this.transitioning || this.$element.hasClass('in'))
            return
        var startEvent = $.Event('show.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented())
            return
        var actives = this.$parent && this.$parent.find('> .panel > .in')
        if (actives && actives.length) {
            var hasData = actives.data('bs.collapse')
            if (hasData && hasData.transitioning)
                return
            actives.collapse('hide')
            hasData || actives.data('bs.collapse', null)
        }
        var dimension = this.dimension()
        this.$element
        .removeClass('collapse')
        .addClass('collapsing')
        [dimension](0)
        this.transitioning = 1
        var complete = function() {
            this.$element
            .removeClass('collapsing')
            .addClass('in')
            [dimension]('auto')
            this.transitioning = 0
            this.$element.trigger('shown.bs.collapse')
        }
        if (!$.support.transition)
            return complete.call(this)
        var scrollSize = $.camelCase(['scroll', dimension].join('-'))
        this.$element
        .one($.support.transition.end, $.proxy(complete, this))
        .emulateTransitionEnd(350)
        [dimension](this.$element[0][scrollSize])
    }
    Collapse.prototype.hide = function() {
        if (this.transitioning || !this.$element.hasClass('in'))
            return
        var startEvent = $.Event('hide.bs.collapse')
        this.$element.trigger(startEvent)
        if (startEvent.isDefaultPrevented())
            return
        var dimension = this.dimension()
        this.$element
        [dimension](this.$element[dimension]())
        [0].offsetHeight
        this.$element
        .addClass('collapsing')
        .removeClass('collapse')
        .removeClass('in')
        this.transitioning = 1
        var complete = function() {
            this.transitioning = 0
            this.$element
            .trigger('hidden.bs.collapse')
            .removeClass('collapsing')
            .addClass('collapse')
        }
        if (!$.support.transition)
            return complete.call(this)
        this.$element
        [dimension](0)
        .one($.support.transition.end, $.proxy(complete, this))
        .emulateTransitionEnd(350)
    }
    Collapse.prototype.toggle = function() {
        this[this.$element.hasClass('in') ? 'hide' : 'show']()
    }
    var old = $.fn.collapse
    $.fn.collapse = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.collapse')
            var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data)
                $this.data('bs.collapse', (data = new Collapse(this, options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.collapse.Constructor = Collapse
    $.fn.collapse.noConflict = function() {
        $.fn.collapse = old
        return this
    }
    $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function(e) {
        var $this = $(this), href
        var target = $this.attr('data-target') || e.preventDefault() || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')
        var $target = $(target)
        var data = $target.data('bs.collapse')
        var option = data ? 'toggle' : $this.data()
        var parent = $this.attr('data-parent')
        var $parent = parent && $(parent)
        if (!data || !data.transitioning) {
            if ($parent)
                $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
            $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
        }
        $target.collapse(option)
    })
}(jQuery);
+function($) {
    "use strict";
    var backdrop = '.dropdown-backdrop'
    var toggle = '[data-toggle=dropdown]'
    var Dropdown = function(element) {
        var $el = $(element).on('click.bs.dropdown', this.toggle)
    }
    Dropdown.prototype.toggle = function(e) {
        var $this = $(this)
        if ($this.is('.disabled, :disabled'))
            return
        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')
        clearMenus()
        if (!isActive) {
            if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
                $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
            }
            $parent.trigger(e = $.Event('show.bs.dropdown'))
            if (e.isDefaultPrevented())
                return
            $parent
            .toggleClass('open')
            .trigger('shown.bs.dropdown')
            $this.focus()
        }
        return false
    }
    Dropdown.prototype.keydown = function(e) {
        if (!/(38|40|27)/.test(e.keyCode))
            return
        var $this = $(this)
        e.preventDefault()
        e.stopPropagation()
        if ($this.is('.disabled, :disabled'))
            return
        var $parent = getParent($this)
        var isActive = $parent.hasClass('open')
        if (!isActive || (isActive && e.keyCode == 27)) {
            if (e.which == 27)
                $parent.find(toggle).focus()
            return $this.click()
        }
        var $items = $('[role=menu] li:not(.divider):visible a', $parent)
        if (!$items.length)
            return
        var index = $items.index($items.filter(':focus'))
        if (e.keyCode == 38 && index > 0)
            index--
        if (e.keyCode == 40 && index < $items.length - 1)
            index++
        if (!~index)
            index = 0
        $items.eq(index).focus()
    }
    function clearMenus() {
        $(backdrop).remove()
        $(toggle).each(function(e) {
            var $parent = getParent($(this))
            if (!$parent.hasClass('open'))
                return
            $parent.trigger(e = $.Event('hide.bs.dropdown'))
            if (e.isDefaultPrevented())
                return
            $parent.removeClass('open').trigger('hidden.bs.dropdown')
        })
    }
    function getParent($this) {
        var selector = $this.attr('data-target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        var $parent = selector && $(selector)
        return $parent && $parent.length ? $parent : $this.parent()
    }
    var old = $.fn.dropdown
    $.fn.dropdown = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('dropdown')
            if (!data)
                $this.data('dropdown', (data = new Dropdown(this)))
            if (typeof option == 'string')
                data[option].call($this)
        })
    }
    $.fn.dropdown.Constructor = Dropdown
    $.fn.dropdown.noConflict = function() {
        $.fn.dropdown = old
        return this
    }
    $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function(e) {
        e.stopPropagation()
    })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]', Dropdown.prototype.keydown)
}(jQuery);
+function($) {
    "use strict";
    var Modal = function(element, options) {
        this.options = options
        this.$element = $(element)
        this.$backdrop = this.isShown = null
        if (this.options.remote)
            this.$element.load(this.options.remote)
    }
    Modal.DEFAULTS = {backdrop: true,keyboard: true,show: true}
    Modal.prototype.toggle = function(_relatedTarget) {
        return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
    }
    Modal.prototype.show = function(_relatedTarget) {
        var that = this
        var e = $.Event('show.bs.modal', {relatedTarget: _relatedTarget})
        this.$element.trigger(e)
        if (this.isShown || e.isDefaultPrevented())
            return
        this.isShown = true
        this.escape()
        this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))
        this.backdrop(function() {
            var transition = $.support.transition && that.$element.hasClass('fade')
            if (!that.$element.parent().length) {
                that.$element.appendTo(document.body)
            }
            that.$element.show()
            if (transition) {
                that.$element[0].offsetWidth
            }
            that.$element
            .addClass('in')
            .attr('aria-hidden', false)
            that.enforceFocus()
            var e = $.Event('shown.bs.modal', {relatedTarget: _relatedTarget})
            transition ? that.$element.find('.modal-dialog')
            .one($.support.transition.end, function() {
                that.$element.focus().trigger(e)
            })
            .emulateTransitionEnd(300) : that.$element.focus().trigger(e)
        })
    }
    Modal.prototype.hide = function(e) {
        if (e)
            e.preventDefault()
        e = $.Event('hide.bs.modal')
        this.$element.trigger(e)
        if (!this.isShown || e.isDefaultPrevented())
            return
        this.isShown = false
        this.escape()
        $(document).off('focusin.bs.modal')
        this.$element
        .removeClass('in')
        .attr('aria-hidden', true)
        .off('click.dismiss.modal')
        $.support.transition && this.$element.hasClass('fade') ? this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) : this.hideModal()
    }
    Modal.prototype.enforceFocus = function() {
        $(document)
        .off('focusin.bs.modal')
        .on('focusin.bs.modal', $.proxy(function(e) {
            if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
                this.$element.focus()
            }
        }, this))
    }
    Modal.prototype.escape = function() {
        if (this.isShown && this.options.keyboard) {
            this.$element.on('keyup.dismiss.bs.modal', $.proxy(function(e) {
                e.which == 27 && this.hide()
            }, this))
        } else if (!this.isShown) {
            this.$element.off('keyup.dismiss.bs.modal')
        }
    }
    Modal.prototype.hideModal = function() {
        var that = this
        this.$element.hide()
        this.backdrop(function() {
            that.removeBackdrop()
            that.$element.trigger('hidden.bs.modal')
        })
    }
    Modal.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove()
        this.$backdrop = null
    }
    Modal.prototype.backdrop = function(callback) {
        var that = this
        var animate = this.$element.hasClass('fade') ? 'fade' : ''
        if (this.isShown && this.options.backdrop) {
            var doAnimate = $.support.transition && animate
            this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
            .appendTo(document.body)
            this.$element.on('click.dismiss.modal', $.proxy(function(e) {
                if (e.target !== e.currentTarget)
                    return
                this.options.backdrop == 'static' ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this)
            }, this))
            if (doAnimate)
                this.$backdrop[0].offsetWidth
            this.$backdrop.addClass('in')
            if (!callback)
                return
            doAnimate ? this.$backdrop
            .one($.support.transition.end, callback)
            .emulateTransitionEnd(150) : callback()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass('in')
            $.support.transition && this.$element.hasClass('fade') ? this.$backdrop
            .one($.support.transition.end, callback)
            .emulateTransitionEnd(150) : callback()
        } else if (callback) {
            callback()
        }
    }
    var old = $.fn.modal
    $.fn.modal = function(option, _relatedTarget) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.modal')
            var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)
            if (!data)
                $this.data('bs.modal', (data = new Modal(this, options)))
            if (typeof option == 'string')
                data[option](_relatedTarget)
            else if (options.show)
                data.show(_relatedTarget)
        })
    }
    $.fn.modal.Constructor = Modal
    $.fn.modal.noConflict = function() {
        $.fn.modal = old
        return this
    }
    $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function(e) {
        var $this = $(this)
        var href = $this.attr('href')
        var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, '')))
        var option = $target.data('modal') ? 'toggle' : $.extend({remote: !/#/.test(href) && href}, $target.data(), $this.data())
        e.preventDefault()
        $target
        .modal(option, this)
        .one('hide', function() {
            $this.is(':visible') && $this.focus()
        })
    })
    $(document)
    .on('show.bs.modal', '.modal', function() {
        $(document.body).addClass('modal-open')
    })
    .on('hidden.bs.modal', '.modal', function() {
        $(document.body).removeClass('modal-open')
    })
}(jQuery);
+function($) {
    "use strict";
    var Tooltip = function(element, options) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null
        this.init('tooltip', element, options)
    }
    Tooltip.DEFAULTS = {animation: true,placement: 'top',selector: false,template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger: 'hover focus',title: '',delay: 0,html: false,container: false}
    Tooltip.prototype.init = function(type, element, options) {
        this.enabled = true
        this.type = type
        this.$element = $(element)
        this.options = this.getOptions(options)
        var triggers = this.options.trigger.split(' ')
        for (var i = triggers.length; i--; ) {
            var trigger = triggers[i]
            if (trigger == 'click') {
                this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
            } else if (trigger != 'manual') {
                var eventIn = trigger == 'hover' ? 'mouseenter' : 'focus'
                var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'
                this.$element.on(eventIn + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
                this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
            }
        }
        this.options.selector ? (this._options = $.extend({}, this.options, {trigger: 'manual',selector: ''})) : this.fixTitle()
    }
    Tooltip.prototype.getDefaults = function() {
        return Tooltip.DEFAULTS
    }
    Tooltip.prototype.getOptions = function(options) {
        options = $.extend({}, this.getDefaults(), this.$element.data(), options)
        if (options.delay && typeof options.delay == 'number') {
            options.delay = {show: options.delay,hide: options.delay}
        }
        return options
    }
    Tooltip.prototype.getDelegateOptions = function() {
        var options = {}
        var defaults = this.getDefaults()
        this._options && $.each(this._options, function(key, value) {
            if (defaults[key] != value)
                options[key] = value
        })
        return options
    }
    Tooltip.prototype.enter = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
        clearTimeout(self.timeout)
        self.hoverState = 'in'
        if (!self.options.delay || !self.options.delay.show)
            return self.show()
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'in')
                self.show()
        }, self.options.delay.show)
    }
    Tooltip.prototype.leave = function(obj) {
        var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
        clearTimeout(self.timeout)
        self.hoverState = 'out'
        if (!self.options.delay || !self.options.delay.hide)
            return self.hide()
        self.timeout = setTimeout(function() {
            if (self.hoverState == 'out')
                self.hide()
        }, self.options.delay.hide)
    }
    Tooltip.prototype.show = function() {
        var e = $.Event('show.bs.' + this.type)
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(e)
            if (e.isDefaultPrevented())
                return
            var $tip = this.tip()
            this.setContent()
            if (this.options.animation)
                $tip.addClass('fade')
            var placement = typeof this.options.placement == 'function' ? this.options.placement.call(this, $tip[0], this.$element[0]) : this.options.placement
            var autoToken = /\s?auto?\s?/i
            var autoPlace = autoToken.test(placement)
            if (autoPlace)
                placement = placement.replace(autoToken, '') || 'top'
            $tip
            .detach()
            .css({top: 0,left: 0,display: 'block'})
            .addClass(placement)
            this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
            var pos = this.getPosition()
            var actualWidth = $tip[0].offsetWidth
            var actualHeight = $tip[0].offsetHeight
            if (autoPlace) {
                var $parent = this.$element.parent()
                var orgPlacement = placement
                var docScroll = document.documentElement.scrollTop || document.body.scrollTop
                var parentWidth = this.options.container == 'body' ? window.innerWidth : $parent.outerWidth()
                var parentHeight = this.options.container == 'body' ? window.innerHeight : $parent.outerHeight()
                var parentLeft = this.options.container == 'body' ? 0 : $parent.offset().left
                placement = placement == 'bottom' && pos.top + pos.height + actualHeight - docScroll > parentHeight ? 'top' : placement == 'top' && pos.top - docScroll - actualHeight < 0 ? 'bottom' : placement == 'right' && pos.right + actualWidth > parentWidth ? 'left' : placement == 'left' && pos.left - actualWidth < parentLeft ? 'right' : placement
                $tip
                .removeClass(orgPlacement)
                .addClass(placement)
            }
            var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)
            this.applyPlacement(calculatedOffset, placement)
            this.$element.trigger('shown.bs.' + this.type)
        }
    }
    Tooltip.prototype.applyPlacement = function(offset, placement) {
        var replace
        var $tip = this.tip()
        var width = $tip[0].offsetWidth
        var height = $tip[0].offsetHeight
        var marginTop = parseInt($tip.css('margin-top'), 10)
        var marginLeft = parseInt($tip.css('margin-left'), 10)
        if (isNaN(marginTop))
            marginTop = 0
        if (isNaN(marginLeft))
            marginLeft = 0
        offset.top = offset.top + marginTop
        offset.left = offset.left + marginLeft
        $tip
        .offset(offset)
        .addClass('in')
        var actualWidth = $tip[0].offsetWidth
        var actualHeight = $tip[0].offsetHeight
        if (placement == 'top' && actualHeight != height) {
            replace = true
            offset.top = offset.top + height - actualHeight
        }
        if (/bottom|top/.test(placement)) {
            var delta = 0
            if (offset.left < 0) {
                delta = offset.left * -2
                offset.left = 0
                $tip.offset(offset)
                actualWidth = $tip[0].offsetWidth
                actualHeight = $tip[0].offsetHeight
            }
            this.replaceArrow(delta - width + actualWidth, actualWidth, 'left')
        } else {
            this.replaceArrow(actualHeight - height, actualHeight, 'top')
        }
        if (replace)
            $tip.offset(offset)
    }
    Tooltip.prototype.replaceArrow = function(delta, dimension, position) {
        this.arrow().css(position, delta ? (50 * (1 - delta / dimension) + "%") : '')
    }
    Tooltip.prototype.setContent = function() {
        var $tip = this.tip()
        var title = this.getTitle()
        $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
        $tip.removeClass('fade in top bottom left right')
    }
    Tooltip.prototype.hide = function() {
        var that = this
        var $tip = this.tip()
        var e = $.Event('hide.bs.' + this.type)
        function complete() {
            if (that.hoverState != 'in')
                $tip.detach()
        }
        this.$element.trigger(e)
        if (e.isDefaultPrevented())
            return
        $tip.removeClass('in')
        $.support.transition && this.$tip.hasClass('fade') ? $tip
        .one($.support.transition.end, complete)
        .emulateTransitionEnd(150) : complete()
        this.$element.trigger('hidden.bs.' + this.type)
        return this
    }
    Tooltip.prototype.fixTitle = function() {
        var $e = this.$element
        if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
            $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
        }
    }
    Tooltip.prototype.hasContent = function() {
        return this.getTitle()
    }
    Tooltip.prototype.getPosition = function() {
        var el = this.$element[0]
        return $.extend({}, (typeof el.getBoundingClientRect == 'function') ? el.getBoundingClientRect() : {width: el.offsetWidth,height: el.offsetHeight}, this.$element.offset())
    }
    Tooltip.prototype.getCalculatedOffset = function(placement, pos, actualWidth, actualHeight) {
        return placement == 'bottom' ? {top: pos.top + pos.height,left: pos.left + pos.width / 2 - actualWidth / 2} : placement == 'top' ? {top: pos.top - actualHeight,left: pos.left + pos.width / 2 - actualWidth / 2} : placement == 'left' ? {top: pos.top + pos.height / 2 - actualHeight / 2,left: pos.left - actualWidth} : {top: pos.top + pos.height / 2 - actualHeight / 2,left: pos.left + pos.width}
    }
    Tooltip.prototype.getTitle = function() {
        var title
        var $e = this.$element
        var o = this.options
        title = $e.attr('data-original-title') || (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)
        return title
    }
    Tooltip.prototype.tip = function() {
        return this.$tip = this.$tip || $(this.options.template)
    }
    Tooltip.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow')
    }
    Tooltip.prototype.validate = function() {
        if (!this.$element[0].parentNode) {
            this.hide()
            this.$element = null
            this.options = null
        }
    }
    Tooltip.prototype.enable = function() {
        this.enabled = true
    }
    Tooltip.prototype.disable = function() {
        this.enabled = false
    }
    Tooltip.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }
    Tooltip.prototype.toggle = function(e) {
        var self = e ? $(e.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type) : this
        self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
    Tooltip.prototype.destroy = function() {
        this.hide().$element.off('.' + this.type).removeData('bs.' + this.type)
    }
    var old = $.fn.tooltip
    $.fn.tooltip = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.tooltip')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.tooltip', (data = new Tooltip(this, options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.tooltip.Constructor = Tooltip
    $.fn.tooltip.noConflict = function() {
        $.fn.tooltip = old
        return this
    }
}(jQuery);
+function($) {
    "use strict";
    var Popover = function(element, options) {
        this.init('popover', element, options)
    }
    if (!$.fn.tooltip)
        throw new Error('Popover requires tooltip.js')
    Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {placement: 'right',trigger: 'click',content: '',template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'})
    Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
    Popover.prototype.constructor = Popover
    Popover.prototype.getDefaults = function() {
        return Popover.DEFAULTS
    }
    Popover.prototype.setContent = function() {
        var $tip = this.tip()
        var title = this.getTitle()
        var content = this.getContent()
        $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
        $tip.find('.popover-content')[this.options.html ? 'html' : 'text'](content)
        $tip.removeClass('fade top bottom left right in')
        if (!$tip.find('.popover-title').html())
            $tip.find('.popover-title').hide()
    }
    Popover.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }
    Popover.prototype.getContent = function() {
        var $e = this.$element
        var o = this.options
        return $e.attr('data-content') || (typeof o.content == 'function' ? o.content.call($e[0]) : o.content)
    }
    Popover.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find('.arrow')
    }
    Popover.prototype.tip = function() {
        if (!this.$tip)
            this.$tip = $(this.options.template)
        return this.$tip
    }
    var old = $.fn.popover
    $.fn.popover = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.popover')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.popover', (data = new Popover(this, options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.popover.Constructor = Popover
    $.fn.popover.noConflict = function() {
        $.fn.popover = old
        return this
    }
}(jQuery);
+function($) {
    "use strict";
    function ScrollSpy(element, options) {
        var href
        var process = $.proxy(this.process, this)
        this.$element = $(element).is('body') ? $(window) : $(element)
        this.$body = $('body')
        this.$scrollElement = this.$element.on('scroll.bs.scroll-spy.data-api', process)
        this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
        this.selector = (this.options.target || ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) || '') + ' .nav li > a'
        this.offsets = $([])
        this.targets = $([])
        this.activeTarget = null
        this.refresh()
        this.process()
    }
    ScrollSpy.DEFAULTS = {offset: 10}
    ScrollSpy.prototype.refresh = function() {
        var offsetMethod = this.$element[0] == window ? 'offset' : 'position'
        this.offsets = $([])
        this.targets = $([])
        var self = this
        var $targets = this.$body
        .find(this.selector)
        .map(function() {
            var $el = $(this)
            var href = $el.data('target') || $el.attr('href')
            var $href = /^#\w/.test(href) && $(href)
            return ($href && $href.length && [[$href[offsetMethod]().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]]) || null
        })
        .sort(function(a, b) {
            return a[0] - b[0]
        })
        .each(function() {
            self.offsets.push(this[0])
            self.targets.push(this[1])
        })
    }
    ScrollSpy.prototype.process = function() {
        var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
        var scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight
        var maxScroll = scrollHeight - this.$scrollElement.height()
        var offsets = this.offsets
        var targets = this.targets
        var activeTarget = this.activeTarget
        var i
        if (scrollTop >= maxScroll) {
            return activeTarget != (i = targets.last()[0]) && this.activate(i)
        }
        for (i = offsets.length; i--; ) {
            activeTarget != targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i])
        }
    }
    ScrollSpy.prototype.activate = function(target) {
        this.activeTarget = target
        $(this.selector)
        .parents('.active')
        .removeClass('active')
        var selector = this.selector + '[data-target="' + target + '"],' + this.selector + '[href="' + target + '"]'
        var active = $(selector)
        .parents('li')
        .addClass('active')
        if (active.parent('.dropdown-menu').length) {
            active = active
            .closest('li.dropdown')
            .addClass('active')
        }
        active.trigger('activate')
    }
    var old = $.fn.scrollspy
    $.fn.scrollspy = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.scrollspy')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.scrollspy.Constructor = ScrollSpy
    $.fn.scrollspy.noConflict = function() {
        $.fn.scrollspy = old
        return this
    }
    $(window).on('load', function() {
        $('[data-spy="scroll"]').each(function() {
            var $spy = $(this)
            $spy.scrollspy($spy.data())
        })
    })
}(jQuery);
+function($) {
    "use strict";
    var Tab = function(element) {
        this.element = $(element)
    }
    Tab.prototype.show = function() {
        var $this = this.element
        var $ul = $this.closest('ul:not(.dropdown-menu)')
        var selector = $this.data('target')
        if (!selector) {
            selector = $this.attr('href')
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '')
        }
        if ($this.parent('li').hasClass('active'))
            return
        var previous = $ul.find('.active:last a')[0]
        var e = $.Event('show.bs.tab', {relatedTarget: previous})
        $this.trigger(e)
        if (e.isDefaultPrevented())
            return
        var $target = $(selector)
        this.activate($this.parent('li'), $ul)
        this.activate($target, $target.parent(), function() {
            $this.trigger({type: 'shown.bs.tab',relatedTarget: previous})
        })
    }
    Tab.prototype.activate = function(element, container, callback) {
        var $active = container.find('> .active')
        var transition = callback && $.support.transition && $active.hasClass('fade')
        function next() {
            $active
            .removeClass('active')
            .find('> .dropdown-menu > .active')
            .removeClass('active')
            element.addClass('active')
            if (transition) {
                element[0].offsetWidth
                element.addClass('in')
            } else {
                element.removeClass('fade')
            }
            if (element.parent('.dropdown-menu')) {
                element.closest('li.dropdown').addClass('active')
            }
            callback && callback()
        }
        transition ? $active
        .one($.support.transition.end, next)
        .emulateTransitionEnd(150) : next()
        $active.removeClass('in')
    }
    var old = $.fn.tab
    $.fn.tab = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.tab')
            if (!data)
                $this.data('bs.tab', (data = new Tab(this)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.tab.Constructor = Tab
    $.fn.tab.noConflict = function() {
        $.fn.tab = old
        return this
    }
    $(document).on('click.bs.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault()
        $(this).tab('show')
    })
}(jQuery);
+function($) {
    "use strict";
    var Affix = function(element, options) {
        this.options = $.extend({}, Affix.DEFAULTS, options)
        this.$window = $(window)
        .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
        .on('click.bs.affix.data-api', $.proxy(this.checkPositionWithEventLoop, this))
        this.$element = $(element)
        this.affixed = this.unpin = null
        this.checkPosition()
    }
    Affix.RESET = 'affix affix-top affix-bottom'
    Affix.DEFAULTS = {offset: 0}
    Affix.prototype.checkPositionWithEventLoop = function() {
        setTimeout($.proxy(this.checkPosition, this), 1)
    }
    Affix.prototype.checkPosition = function() {
        if (!this.$element.is(':visible'))
            return
        var scrollHeight = $(document).height()
        var scrollTop = this.$window.scrollTop()
        var position = this.$element.offset()
        var offset = this.options.offset
        var offsetTop = offset.top
        var offsetBottom = offset.bottom
        if (typeof offset != 'object')
            offsetBottom = offsetTop = offset
        if (typeof offsetTop == 'function')
            offsetTop = offset.top()
        if (typeof offsetBottom == 'function')
            offsetBottom = offset.bottom()
        var affix = this.unpin != null && (scrollTop + this.unpin <= position.top) ? false : offsetBottom != null && (position.top + this.$element.height() >= scrollHeight - offsetBottom) ? 'bottom' : offsetTop != null && (scrollTop <= offsetTop) ? 'top' : false
        if (this.affixed === affix)
            return
        if (this.unpin)
            this.$element.css('top', '')
        this.affixed = affix
        this.unpin = affix == 'bottom' ? position.top - scrollTop : null
        this.$element.removeClass(Affix.RESET).addClass('affix' + (affix ? '-' + affix : ''))
        if (affix == 'bottom') {
            this.$element.offset({top: document.body.offsetHeight - offsetBottom - this.$element.height()})
        }
    }
    var old = $.fn.affix
    $.fn.affix = function(option) {
        return this.each(function() {
            var $this = $(this)
            var data = $this.data('bs.affix')
            var options = typeof option == 'object' && option
            if (!data)
                $this.data('bs.affix', (data = new Affix(this, options)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.affix.Constructor = Affix
    $.fn.affix.noConflict = function() {
        $.fn.affix = old
        return this
    }
    $(window).on('load', function() {
        $('[data-spy="affix"]').each(function() {
            var $spy = $(this)
            var data = $spy.data()
            data.offset = data.offset || {}
            if (data.offsetBottom)
                data.offset.bottom = data.offsetBottom
            if (data.offsetTop)
                data.offset.top = data.offsetTop
            $spy.affix(data)
        })
    })
}(jQuery);
;
(function(h, j, e) {
    var a = "placeholder" in j.createElement("input");
    var f = "placeholder" in j.createElement("textarea");
    var k = e.fn;
    var d = e.valHooks;
    var b = e.propHooks;
    var m;
    var l;
    if (a && f) {
        l = k.placeholder = function() {
            return this
        };
        l.input = l.textarea = true
    } else {
        l = k.placeholder = function() {
            var n = this;
            n.filter((a ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({"focus.placeholder": c,"blur.placeholder": g}).data("placeholder-enabled", true).trigger("blur.placeholder");
            return n
        };
        l.input = a;
        l.textarea = f;
        m = {get: function(o) {
                var n = e(o);
                var p = n.data("placeholder-password");
                if (p) {
                    return p[0].value
                }
                return n.data("placeholder-enabled") && n.hasClass("placeholder") ? "" : o.value
            },set: function(o, q) {
                var n = e(o);
                var p = n.data("placeholder-password");
                if (p) {
                    return p[0].value = q
                }
                if (!n.data("placeholder-enabled")) {
                    return o.value = q
                }
                if (q == "") {
                    o.value = q;
                    if (o != j.activeElement) {
                        g.call(o)
                    }
                } else {
                    if (n.hasClass("placeholder")) {
                        c.call(o, true, q) || (o.value = q)
                    } else {
                        o.value = q
                    }
                }
                return n
            }};
        if (!a) {
            d.input = m;
            b.value = m
        }
        if (!f) {
            d.textarea = m;
            b.value = m
        }
        e(function() {
            e(j).delegate("form", "submit.placeholder", function() {
                var n = e(".placeholder", this).each(c);
                setTimeout(function() {
                    n.each(g)
                }, 10)
            })
        });
        e(h).bind("beforeunload.placeholder", function() {
            e(".placeholder").each(function() {
                this.value = ""
            })
        })
    }
    function i(o) {
        var n = {};
        var p = /^jQuery\d+$/;
        e.each(o.attributes, function(r, q) {
            if (q.specified && !p.test(q.name)) {
                n[q.name] = q.value
            }
        });
        return n
    }
    function c(o, p) {
        var n = this;
        var q = e(n);
        if (n.value == q.attr("placeholder") && q.hasClass("placeholder")) {
            if (q.data("placeholder-password")) {
                q = q.hide().next().show().attr("id", q.removeAttr("id").data("placeholder-id"));
                if (o === true) {
                    return q[0].value = p
                }
                q.focus()
            } else {
                n.value = "";
                q.removeClass("placeholder");
                n == j.activeElement && n.select()
            }
        }
    }
    function g() {
        var r;
        var n = this;
        var q = e(n);
        var p = this.id;
        if (n.value == "") {
            if (n.type == "password") {
                if (!q.data("placeholder-textinput")) {
                    try {
                        r = q.clone().attr({type: "text"})
                    } catch (o) {
                        r = e("<input>").attr(e.extend(i(this), {type: "text"}))
                    }
                    r.removeAttr("name").data({"placeholder-password": q,"placeholder-id": p}).bind("focus.placeholder", c);
                    q.data({"placeholder-textinput": r,"placeholder-id": p}).before(r)
                }
                q = q.removeAttr("id").hide().prev().attr("id", p).show()
            }
            q.addClass("placeholder");
            q[0].value = q.attr("placeholder")
        } else {
            q.removeClass("placeholder")
        }
    }
}(this, document, jQuery));
;
window.Modernizr = function(a, b, c) {
    function w(a) {
        j.cssText = a
    }
    function x(a, b) {
        return w(m.join(a + ";") + (b || ""))
    }
    function y(a, b) {
        return typeof a === b
    }
    function z(a, b) {
        return !!~("" + a).indexOf(b)
    }
    function A(a, b, d) {
        for (var e in a) {
            var f = b[a[e]];
            if (f !== c)
                return d === !1 ? a[e] : y(f, "function") ? f.bind(d || b) : f
        }
        return !1
    }
    var d = "2.6.2", e = {}, f = !0, g = b.documentElement, h = "modernizr", i = b.createElement(h), j = i.style, k, l = {}.toString, m = " -webkit- -moz- -o- -ms- ".split(" "), n = {}, o = {}, p = {}, q = [], r = q.slice, s, t = function(a, c, d, e) {
        var f, i, j, k, l = b.createElement("div"), m = b.body, n = m || b.createElement("body");
        if (parseInt(d, 10))
            while (d--)
                j = b.createElement("div"), j.id = e ? e[d] : h + (d + 1), l.appendChild(j);
        return f = ["&#173;", '<style id="s', h, '">', a, "</style>"].join(""), l.id = h, (m ? l : n).innerHTML += f, n.appendChild(l), m || (n.style.background = "", n.style.overflow = "hidden", k = g.style.overflow, g.style.overflow = "hidden", g.appendChild(n)), i = c(l, a), m ? l.parentNode.removeChild(l) : (n.parentNode.removeChild(n), g.style.overflow = k), !!i
    }, u = {}.hasOwnProperty, v;
    !y(u, "undefined") && !y(u.call, "undefined") ? v = function(a, b) {
        return u.call(a, b)
    } : v = function(a, b) {
        return b in a && y(a.constructor.prototype[b], "undefined")
    }, Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = this;
        if (typeof c != "function")
            throw new TypeError;
        var d = r.call(arguments, 1), e = function() {
            if (this instanceof e) {
                var a = function() {
                };
                a.prototype = c.prototype;
                var f = new a, g = c.apply(f, d.concat(r.call(arguments)));
                return Object(g) === g ? g : f
            }
            return c.apply(b, d.concat(r.call(arguments)))
        };
        return e
    }), n.touch = function() {
        var c;
        return "ontouchstart" in a || a.DocumentTouch && b instanceof DocumentTouch ? c = !0 : t(["@media (", m.join("touch-enabled),("), h, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(a) {
            c = a.offsetTop === 9
        }), c
    };
    for (var B in n)
        v(n, B) && (s = B.toLowerCase(), e[s] = n[B](), q.push((e[s] ? "" : "no-") + s));
    return e.addTest = function(a, b) {
        if (typeof a == "object")
            for (var d in a)
                v(a, d) && e.addTest(d, a[d]);
        else {
            a = a.toLowerCase();
            if (e[a] !== c)
                return e;
            b = typeof b == "function" ? b() : b, typeof f != "undefined" && f && (g.className += " " + (b ? "" : "no-") + a), e[a] = b
        }
        return e
    }, w(""), i = k = null, e._version = d, e._prefixes = m, e.testStyles = t, g.className = g.className.replace(/(^|\s)no-js(\s|$)/, "$1$2") + (f ? " js " + q.join(" ") : ""), e
}(this, this.document);
Modernizr.addTest('android', function() {
    return !!navigator.userAgent.match(/Android/i)
});
Modernizr.addTest('chrome', function() {
    return !!navigator.userAgent.match(/Chrome/i)
});
Modernizr.addTest('firefox', function() {
    return !!navigator.userAgent.match(/Firefox/i)
});
Modernizr.addTest('iemobile', function() {
    return !!navigator.userAgent.match(/IEMobile/i)
});
Modernizr.addTest('ie', function() {
    return !!navigator.userAgent.match(/MSIE/i)
});
Modernizr.addTest('ie10', function() {
    return !!navigator.userAgent.match(/MSIE 10/i)
});
Modernizr.addTest('ie11', function() {
    return !!navigator.userAgent.match(/Trident.*rv:11\./)
});
Modernizr.addTest('ios', function() {
    return !!navigator.userAgent.match(/iPhone|iPad|iPod/i)
});
(function(a, b) {
    "use strict";
    var c = "undefined" != typeof Element && "ALLOW_KEYBOARD_INPUT" in Element, d = function() {
        for (var a, c, d = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"]], e = 0, f = d.length, g = {}; f > e; e++)
            if (a = d[e], a && a[1] in b) {
                for (e = 0, c = a.length; c > e; e++)
                    g[d[0][e]] = a[e];
                return g
            }
        return !1
    }(), e = {request: function(a) {
            var e = d.requestFullscreen;
            a = a || b.documentElement, /5\.1[\.\d]* Safari/.test(navigator.userAgent) ? a[e]() : a[e](c && Element.ALLOW_KEYBOARD_INPUT)
        },exit: function() {
            b[d.exitFullscreen]()
        },toggle: function(a) {
            this.isFullscreen ? this.exit() : this.request(a)
        },onchange: function() {
        },onerror: function() {
        },raw: d};
    return d ? (Object.defineProperties(e, {isFullscreen: {get: function() {
                return !!b[d.fullscreenElement]
            }},element: {enumerable: !0,get: function() {
                return b[d.fullscreenElement]
            }},enabled: {enumerable: !0,get: function() {
                return !!b[d.fullscreenEnabled]
            }}}), b.addEventListener(d.fullscreenchange, function(a) {
        e.onchange.call(e, a)
    }), b.addEventListener(d.fullscreenerror, function(a) {
        e.onerror.call(e, a)
    }), a.screenfull = e, void 0) : a.screenfull = !1
})(window, document);
+function($) {
    "use strict";
    var Shift = function(element) {
        this.$element = $(element)
        this.$prev = this.$element.prev()
        !this.$prev.length && (this.$parent = this.$element.parent())
    }
    Shift.prototype = {constructor: Shift,init: function() {
            var $el = this.$element, method = $el.data()['toggle'].split(':')[1], $target = $el.data('target')
            $el.hasClass('in') || $el[method]($target).addClass('in')
        },reset: function() {
            this.$parent && this.$parent['prepend'](this.$element)
            !this.$parent && this.$element['insertAfter'](this.$prev)
            this.$element.removeClass('in')
        }}
    $.fn.shift = function(option) {
        return this.each(function() {
            var $this = $(this), data = $this.data('shift')
            if (!data)
                $this.data('shift', (data = new Shift(this)))
            if (typeof option == 'string')
                data[option]()
        })
    }
    $.fn.shift.Constructor = Shift
}(jQuery);
Date.now = Date.now || function() {
    return +new Date;
};
+function($) {
    $(function() {
        $(document).on('click', "[data-toggle=fullscreen]", function(e) {
            if (screenfull.enabled) {
                screenfull.request();
            }
        });
        $('input[placeholder], textarea[placeholder]').placeholder();
        $("[data-toggle=popover]").popover();
        $(document).on('click', '.popover-title .close', function(e) {
            var $target = $(e.target), $popover = $target.closest('.popover').prev();
            $popover && $popover.popover('hide');
        });
        $(document).on('click', '[data-toggle="ajaxModal"]', function(e) {
            $('#ajaxModal').remove();
            e.preventDefault();
            var $this = $(this), $remote = $this.data('remote') || $this.attr('href'), $modal = $('<div class="modal" id="ajaxModal"><div class="modal-body"></div></div>');
            $('body').append($modal);
            $modal.modal();
            $modal.load($remote);
        });
        $.fn.dropdown.Constructor.prototype.change = function(e) {
            e.preventDefault();
            var $item = $(e.target), $select, $checked = false, $menu, $label;
            !$item.is('a') && ($item = $item.closest('a'));
            $menu = $item.closest('.dropdown-menu');
            $label = $menu.parent().find('.dropdown-label');
            $labelHolder = $label.text();
            $select = $item.find('input');
            $checked = $select.is(':checked');
            if ($select.is(':disabled'))
                return;
            if ($select.attr('type') == 'radio' && $checked)
                return;
            if ($select.attr('type') == 'radio')
                $menu.find('li').removeClass('active');
            $item.parent().removeClass('active');
            !$checked && $item.parent().addClass('active');
            $select.prop("checked", !$select.prop("checked"));
            $items = $menu.find('li > a > input:checked');
            if ($items.length) {
                $text = [];
                $items.each(function() {
                    var $str = $(this).parent().text();
                    $str && $text.push($.trim($str));
                });
                $text = $text.length < 4 ? $text.join(', ') : $text.length + ' selected';
                $label.html($text);
            } else {
                $label.html($label.data('placeholder'));
            }
        }
        $(document).on('click.dropdown-menu', '.dropdown-select > li > a', $.fn.dropdown.Constructor.prototype.change);
        $("[data-toggle=tooltip]").tooltip();
        $(document).on('click', '[data-toggle^="class"]', function(e) {
            e && e.preventDefault();
            var $this = $(e.target), $class, $target, $tmp, $classes, $targets;
            !$this.data('toggle') && ($this = $this.closest('[data-toggle^="class"]'));
            $class = $this.data()['toggle'];
            $target = $this.data('target') || $this.attr('href');
            $class && ($tmp = $class.split(':')[1]) && ($classes = $tmp.split(','));
            $target && ($targets = $target.split(','));
            $targets && $targets.length && $.each($targets, function(index, value) {
                ($targets[index] != '#') && $($targets[index]).toggleClass($classes[index]);
            });
            $this.toggleClass('active');
        });
        $(document).on('click', '.panel-toggle', function(e) {
            e && e.preventDefault();
            var $this = $(e.target), $class = 'collapse', $target;
            if (!$this.is('a'))
                $this = $this.closest('a');
            $target = $this.closest('.panel');
            $target.find('.panel-body').toggleClass($class);
            $this.toggleClass('active');
        });
        $('.carousel.auto').carousel();
        $(document).on('click.button.data-api', '[data-loading-text]', function(e) {
            var $this = $(e.target);
            $this.is('i') && ($this = $this.parent());
            $this.button('loading');
        });
        var scrollToTop = function() {
            !location.hash && setTimeout(function() {
                if (!pageYOffset)
                    window.scrollTo(0, 0);
            }, 1000);
        };
        var $window = $(window);
        var mobile = function(option) {
            if (option == 'reset') {
                $('[data-toggle^="shift"]').shift('reset');
                return true;
            }
            scrollToTop();
            $('[data-toggle^="shift"]').shift('init');
            return true;
        };
        $window.width() < 768 && mobile();
        var $resize;
        $window.resize(function() {
            clearTimeout($resize);
            $resize = setTimeout(function() {
                $window.width() < 767 && mobile();
                $window.width() >= 768 && mobile('reset') && fixVbox();
            }, 500);
        });
        var fixVbox = function() {
            $('.ie11 .vbox').each(function() {
                $(this).height($(this).parent().height());
            });
        }
        fixVbox();
        $(document).on('click', '.nav-primary a', function(e) {
            var $this = $(e.target), $active;
            $this.is('a') || ($this = $this.closest('a'));
            if ($('.nav-vertical').length) {
                return;
            }
            $active = $this.parent().siblings(".active");
            $active && $active.find('> a').toggleClass('active') && $active.toggleClass('active').find('> ul:visible').slideUp(200);
            ($this.hasClass('active') && $this.next().slideUp(200)) || $this.next().slideDown(200);
            $this.toggleClass('active').parent().toggleClass('active');
            $this.next().is('ul') && e.preventDefault();
        });
        $(document).on('click.bs.dropdown.data-api', '.dropdown .on, .dropup .on', function(e) {
            e.stopPropagation()
        });
    });
}(jQuery);
!function($) {
    $(function() {
        var sr, sparkline = function($re) {
            $(".sparkline").each(function() {
                var $data = $(this).data();
                if ($re && !$data.resize)
                    return;
                ($data.type == 'pie') && $data.sliceColors && ($data.sliceColors = eval($data.sliceColors));
                ($data.type == 'bar') && $data.stackedBarColor && ($data.stackedBarColor = eval($data.stackedBarColor));
                $data.valueSpots = {'0:': $data.spotColor};
                $(this).sparkline('html', $data);
            });
        };
        $(window).resize(function(e) {
            clearTimeout(sr);
            sr = setTimeout(function() {
                sparkline(true)
            }, 500);
        });
        sparkline(false);
        $('.easypiechart').each(function() {
            var $this = $(this), $data = $this.data(), $step = $this.find('.step'), $target_value = parseInt($($data.target).text()), $value = 0;
            $data.barColor || ($data.barColor = function($percent) {
                $percent /= 100;
                return "rgb(" + Math.round(200 * $percent) + ", 200, " + Math.round(200 * (1 - $percent)) + ")";
            });
            $data.onStep = function(value) {
                $value = value;
                $step.text(parseInt(value));
                $data.target && $($data.target).text(parseInt(value) + $target_value);
            }
            $data.onStop = function() {
                $target_value = parseInt($($data.target).text());
                $data.update && setTimeout(function() {
                    $this.data('easyPieChart').update(100 - $value);
                }, $data.update);
            }
            $(this).easyPieChart($data);
        });
        $(".combodate").each(function() {
            $(this).combodate();
            $(this).next('.combodate').find('select').addClass('form-control');
        });
        $(".datepicker-input").each(function() {
            $(this).datepicker();
        });
        $('.dropfile').each(function() {
            var $dropbox = $(this);
            if (typeof window.FileReader === 'undefined') {
                $('small', this).html('File API & FileReader API not supported').addClass('text-danger');
                return;
            }
            this.ondragover = function() {
                $dropbox.addClass('hover');
                return false;
            };
            this.ondragend = function() {
                $dropbox.removeClass('hover');
                return false;
            };
            this.ondrop = function(e) {
                e.preventDefault();
                $dropbox.removeClass('hover').html('');
                var file = e.dataTransfer.files[0], reader = new FileReader();
                reader.onload = function(event) {
                    $dropbox.append($('<img>').attr('src', event.target.result));
                };
                reader.readAsDataURL(file);
                return false;
            };
        });
        var addPill = function($input) {
            var $text = $input.val(), $pills = $input.closest('.pillbox'), $repeat = false, $repeatPill;
            if ($text == "")
                return;
            $("li", $pills).text(function(i, v) {
                if (v == $text) {
                    $repeatPill = $(this);
                    $repeat = true;
                }
            });
            if ($repeat) {
                $repeatPill.fadeOut().fadeIn();
                return;
            }
            ;
            $item = $('<li class="label bg-dark">' + $text + '</li> ');
            $item.insertBefore($input);
            $input.val('');
            $pills.trigger('change', $item);
        };
        $('.pillbox input').on('blur', function() {
            addPill($(this));
        });
        $('.pillbox input').on('keypress', function(e) {
            if (e.which == 13) {
                e.preventDefault();
                addPill($(this));
            }
        });
        $('.slider').each(function() {
            $(this).slider();
        });
        var $nextText;
        $(document).on('click', '[data-wizard]', function(e) {
            var $this = $(this), href;
            var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, ''));
            var option = $this.data('wizard');
            var item = $target.wizard('selectedItem');
            var $step = $target.next().find('.step-pane:eq(' + (item.step - 1) + ')');
            !$nextText && ($nextText = $('[data-wizard="next"]').html());
            var validated = false;
            $('[data-required="true"]', $step).each(function() {
                return (validated = $(this).parsley('validate'));
            });
            if ($(this).hasClass('btn-next') && !validated) {
                return false;
            } else {
                $target.wizard(option);
                var activeStep = (option == "next") ? (item.step + 1) : (item.step - 1);
                var prev = ($(this).hasClass('btn-prev') && $(this)) || $(this).prev();
                var next = ($(this).hasClass('btn-next') && $(this)) || $(this).next();
                prev.attr('disabled', (activeStep == 1) ? true : false);
                next.html((activeStep < $target.find('li').length) ? $nextText : next.data('last'));
            }
        });
        if ($.fn.sortable) {
            $('.sortable').sortable();
        }
        $('.no-touch .slim-scroll').each(function() {
            var $self = $(this), $data = $self.data(), $slimResize;
            $self.slimScroll($data);
            $(window).resize(function(e) {
                clearTimeout($slimResize);
                $slimResize = setTimeout(function() {
                    $self.slimScroll($data);
                }, 500);
            });
        });
        if ($.support.pjax) {
            $(document).on('click', 'a[data-pjax]', function(event) {
                event.preventDefault();
                var container = $($(this).data('target'));
                $.pjax.click(event, {container: container});
            })
        }
        ;
        $('.portlet').each(function() {
            $(".portlet").sortable({connectWith: '.portlet',iframeFix: false,items: '.portlet-item',opacity: 0.8,helper: 'original',revert: true,forceHelperSize: true,placeholder: 'sortable-box-placeholder round-all',forcePlaceholderSize: true,tolerance: 'pointer'});
        });
        $('#docs pre code').each(function() {
            var $this = $(this);
            var t = $this.html();
            $this.html(t.replace(/</g, '&lt;').replace(/>/g, '&gt;'));
        });
        $(document).on('click', '.fontawesome-icon-list a', function(e) {
            e && e.preventDefault();
        });
        $(document).on('change', 'table thead [type="checkbox"]', function(e) {
            e && e.preventDefault();
            var $table = $(e.target).closest('table'), $checked = $(e.target).is(':checked');
            $('tbody [type="checkbox"]', $table).prop('checked', $checked);
        });
        $(document).on('click', '[data-toggle^="progress"]', function(e) {
            e && e.preventDefault();
            $el = $(e.target);
            $target = $($el.data('target'));
            $('.progress', $target).each(function() {
                var $max = 50, $data, $ps = $('.progress-bar', this).last();
                ($(this).hasClass('progress-xs') || $(this).hasClass('progress-sm')) && ($max = 100);
                $data = Math.floor(Math.random() * $max) + '%';
                $ps.css('width', $data).attr('data-original-title', $data);
            });
        });
        function addMsg($msg) {
            var $el = $('.nav-user'), $n = $('.count:first', $el), $v = parseInt($n.text());
            $('.count', $el).fadeOut().fadeIn().text($v + 1);
            $($msg).hide().prependTo($el.find('.list-group')).slideDown().css('display', 'block');
        }
        $('[data-ride="datatables"]').each(function() {
            var oTable = $(this).dataTable({"bProcessing": true,"sAjaxSource": "js/data/datatable.json","sDom": "<'row'<'col-sm-6'l><'col-sm-6'f>r>t<'row'<'col-sm-6'i><'col-sm-6'p>>","sPaginationType": "full_numbers","aoColumns": [{"mData": "engine"}, {"mData": "browser"}, {"mData": "platform"}, {"mData": "version"}, {"mData": "grade"}]});
        });
        if ($.fn.select2) {
            $("#select2-option").select2();
            $("#select2-tags").select2({tags: ["red", "green", "blue"],tokenSeparators: [",", " "]});
        }
    });
}(window.jQuery);
(function(f) {
    jQuery.fn.extend({slimScroll: function(h) {
            var a = f.extend({width: "auto",height: "250px",size: "7px",color: "#000",position: "right",distance: "1px",start: "top",opacity: 0.4,alwaysVisible: !1,disableFadeOut: !1,railVisible: !1,railColor: "#333",railOpacity: 0.2,railDraggable: !0,railClass: "slimScrollRail",barClass: "slimScrollBar",wrapperClass: "slimScrollDiv",allowPageScroll: !1,wheelStep: 20,touchScrollStep: 200,borderRadius: "7px",railBorderRadius: "7px"}, h);
            this.each(function() {
                function r(d) {
                    if (s) {
                        d = d || window.event;
                        var c = 0;
                        d.wheelDelta && (c = -d.wheelDelta / 120);
                        d.detail && (c = d.detail / 3);
                        f(d.target || d.srcTarget || d.srcElement).closest("." + a.wrapperClass).is(b.parent()) && m(c, !0);
                        d.preventDefault && !k && d.preventDefault();
                        k || (d.returnValue = !1)
                    }
                }
                function m(d, f, h) {
                    k = !1;
                    var e = d, g = b.outerHeight() - c.outerHeight();
                    f && (e = parseInt(c.css("top")) + d * parseInt(a.wheelStep) / 100 * c.outerHeight(), e = Math.min(Math.max(e, 0), g), e = 0 < d ? Math.ceil(e) : Math.floor(e), c.css({top: e + "px"}));
                    l = parseInt(c.css("top")) / (b.outerHeight() - c.outerHeight());
                    e = l * (b[0].scrollHeight - b.outerHeight());
                    h && (e = d, d = e / b[0].scrollHeight * b.outerHeight(), d = Math.min(Math.max(d, 0), g), c.css({top: d + "px"}));
                    b.scrollTop(e);
                    b.trigger("slimscrolling", ~~e);
                    v();
                    p()
                }
                function C() {
                    window.addEventListener ? (this.addEventListener("DOMMouseScroll", r, !1), this.addEventListener("mousewheel", r, !1), this.addEventListener("MozMousePixelScroll", r, !1)) : document.attachEvent("onmousewheel", r)
                }
                function w() {
                    u = Math.max(b.outerHeight() / b[0].scrollHeight * b.outerHeight(), D);
                    c.css({height: u + "px"});
                    var a = u == b.outerHeight() ? "none" : "block";
                    c.css({display: a})
                }
                function v() {
                    w();
                    clearTimeout(A);
                    l == ~~l ? (k = a.allowPageScroll, B != l && b.trigger("slimscroll", 0 == ~~l ? "top" : "bottom")) : k = !1;
                    B = l;
                    u >= b.outerHeight() ? k = !0 : (c.stop(!0, !0).fadeIn("fast"), a.railVisible && g.stop(!0, !0).fadeIn("fast"))
                }
                function p() {
                    a.alwaysVisible || (A = setTimeout(function() {
                        a.disableFadeOut && s || (x || y) || (c.fadeOut("slow"), g.fadeOut("slow"))
                    }, 1E3))
                }
                var s, x, y, A, z, u, l, B, D = 30, k = !1, b = f(this);
                if (b.parent().hasClass(a.wrapperClass)) {
                    var n = b.scrollTop(), c = b.parent().find("." + a.barClass), g = b.parent().find("." + a.railClass);
                    w();
                    if (f.isPlainObject(h)) {
                        if ("height" in h && "auto" == h.height) {
                            b.parent().css("height", "auto");
                            b.css("height", "auto");
                            var q = b.parent().parent().height();
                            b.parent().css("height", q);
                            b.css("height", q)
                        }
                        if ("scrollTo" in h)
                            n = parseInt(a.scrollTo);
                        else if ("scrollBy" in h)
                            n += parseInt(a.scrollBy);
                        else if ("destroy" in h) {
                            c.remove();
                            g.remove();
                            b.unwrap();
                            return
                        }
                        m(n, !1, !0)
                    }
                } else {
                    a.height = "auto" == a.height ? b.parent().height() : a.height;
                    n = f("<div></div>").addClass(a.wrapperClass).css({position: "relative",overflow: "hidden",width: a.width,height: a.height});
                    b.css({overflow: "hidden",width: a.width,height: a.height});
                    var g = f("<div></div>").addClass(a.railClass).css({width: a.size,height: "100%",position: "absolute",top: 0,display: a.alwaysVisible && a.railVisible ? "block" : "none","border-radius": a.railBorderRadius,background: a.railColor,opacity: a.railOpacity,zIndex: 90}), c = f("<div></div>").addClass(a.barClass).css({background: a.color,width: a.size,position: "absolute",top: 0,opacity: a.opacity,display: a.alwaysVisible ? "block" : "none","border-radius": a.borderRadius,BorderRadius: a.borderRadius,MozBorderRadius: a.borderRadius,WebkitBorderRadius: a.borderRadius,zIndex: 99}), q = "right" == a.position ? {right: a.distance} : {left: a.distance};
                    g.css(q);
                    c.css(q);
                    b.wrap(n);
                    b.parent().append(c);
                    b.parent().append(g);
                    a.railDraggable && c.bind("mousedown", function(a) {
                        var b = f(document);
                        y = !0;
                        t = parseFloat(c.css("top"));
                        pageY = a.pageY;
                        b.bind("mousemove.slimscroll", function(a) {
                            currTop = t + a.pageY - pageY;
                            c.css("top", currTop);
                            m(0, c.position().top, !1)
                        });
                        b.bind("mouseup.slimscroll", function(a) {
                            y = !1;
                            p();
                            b.unbind(".slimscroll")
                        });
                        return !1
                    }).bind("selectstart.slimscroll", function(a) {
                        a.stopPropagation();
                        a.preventDefault();
                        return !1
                    });
                    g.hover(function() {
                        v()
                    }, function() {
                        p()
                    });
                    c.hover(function() {
                        x = !0
                    }, function() {
                        x = !1
                    });
                    b.hover(function() {
                        s = !0;
                        v();
                        p()
                    }, function() {
                        s = !1;
                        p()
                    });
                    b.bind("touchstart", function(a, b) {
                        a.originalEvent.touches.length && (z = a.originalEvent.touches[0].pageY)
                    });
                    b.bind("touchmove", function(b) {
                        k || b.originalEvent.preventDefault();
                        b.originalEvent.touches.length && (m((z - b.originalEvent.touches[0].pageY) / a.touchScrollStep, !0), z = b.originalEvent.touches[0].pageY)
                    });
                    w();
                    "bottom" === a.start ? (c.css({top: b.outerHeight() - c.outerHeight()}), m(0, !0)) : "top" !== a.start && (m(f(a.start).position().top, null, !0), a.alwaysVisible || c.hide());
                    C()
                }
            });
            return this
        }});
    jQuery.fn.extend({slimscroll: jQuery.fn.slimScroll})
})(jQuery);

