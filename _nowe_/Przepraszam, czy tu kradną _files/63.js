function r_gadD () {
    var n = document.getElementById("gadD_tu");
    var b = document.getElementById("banP63");
        if (n && b) {
                b.parentNode.removeChild(b);
                n.parentNode.replaceChild(b,n);
		b.style.display="block";		
	}
}
window.onload = r_gadD;