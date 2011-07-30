/*
*                 eyeos - The Open Source Cloud's Web Desktop
*                               Version 2.0
*                   Copyright (C) 2007 - 2010 eyeos Team 
*                   
*                   eyeGraphs - Application for graphing in eyeos
*                   			Version 1.0
*                   Copyleft by Julio Molina Soler <jmolinaso@gmail.com>
* 
* This application is developed by Julio Molina Soler and it's ment to be distributed
* with eyeos 2.x version based on qooxdoo 1.4 and qooxdoo-contribs. 
* It uses the qxdygraphs and is distributed under LGPL/EPL by Tobi Oetiker.
* 
* This program is free software; you can redistribute it and/or modify it under
* the terms of the GNU Affero General Public License version 3 as published by the
* Free Software Foundation.
* 
* This program is distributed in the hope that it will be useful, but WITHOUT
* ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
* FOR A PARTICULAR PURPOSE.  See the GNU Affero General Public License for more
* details.
* 
* You should have received a copy of the GNU Affero General Public License
* version 3 along with this program in the file "LICENSE".  If not, see 
* <http://www.gnu.org/licenses/agpl-3.0.txt>.
* 
* See www.eyeos.org for more details. All requests should be sent to licensing@eyeos.org
* 
* The interactive user interfaces in modified source and object code versions
* of this program must display Appropriate Legal Notices, as required under
* Section 5 of the GNU Affero General Public License version 3.
* 
* In accordance with Section 7(b) of the GNU Affero General Public License version 3,
* these Appropriate Legal Notices must retain the display of the "Powered by
* eyeos" logo and retain the original copyright notice. If the display of the 
* logo is not reasonably feasible for technical reasons, the Appropriate Legal Notices
* must display the words "Powered by eyeos" and retain the original copyright notice. 
*/
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
				 _window.open();
				 
			 }
		 }
		 
});
