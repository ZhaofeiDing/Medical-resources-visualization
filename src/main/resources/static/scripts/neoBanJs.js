
    function jiema2() {
        console.log(window.location.href)
        var index_1 = window.location.href.indexOf("=");
        str_1 = window.location.href.substring(index_1 + 1);
        return decodeURI(str_1)
    }
console.log(jiema2())
document.getElementById("name_label").innerHTML = jiema2() + '类案件'