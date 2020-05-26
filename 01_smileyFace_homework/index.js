const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');
//console.log(width, height);

const g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`)

const circle = g.append('circle');

circle.attr('r', height / 2);
circle.attr('fill', '#F1C40F');
circle.attr('stroke', '#1B2631');

const eyeYOffset = -80
const eyeRadius = 20
const eyeSpacing = 100

const eyesG = g
    .append('g')
        .attr('transform', `translate(0, ${eyeYOffset})`)

const leftEye = eyesG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', -eyeYOffset)

const rightEye = eyesG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', eyeYOffset)

const eyebrowsG = eyesG
    .append('g')
        .attr('transform', `translate(0, ${-40})`);

const leftEyebrow = eyebrowsG
    .append('rect')
        .attr('x', 50)
        .attr('width', 50)
        .attr('height', 10)

const rightEyebrow = eyebrowsG
    .append('rect')
        .attr('x', -100)
        .attr('width', 50)
        .attr('height', 10)

eyebrowsG
    .transition().duration(2000)
        .attr('transform', `translate(0, ${-70})`)
    .transition().duration(2000)
        .attr('transform', `translate(0, ${-40})`)

const mouth = g
    .append('path')
        .attr('d', d3.arc()({
            innerRadius: 100,
            outerRadius: 90,
            startAngle: Math.PI / 1.5,
            endAngle: Math.PI * 3 / 2.3
        }))
