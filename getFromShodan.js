function getElementsByText( text, ctx) {
  var results = [];
  var xpathResult = document.evaluate(
      text, 
      ctx || document,
      null,
      XPathResult.ORDERED_NODE_ITERATOR_TYPE,
      null
    );
   var node;
   while ((node = xpathResult.iterateNext()) != null) {
     results.push(node.innerText);
   }
   return results;
}

//let countries = getElementsByText("(//img[@class='flag']/following-sibling::a)");
let cities = getElementsByText("(//a[@class='filter-link text-dark']/following-sibling::a)");
let ips = getElementsByText("(//div[@class='heading']//a)");

for (let i = 0; i < ips.length; i++) {
  log(cities[i]+":"+ips[i]);
}
