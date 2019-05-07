

  lastTenRounds(){
    var divElement=document.createElement("div");


   axios.get('https://services-staging.7platform.com/web/events/1d0d6713-b7c9-4f07-ab23-3451a06e8989.json?count=11').then(response=>{
   for(var a in response.data)
   {
     var span=document.createElement("span");
     var span1=document.createElement("span");
     var headerDiv=document.createElement("div");

     span.innerHTML="Event: "+response.data[a].eventId + " | ";
     var date=new Date(response.data[a].eventTime);
     span1.innerHTML=date.toISOString().substring(0, 16).replace('T', ' ')
     span1.style.marginLeft='3%'
     headerDiv.appendChild(span);
     headerDiv.appendChild(span1);
     headerDiv.style.borderBottom="2px solid black";
     headerDiv.style.backgroundColor='rgba(36,36,36,1)';
      headerDiv.style.color='white';
      headerDiv.style.padding="5px";
     var divElement2=document.createElement("div");
     for(var ball in response.data[a].balls)
     {
       var color=(colors[Math.floor(response.data[a].balls[ball].ball%8-1)]==undefined) ? "rgba(2, 0, 0, 0.4)" : colors[Math.floor(response.data[a].balls[ball].ball%8-1)]
       var spanElement=document.createElement("span");
       var div=document.createElement("div");
      spanElement.innerHTML=ball;
      spanElement.classList.add("BallLayout-middle-112");
      spanElement.innerHTML=response.data[a].balls[ball].ball;
      div.classList.add("BallLayout-rounded-110");
      div.setAttribute("style", "display:inline-block;margin-left:1%");
      div.style.background=color;
      div.style.border="4px solid "+color.replace(/[^,]+(?=\))/, '0.9');
      div.appendChild(spanElement);
      divElement2.appendChild(div);
    }
    divElement.appendChild(headerDiv);
    divElement.appendChild(divElement2);
    divElement.style.marginTop="20px";
    divElement2.style.borderBottom="16px solid rgb(23, 23, 23)";
    divElement.style.backgroundColor='rgba(36,36,36,1)';
    divElement.style.padding="5px"

   }
   if( document.getElementById("lastTenRounds")!==null)
   {document.getElementById("lastTenRounds").appendChild(divElement);a++;}
   })
  }
