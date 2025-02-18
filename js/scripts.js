const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const points = [];
const numPoints = 100;
let time = 0;
const speed = 0.02;
const amplitude = Math.min(canvas.width, canvas.height) / 4;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;

function infinityCurve(t) {
    const x = amplitude * Math.sin(t) / (1 + Math.cos(t) ** 2);
    const y = amplitude * Math.sin(t) * Math.cos(t) / (1 + Math.cos(t) ** 2);
    return { x, y };
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    points.unshift(infinityCurve(time));
    if (points.length > numPoints) points.pop();
    
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
        const p = points[i];
        ctx.fillStyle = `rgba(255, 255, 255, ${i / numPoints})`;
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    time += speed;
    requestAnimationFrame(animate);
}

animate();