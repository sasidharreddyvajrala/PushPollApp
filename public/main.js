const form=document.getElementById('vote-form');

form.addEventListener('submit',(e)=>{
    const choise=document.querySelector('input[name]:checked').value;
    const data={os:choise};

    fetch('http://localhost:5000/poll',{
        method:'post',
        body:JSON.stringify(data),
        headers:new Headers({
             'Content-Type':'application/json'
        })
    })
    .then(res=>res.json())
    .then(data=>console.log(data))
    .catch(err=>console.log(err));
    e.preventDefault();
});

   fetch('http://localhost:5000/poll')
    .then(res=>res.json())
    .then(data=>{
        const votes=data.votes;
        const totalVotes=votes.length;
        //counts Votes
       const voteCounts=votes.reduce(
           (acc,vote)=>
           ((acc[vote.os]=(acc[vote.os]||0) + parseInt(vote.points)),acc),{});
       
       let dataPoints=[
        {label:'Windows',y:voteCounts.Windows},
        {label:'Macos',y:voteCounts.Macos},
        {label:'Linux',y:voteCounts.Linux},
        {label:'Others',y:voteCounts.Others},
    ];
    
    const chartContainer=document.querySelector('#chartContainer');
    
    if(chartContainer){
        let chart=new CanvasJS.Chart('chartContainer',{
              animationEnabled:true,
              theme:'light2',
              title:{
                  text:`TotalVotes:${totalVotes}`
              },
              data:[
                  {
                      type:'column',
                      dataPoints:dataPoints
                  }
              ]
        });
        chart.render();
    
        Pusher.logToConsole = true;
    
        var pusher = new Pusher('4e4823458da55f50b735', {
          cluster: 'us2',
          forceTLS: true
        });
    
        var channel = pusher.subscribe('os-poll');
        channel.bind('vote', function(data) {
          dataPoints=dataPoints.map(x=>{
           if(x.label==data.os){
              x.y +=data.points;
              return x;
           }else{
               return x;
           }
          })
          chart.render();
        });
    }
    });

