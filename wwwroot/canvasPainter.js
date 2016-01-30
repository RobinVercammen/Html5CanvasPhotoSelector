$(document).ready(function () {

    var canvas = new CanvasHelper(document.getElementById("firstPictureCanvas"));
    var memoryCanvas = new MemoryCanvas(canvas);

    memoryCanvas.start();

    var firstPoint = null;
    var secondPoint = null;

    $("#firstPictureCanvas").on('click', function clickHandler(e) {
        if (!firstPoint && !secondPoint) {
            firstPoint = this.relMouseCoords(e);
        } else if (firstPoint && !secondPoint) {
            secondPoint = this.relMouseCoords(e);
            var newrect = new Rectangle(firstPoint, secondPoint)
            memoryCanvas.rectangles.push(newrect);
            firstPoint = null;
            secondPoint = null;
        } else {

        }
    });

    $("#firstPictureCanvas").on('mousemove', function hoverHandler(e) {
        if (!firstPoint && !secondPoint) {
            firstPoint = this.relMouseCoords(e);
        } else if (firstPoint && !secondPoint) {
            secondPoint = this.relMouseCoords(e);
            var newrect = new Rectangle(firstPoint, secondPoint)
            memoryCanvas.rectangles.push(newrect);
            firstPoint = null;
            secondPoint = null;
        } else {

        }
    });

    //$("#firstPictureCanvas").on('contextmenu', function contextmenuHandler(e) {
    //    var canvashelper = new CanvasHelper(document.getElementById("firstPictureCanvas"));
    //    canvashelper.clearCanvas();
    //});

});

function MemoryCanvas(canvashelper) {
    this.canvasHelper = canvashelper;
    this.rectangles = [];

    this.draw = function draw() {
        this.canvasHelper.clearCanvas();

        for (var i = 0; i < this.rectangles.length; i++) {
            this.canvasHelper.drawRectangle(this.rectangles[i]);
        }

        this.start();
    }

    this.start = function start() {
        var self = this;
        setTimeout(function timeoutHandler() {
            self.draw();
        }, 32);
    }
}

function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return { x: canvasX, y: canvasY }
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;

function CanvasHelper(canvas) {
    this.width = canvas.width;
    this.height = canvas.height;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.clearCanvas = function () {
        this.context.clearRect(0, 0, this.width, this.height);
    }

    this.drawRectangle = function (rectangle) {
        this.context.beginPath();
        this.context.rect(rectangle.x(), rectangle.y(), rectangle.width(), rectangle.height());
        this.context.stroke();
    }
}

function point(x, y) {
    this.x = x;
    this.y = y;
}

function Rectangle(topLeftPoint, bottomRightPoint) {
    this.topLeftPoint = topLeftPoint;
    this.bottomRightPoint = bottomRightPoint;
    this.x = function calcX() {
        return this.topLeftPoint.x;
    };
    this.y = function calcY() {
        return this.topLeftPoint.y;
    };
    this.width = function calcWidth() {
        return this.bottomRightPoint.x - this.topLeftPoint.x;
    };
    this.height = function calcHeight() {
        return this.bottomRightPoint.y - this.topLeftPoint.y;
    };
}