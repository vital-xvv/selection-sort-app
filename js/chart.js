const labels = [
    '10',
    '20',
    '40',
    '80',
    '160',
    '320',
  ];

  const data = {
    labels: labels,
    datasets: [{
      label: 'Theoretical time complexity',
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgb(255, 99, 132)',
      width: '700px',
      data: [0.01, 0.04, 0.16, 0.64, 2.56, 10.24],
    }]
  };

  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );