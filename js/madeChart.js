const labels2 = [
    '10',
    '20',
    '40',
    '80',
    '160',
    '320',
  ];

  const data2 = {
    labels: labels2,
    datasets: [{
      label: 'Actual time complexity',
      backgroundColor: 'rgb(255, 99, 0)',
      borderColor: 'rgb(255, 99, 0)',
      width: '700px',
      data: [0.03 , 0.04, 0.05, 0.15, 2.51, 3.87],
    }]
  };

  const config2 = {
    type: 'line',
    data: data2,
    options: {}
  };

  const madeChart = new Chart(
    document.getElementById('madeChart'),
    config2
  );