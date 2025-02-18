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

const colors = ["#FFEDA9", "#FFE42B", "#FFC239", "#FF8B00", "#873913"];

// Convert hex to RGB
function hexToRgb(hex) {
    let bigint = parseInt(hex.substring(1), 16);
    return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

// Linearly interpolate between two colors
function lerpColor(color1, color2, t) {
    return color1.map((c, i) => Math.floor(c + (color2[i] - c) * t));
}

function getGradientColor(index, total) {
    let colorIndex = Math.floor((index / total) * (colors.length - 1));
    let t = (index / total) * (colors.length - 1) - colorIndex;
    
    let color1 = hexToRgb(colors[colorIndex]);
    let color2 = hexToRgb(colors[colorIndex + 1] || colors[colorIndex]); // Edge case
    
    let [r, g, b] = lerpColor(color1, color2, t);
    return `rgba(${r}, ${g}, ${b}, ${index / total})`;
}

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
        ctx.fillStyle = getGradientColor(i, numPoints);
        ctx.beginPath();
        ctx.arc(centerX + p.x, centerY + p.y, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    
    time += speed;
    requestAnimationFrame(animate);
}

animate();
