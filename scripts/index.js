var rect;
var x = 0; var y = 0;
var panel = $('article')[0];
var transparency = 0;
var activeElement = false;

function createArticles() {
    for (let i = 0; i < carrousel.articles.length; i++) {
        $('.carrousel').append($('<article>').css({ 'background': 'url(img/' + carrousel.articles[i].image + ')' })
            .append($('<div class="title">').html(carrousel.articles[i].title))
            .append($('<div class="description" style="display: none;">').html(carrousel.articles[i].description))
            .append($('<button type="button">').html('See details')));
    }
}

createArticles();

$('article').on({
    mouseenter: function () {
        transparency = 0;
        panel = this;
        activeElement = true;
        $(this).addClass('glass');
        $('article:not(:hover)').width('320px').removeClass('glass');
        $(this).width('858px');
        $(this).find('.description').fadeIn('fast');
        $(this).find('.title').css({ 'font-size': '1.8rem', 'bottom': '15.4rem' });
    },

    mouseleave: function () {
        activeElement = false;
        $(this).find('.description').fadeOut('fast');
        $(this).find('.title').css({ 'font-size': '1.4rem', 'bottom': '12rem' });
        // transparency = 0;
    }
});

$(document).on('mousemove', function (e) {
    glassHiglightMotion();
    x = parseInt((((e.clientX - rect.left) / rect.width) * 100));
    y = parseInt((((e.clientY - rect.top) / rect.height) * 100));
});

function Update() {
    if (activeElement && transparency < 50) {
        transparency += 1;
    } else if (!activeElement && transparency > 0) {
        transparency -= 1;
    }
    document.documentElement.style.setProperty("--highlightColor", `rgba(255, 255, 255, ${Math.round(transparency)}%)`);
    requestAnimationFrame(Update);
}
Update();

function glassHiglightMotion() {
    rect = panel.getBoundingClientRect();
    document.documentElement.style.setProperty("--highlightPosition", `circle at ${x.toFixed(2)}% ${y.toFixed(2)}%`);
}