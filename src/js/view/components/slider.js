define([
    'view/components/extendable',
    'utils/ui',
    'handlebars-loader!templates/slider.html',
    'utils/helpers'
], function(Extendable, UI, SliderTemplate, utils) {

    var Slider = Extendable.extend({
        constructor : function(type, orientation) {
            this.orientation = orientation;
            this.type = type;

            this.dragStartListener = this.dragStart.bind(this);
            this.dragMoveListener = this.dragMove.bind(this);
            this.dragEndListener = this.dragEnd.bind(this);

            this.setup();
        },
        setup : function() {
            var obj = {
                'default' : this.default,
                type: this.type,
                orientation : 'jw-slider-' + this.orientation
            };
            this.el = utils.createElement(SliderTemplate(obj));

            this.elementRail = this.el.getElementsByClassName('jw-' + this.type + '-container')[0];
            this.elementBuffer = this.el.getElementsByClassName('jw-' + this.type + '-buffer')[0];
            this.elementProgress = this.el.getElementsByClassName('jw-' + this.type + '-progress')[0];
            this.elementThumb = this.el.getElementsByClassName('jw-' + this.type + '-knob')[0];

            this.userInteract = new UI(this.element());

            this.userInteract.on('dragStart', this.dragStartListener);
            this.userInteract.on('drag', this.dragMoveListener);
            this.userInteract.on('dragEnd', this.dragEndListener);

            this.userInteract.on('tap', this.dragMoveListener);
            this.userInteract.on('click', this.dragMoveListener);
        },
        dragStart : function() {
            this.trigger('dragStart');
            this.railBounds = utils.bounds(this.elementRail);
        },
        dragEnd : function(evt) {
            this.dragMove(evt);
            this.trigger('dragEnd');
        },
        dragMove : function(evt) {
            var dimension,
                bounds = (this.railBounds) ? this.railBounds : utils.bounds(this.elementRail),
                percentage;

            if (this.orientation === 'horizontal'){
                dimension = evt.pageX;
                if (dimension < bounds.left) {
                    percentage = 0;
                } else if (dimension > bounds.right) {
                    percentage = 100;
                } else {
                    percentage = utils.between((dimension-bounds.left)/bounds.width, 0, 1) * 100;
                }
            } else {
                dimension = evt.pageY;
                if (dimension >= bounds.bottom) {
                    percentage = 0;
                } else if (dimension <= bounds.top) {
                    percentage = 100;
                } else {
                    percentage = utils.between((bounds.height-(dimension-bounds.top))/bounds.height, 0, 1) * 100;
                }
            }

            this.render(percentage);
            this.update(percentage);

            return false;
        },

        update : function(percentage) {
            this.trigger('update', { percentage : percentage });
        },
        render : function(percentage) {
            percentage = Math.max(0, Math.min(percentage, 100));

            if(this.orientation === 'horizontal'){
                this.elementThumb.style.left = percentage + '%';
                this.elementProgress.style.width = percentage + '%';
            } else {
                this.elementThumb.style.bottom = percentage + '%';
                this.elementProgress.style.height = percentage + '%';
            }
        },
        updateBuffer : function(percentage) {
            this.elementBuffer.style.width = percentage + '%';
        },

        element : function() {
            return this.el;
        }
    });

    return Slider;
});