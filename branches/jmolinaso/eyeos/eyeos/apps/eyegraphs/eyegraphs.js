function eyegraphs_application(checknum,pid,args){
	var app = new eyeos.application.eyeGraphs(checknum,pid);
	app.open();
}

qx.Class.define("eyeos.application.eyeGraphs", 
		{extend: eyeos.system.EyeApplication,
		 construct: function(checknum,pid,args){
			 arguments.callee.base.call(this,"EyeOs Graphs",checknum,pid);
			 this._fileChooser = new eyeos.dialogs.FileChooser(checknum);
			 this._fileChooser.setFilters([
			                   			{desc: 'CSV files', 		
			                   				patterns: ['*.csv'], 						
			                   				defaultExt: 'csv'}
			                   			]
			                   		);
			 this.drawGUI();
			 this._appearListener = this._window.addListenerOnce('appear', function(e) {
			    	if (args.length) {
			    		this._doOpen(args[0]);
				    } else {
				    	this._onNew();
				    }
					this._window.removeListenerById(this._appearListener);
			    }, this);
			    
			    
		    
		 },
		 members: {
			 _window: null,
			 _lastFilepath: null,
			 __data: null,
			 __options:null,
			 __plot: null,
			 __plot_container: null,
			 _fileChooser: null,
			 __right_pane: function(){
				 this.__plot_container = new qx.ui.container.Composite(new qx.ui.layout.VBox()).set({
						width: 600,
						allowGrowX : true,
						allowGrowY : true
					});
				 this.__init_plot(this.__data,this.__options);
				 this.__plot_container.add(this.__plot);
				 return this.__plot_container;
				 
			 },
			 __init_plot: function(data, options){
				 
				 this.__plot = new qxdygraphs.Plot(data,options).set(
					      {
						minWidth   : 600,
						minHeight  : 420,
						allowGrowX : true,
						allowGrowY : true
					      });
				 return this.__plot;
				 
			 },			 
			 __open_csv: function(e) {
			    	this._fileChooser.showOpenDialog(this._window, function(choice, path) {
			    		if (choice == eyeos.dialogs.FileChooser.APPROVE_OPTION) {
			    			this._doOpen(path);
			    		}
			    	}, this, this._lastFilepath);
			    },
			    _doOpen: function(path) {
			    	eyeos.callMessage(this._checknum, '__FileSystem_getFileContent', {path: path}, function(result) {
			    		var header = [];
			    		var word = "";
			    		var i = 0;
			    		var end = 'no';
			    		while(end == 'no'){
			    			if(result.data[i] == ","){
			    				header.push(word);
			    				i++;
			    				word = "";
			    			}
			    				word = word+result.data[i];	
			    			
			    			
			    			if(result.data[i] == "\n"){
			    				header.push(word);
			    				end = 'yes';
			    			}
			    				
					    	i++;
			    		}

			    		
			    		this.__data = result.data;
			    		this.__options = {
			    				
			    		};
			    		this.__init_plot(this.__data,this.__options);
			    		this.__plot_container.removeAll();
			    		this.__plot_container.add(this.__plot);
			    	}, this);
			    				    },
			 __menu_bar: function(){
					// TOOLBAR
			    	//
			    	var toolbarBox = new qx.ui.toolbar.ToolBar();
			    	
			    	var openButton = new qx.ui.toolbar.Button(tr('Open csv file'), 'index.php?extern=images/16x16/actions/document-open.png');
			    	openButton.addListener("execute", function(){
			    			this.__open_csv();
			    	}, this);
			    	toolbarBox.add(openButton);
				 
					
				return toolbarBox;
			 },
			 
			 drawGUI: function(){
				 _window = new eyeos.ui.Window(this, tr("EyeOS Graphs"), 
						 '/extern/images/16x16/apps/eyeosgraphs.png').set({
								destroyOnClose: true
							});;
				_window.setLayout(new qx.ui.layout.VBox());
				 this.__data = [];
				 for (var i=1;i<1000;i++){
					 this.__data.push([new Date(1000000000+i*3600*1000),Math.random(),Math.sin(i/50)]);
				}
				 this.__options = {
						    labels: [ 'Date', 'Random','Sin' ]
						 };
				 this.__init_plot(this.__data,this.__options);
				 _window.add(this.__menu_bar());
				 _window.add(this.__right_pane());
				 //mainWindow
				 _window.open();
				 
			 }
		 }
		 
});
