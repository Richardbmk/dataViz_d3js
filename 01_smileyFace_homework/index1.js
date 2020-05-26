const svg = d3.select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const g = svg.append('g')
    .attr('transform', `translate(${ width / 2 }, ${ height / 2 })`);

const circle = g.append('circle')

circle.attr('r', 250)
    .attr('fill', '#53A4F6')

const eyeBrowG = g.append('g')
    .attr('transform', `translate(0, 90)`)
    .attr('fill', '#F39C12')

eyeBrowG
    .transition().duration(2000)
        .attr('transform', `translate(0, 50)`)
    .transition().duration(2000)
        .attr('transform', `translate(0, 80)`)

const eyeBrowLeft = eyeBrowG.append('rect')
    .attr('width', 40)
    .attr('height', 10)
    .attr('y', -230)
    .attr('x', -110)

const eyeBrowRight = eyeBrowG.append('rect')
    .attr('width', 40)
    .attr('height', 10)
    .attr('y', -230)
    .attr('x', 70)

const eyesG = g.append('g')
    .attr('transform', `translate(0, -100)`)

const eyeLeft = eyesG.append('circle')
    .attr('cx', -90)
    .attr('r', 25)

const eyeRigth = eyesG.append('circle')
    .attr('cx', 90)
    .attr('r', 25)

const rect = g.append('rect')
    .attr('width', 30)
    .attr('height', 80)
    .attr('x', -10)
    .attr('y', -50)

const arcos = g.append('path')
    .attr('d', d3.arc()({
        innerRadius: 130,
        outerRadius: 150,
        startAngle: Math.PI / 1.5,
        endAngle: Math.PI * 3 / 2.3
      }))




