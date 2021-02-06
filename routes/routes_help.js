const express  = require('express');
var router   = express.Router();
const CFG   = require(app_root + '/config/config');
const fs       = require('fs-extra');
const url = require('url');
const path     = require('path');
const C		  = require(app_root + '/public/constants');

router.get('/stub', (req, res) => {
    res.render('pages/help/stub', {title:'stub'});
});

router.get('/user_guide', (req, res) => {
    res.render('pages/help/user_guide', { 
                      title: "HOMD :: User's Guide",
                      user: req.user, 
                      hostname: CFG.hostname,
                      
    });
});

router.get('/template', (req, res) => {
    // the url should always be formed: /help/template?page=name
    const parsed_url = url.parse(req.url, true);
    //console.log('page= '+parsed_url.query.page)
    var info_content = parsed_url.query.page
    var menu_item = parsed_url.query.menu
    if(info_content == undefined || info_content == ''){
    	res.render('pages/help/stub', {title:'stub'});
    }else{
    res.render('pages/help/help_pages_blank', { 
                      title: "HOMD :: User's Guide: "+info_content,
                      page: info_content,  // this will open the menu
                      menu: menu_item,
                      user: req.user, 
                      hostname: CFG.hostname,
                      
    });
    }
});

router.post('/ajax', function(req, res){
    //console.log('in ajax')
    //console.log('req.body');
    //console.log(req.body);
    if (! req.body.id ){
    	res.send('No HelpFile Found-1');
    	return;
    }
    id = req.body.id;  //.split('--')
    var tmp = id.split('--')
    var file = path.join(process.cwd(), 'public', 'static_help_files', tmp[1]+'.ejs' ) 
    //console.log(file)
    fs.readFile(file, "utf8", (err,data) => {
    
    	if(err){
    		console.log('No file found -- does not validate -1!!')
            req.flash('NO TEXT/FILE FOUND')
            data = 'No HelpFile Found-2'
    	}
    	//console.log(data)
    	res.send(data);
    	
    });
    
});


module.exports = router;


