const form = document.getElementById('vote-form');

// We want to listen for submit
form.addEventListener('submit', e => {
    // This siwhere we define request

    // Here we want to get the checked value     using querySelector
    const choice = document.querySelector('input[name=os]:checked').value;
    //  This object conatins the data we send t request
    const data = { os: choice };


    fetch('http://localhost:3000/poll', {
            method: 'post',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .then(data => console.log(data))
        .catch(err => console.log(err));

    e.preventDefault();
});


fetch('http://localhost:3000/poll')
    .then(res => res.json())
    .then(data => {
        const votes = data.votes;
        const totalVotes = votes.length;

        // Count vote points - accumulator and a current value
        const voteCounts = votes.reduce(
            (acc, vote) =>
            ((acc[vote.os] = (acc[vote.os] || 0) + parseInt(vote.points)), acc), {});
        // Now start the chart and graph
        let dataPoints = [
            { label: 'Windows', y: voteCounts.Windows },
            { label: 'MacOs', y: voteCounts.MacOs },
            { label: 'Linux', y: voteCounts.Linux },
            { label: 'Other', y: voteCounts.Other },
        ];

        const chartContainer = document.querySelector('#chartContainer');

        if (chartContainer) {
            const chart = new CanvasJS.Chart('chartContainer', {
                animationEnabled: true,
                theme: 'theme3',
                title: {
                    text: `Total Votes ${totalVotes}`
                },
                data: [{
                    type: 'column',
                    //            type: 'line',
                    dataPoints: dataPoints
                }]
            });

            chart.render();

            // Enable pusher logging - don't include this in production
            Pusher.logToConsole = true;

            var pusher = new Pusher('d2e7786a1451ece4e949', {
                cluster: 'us2',
                encrypted: true
            });

            var channel = pusher.subscribe('os-poll');
            channel.bind('os-vote', function(data) {
                dataPoints = dataPoints.map(x => {
                    console.log(data)
                    if (x.label == data.os) {
                        x.y += data.points;
                        return x;
                    } else {
                        return x;
                    }
                });

                chart.render();
            });
        }

    });