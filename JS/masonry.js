var $masonry = $('.masonry').masonry({
    itemSelector: '.masonry-item',
    percentPosition: true,
    columnWidth: '.masonry-sizer'
});
$masonry.imagesLoaded().progress( function() {
    $masonry.masonry();
});  
