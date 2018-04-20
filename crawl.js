var $=jQuery;
var __PAGES=$("div.wp-pagenavi  a.last").attr('href');
     var index= __PAGES.indexOf('page/');
     __PAGES=parseInt(__PAGES.substr(index).replace('page/',''));
         var result = [];
    
    var crawl = function(init) {
            
                
                if(init <= __PAGES)
                {
                    var link = 'http://www.gotceleb.com/page/'+init;
                    $.ajax({  
                        url: link,  
                        type: 'GET',
                        async: false,
                    }).success (function(data) {
        
                        $(data).find('.post-row').each(function(){
                            
                            var date=$(this).find('.post-date').text();
                            date= date.indexOf('2018');
                            if(date!=-1)
                            {
                                var item = {
                                    pageUrl: $(this).find('a').attr('href'),
                                    imageUrl: getImage($(this).find('a').attr('href'))
                              };
                            result.push(item); 
                            }
                                           
                        });
                        crawl(init+1);
            });
        }
        else
        {
            console.log(result);
        }
    };
    function getImage(pageLink){
        var images=[];
        $.ajax({  
            url: pageLink,  
            type: 'GET',
            async: false,
        }).success (function(data) {
                    
                    $(data).find('.gallery-item').each(function(){

                            var image=$(this).find('img').attr('src');
                            images.push(image);                  
                    });
        });
        console.log(pageLink)
        return images;
    }
    crawl(1);
    

