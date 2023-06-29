var x = 0; var y = 0;
var transparency = 0;
var pulseOpacity = 100, pulseProgress = 0;
var activeElement = false, clicked = false;
var activeElementIndex = 0;
var articles = [];
var infiniteScrollArticles = [];

function createArticles() {
    for (let i = 0; i < carousel.articles.length; i++) {
        $('.carousel').append($('<article>').css({ 'background': 'url(img/' + carousel.articles[i].image + ')' })
            .append($('<div class="title">').html(carousel.articles[i].title))
            .append($('<div class="description" style="display: none;">').html(carousel.articles[i].description))
            .append($('<button type="button">').html('See details')));
        articles[i] = $('article')[i];
    }
    for (let i = 0; i < articles.length; i++) {
        $('.carousel').append[articles[i]];
    }
}
createArticles();

function openArticle(article) {
    let inactiveArticles = articles.filter(filterArrayWithoutElementAtIndex);
    transparency = 0;
    panel = article;
    activeElement = true;
    $(inactiveArticles).width('320px').removeClass('glass active');
    $(article).addClass('glass').width('858px');
    $(article).find('.description').fadeIn('fast');
    $(article).find('.title').css({ 'font-size': '1.8rem', 'bottom': '15.4rem' });
    $(inactiveArticles).find('.description').fadeOut('fast');
    $(inactiveArticles).find('.title').css({ 'font-size': '1.4rem', 'bottom': '12rem' });
}

function filterArrayWithoutElementAtIndex(element) {
    return element != articles[activeElementIndex];
}

$(document).ready(function () {
    var panel = articles[0];
    var rect = panel.getBoundingClientRect();
    openArticle(panel);
    $('article').on({
        click: function () {
            panel = this;
            clicked = true;
            pulseOpacity = 100; pulseProgress = 0;
            if (activeElementIndex != (activeElementIndex = articles.indexOf(this))) {
                openArticle(this);
                $('.carousel').css({ left: 'calc(' + ((-858 / 2) * activeElementIndex) + 'px' + ' + 6rem + 6rem * ' + activeElementIndex + ')' });
            }
        },

        mouseenter: function () {
            if (activeElementIndex == articles.indexOf(this)) {
                activeElement = true;
            }
        },

        mouseleave: function () {
            activeElement = false;
        }
    });

    $(document).on('mousemove', function (e) {
        glassHiglightMotion();
        x = parseInt((((e.clientX - rect.left) / rect.width) * 100));
        y = parseInt((((e.clientY - rect.top) / rect.height) * 100));
    });

    function Update() {
        if (activeElement && transparency < 50) {
            transparency += 2.5;
            document.documentElement.style.setProperty("--highlightColor", `rgba(255, 255, 255, ${Math.round(transparency)}%)`);
        } else if (!activeElement && transparency > 0) {
            transparency -= 2.5;
            document.documentElement.style.setProperty("--highlightColor", `rgba(255, 255, 255, ${Math.round(transparency)}%)`);
        }
        if (clicked && pulseOpacity > 0 && pulseProgress < 100) {
            pulseOpacity -= (pulseOpacity > 0) ? 3 : 0;
            pulseProgress += (pulseProgress < 100) ? 3 : 0;
            document.documentElement.style.setProperty("--pulseGradient", `radial-gradient(circle at ${x.toFixed(2)}% ${y.toFixed(2)}%, transparent, rgba(255, 255, 255, ${pulseOpacity}%) ${pulseProgress}%, transparent)`);
        } else if (clicked) {
            clicked = false;
            document.documentElement.style.setProperty("--pulseGradient", 'none');
        }
        requestAnimationFrame(Update);
    }
    Update();

    function glassHiglightMotion() {
        rect = panel.getBoundingClientRect();
        document.documentElement.style.setProperty("--highlightPosition", `circle at ${x.toFixed(2)}% ${y.toFixed(2)}%`);
    }
});