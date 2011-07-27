function eyepaint_application(checknum,pid,args){
 var app = new eyeos.application.eyepaint(checknum,pid);
 app.drawGUI();
}

qx.Class.define("eyeos.application.eyepaint", 
  {extend: eyeos.system.EyeApplication,
   construct: function(checknum,pid){
    arguments.callee.base.call(this,"eyepaint",checknum,pid);
   },
   members: {
    //the SVG element to draw on (which contained by the SVG widget)
    _svg : null,
    
    //path data of the path that's currently being drawed (if any)
    _pathdata: null,
    
    //widgets from the pen toolbox
    _tools: null,
    drawGUI: function(){
     var mainWindow = new eyeos.ui.Window(this, tr("eyepaint"), 'index.php?extern=/images/16x16/apps/accessories-calculator.png');
     mainWindow.setLayout(new qx.ui.layout.HBox(0));
     mainWindow.setAllowMaximize(false);
     mainWindow.open();

      /*
       * Start of SVG freedraw demo code 
       */
      
      var svgWidget = new svg.embed.Svg();
      mainWindow.add(svgWidget, {
        left   : 0,
        right  : 0,
        top    : 0,
        bottom : 0
      });
      
      this.createToolbox();
      
      this._svg = svgWidget.getSvg();
      
      this._svg.addListener("mousedown", this._startDraw, this);
      this._svg.addListener("mousemove", this._draw, this);
      this._svg.addListener("mouseup", this._endDraw, this);      
    },
    
    _startDraw : function(evt) {
      
      //create a new path element
      var path = new svg.path.Path().set({
        fill: "none",
        stroke: this._tools.color.getValue(),
        strokeWidth: this._tools.pensize.getValue(),
        linecap: "round"
      });
      
      //create new path data and attach it to the path
      var pathdata = new svg.path.PathData();
      pathdata.moveTo(evt.getDocumentLeft(), evt.getDocumentTop());
      path.setPathData(pathdata);
      
      //store the created path data
      this._pathdata = pathdata;
      
      this._svg.add(path);
    },
    
    _draw : function(evt) {
      if (this._pathdata != null) {
        this._pathdata.lineTo(evt.getDocumentLeft(), evt.getDocumentTop());
      }
    },
    
    _endDraw : function(evt) {
      this._pathdata = null;
    },
    
    createToolbox : function() {
      
      var layout = new qx.ui.layout.VBox();
      layout.setSpacing(5);
      
      var toolbox = new qx.ui.window.Window("Pen").set({
        layout: layout,
        showMinimize: false,
        showMaximize: false,
        showClose: true,
        resizable: false
      });
      
      toolbox.add(new qx.ui.basic.Label("Size: "));
      
      var pensize = new qx.ui.form.Spinner().set({
        minimum: 1,
        maximum: 100,
        value: 5
      });
      toolbox.add(pensize);
      

      var colorpopup = new qx.ui.control.ColorPopup();
      colorpopup.exclude();
      colorpopup.setValue("red");
      
      
      var colorbox = new qx.ui.container.Composite().set({
        width: 50,
        height: 25,
        backgroundColor: colorpopup.getValue()
      });
      
      colorbox.addListener("click", function(e) {
        colorpopup.placeToWidget(colorbox);
        colorpopup.show();
      });
      
      toolbox.add(new qx.ui.basic.Label("Color: "));
      toolbox.add(colorbox);
      
      colorpopup.addListener("changeValue", function(e) {
        colorbox.setBackgroundColor(e.getData());
      });
      
      this._tools = {
          pensize: pensize,
          color: colorpopup
      };
      
      toolbox.open();


    }
}
});
